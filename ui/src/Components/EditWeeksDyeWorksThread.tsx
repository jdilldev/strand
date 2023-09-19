import axios from "axios"
import { Show, createEffect, createResource, createSignal, } from "solid-js"
import { BrandMapping, ThreadBrandType, ThreadVariantType } from "../../Types"
import { DmcThread, IThread, WeeksDyeWorksThread, getThread } from "../../Models"
import { KeywordInput } from "./Shared"


const EditWeeksDyeWorksThread = ({ thread, mutate }: { thread: WeeksDyeWorksThread, mutate: any }) => {
    const [color, setColor] = createSignal(thread.getColor())
    const [keywords, setKeywords] = createSignal(thread.getKeywords())
    const [dmcCode, setDmcCode] = createSignal(thread.getDmcCode())
    const [checked, setChecked] = createSignal(!!dmcCode() && dmcCode() !== 0)

    return <div class="flex flex-col self-start gap-3">
        <div class='flex flex-row items-center gap-1'>
            <input
                checked={checked()}
                type={'checkbox'}
                name='brand'
                onChange={() => setChecked(!checked())}
            />
            <p>DMC</p>
            <input
                type={'text'}
                class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                placeholder="#"
                value={dmcCode() === 0 ? '' : dmcCode()}
                onInput={(e) => setDmcCode(Number.parseInt(e.target.value))}
            />
        </div>
        <div class='flex flex-row items-center gap-1'>
            <input
                readOnly
                type={'radio'}
                checked={true} />
            <p>Weeks Dye Works</p>
            <input
                readOnly={true}
                type={'text'}
                class="rounded-md w-fit h-6 text-sm pl-1 capitalize placeholder:text-gray-300"
                placeholder="Weeks Dye Works description"
                value={thread.getDescription()}
            />
        </div>
        <div class='flex flex-row items-center self-center justify-center gap-2'>
            <p>Color</p>
            <input type='color' value={color()} class='bg-transparent' onInput={(e) => setColor(e.target.value)} />
            <input class='h-2 bg-white border-black bg-transparent w-20 pl-0 rounded-sm text-sm' value={color()} onInput={(e) => setColor(e.target.value)} />
        </div>
        <KeywordInput keywords={keywords()} setKeywords={setKeywords} />
        <button
            //disabled={checked() && !dmcCode()}
            class='w-1/4 self-end font-light uppercase hover:bg-green-600 bg-green-400 text-black rounded-sm disabled:opacity-60 disabled:bg-red-300'
            onClick={async () => {
                const previousDmcCode = thread.getDmcCode()
                const currentDmcCode = checked() ? dmcCode() : undefined
                const updatedThread: WeeksDyeWorksThread = new WeeksDyeWorksThread(color(), thread.getDescription(), keywords(), currentDmcCode);
                const r = await getThread('dmc', currentDmcCode || 0);

                (!!previousDmcCode && (!currentDmcCode || (!!currentDmcCode && (previousDmcCode !== currentDmcCode))))
                    ? updatedThread.updateThread(previousDmcCode)
                    : updatedThread.updateThread()

                mutate((p: IThread[]) => {
                    const unchangedThreads = p.filter(t => ((t.getDescription() !== thread.getDescription()) && t.getCode() !== currentDmcCode))

                    if (r !== 'Not Found') {
                        const dmcThread = new DmcThread(color(), currentDmcCode!, r.description, r.variant, keywords(), r.anchor_codes, r.weeks_dye_works, r.classic_colorworks)
                        const isAddNeeded = !dmcThread.getWeeksDyeWorks().includes(thread.getDescription())
                        isAddNeeded ? dmcThread.addWeeksDyeWorksThread(thread.getDescription()) : null

                        unchangedThreads.push(dmcThread)
                    }
                    return [...unchangedThreads, updatedThread]
                })
            }} >
            save
        </button>
    </div>
}

export default EditWeeksDyeWorksThread;