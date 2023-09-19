import axios from "axios"
import { createEffect, createResource, createSignal, } from "solid-js"
import { AnchorThread, ClassicColorworksThread, DmcThread, IThread, WeeksDyeWorksThread, getThread } from "../../Models"
import { KeywordInput } from "./Shared"

const EditAnchorThread = ({ thread, mutate }: { thread: AnchorThread, mutate: any }) => {
    const [color, setColor] = createSignal(thread.getColor())
    const [keywords, setKeywords] = createSignal(thread.getKeywords())
    const [dmcCode, setDmcCode] = createSignal(thread.getDmcCode())
    const [checked, setChecked] = createSignal(!!dmcCode() && dmcCode() !== 0)
    const [desc, setDesc] = createSignal(thread.getDescription())

    //determine the other threads associated with the selected thread


    return <div class="flex flex-col self-start gap-3">
        <div class='flex flex-row items-center gap-1'>
            <input checked={checked()} onChange={() => setChecked(!checked())} type={'checkbox'} name='brand' />
            <p>DMC</p>
            <input
                value={dmcCode() === 0 ? '' : dmcCode()}
                type={'text'}
                class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                placeholder="#"
                onInput={(e) => setDmcCode(Number.parseInt(e.target.value))}
            />
        </div>
        <div class='flex flex-row items-center gap-1'>
            <input
                readOnly
                type={'radio'}
                checked={true} />
            <p>Anchor</p>
            <input
                readOnly
                value={thread.getAnchorCode()}
                type={'text'}
                class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
            />
            <input
                value={desc()}
                type={'text'}
                class="rounded-md w-60 h-6 text-sm pl-1 placeholder:text-gray-300"
                placeholder="Anchor description"
                onChange={(e) => setDesc(e.target.value)}
            />
        </div>
        <div class='flex flex-row items-center self-center justify-center gap-2'>
            <p>Color</p>
            <input type='color' class='bg-transparent' value={color()} onChange={e => setColor(e.target.value)} />
            <input class='h-2 bg-white border-black bg-transparent w-20 pl-0 rounded-sm text-sm' value={color()} onChange={e => setColor(e.target.value)} />
        </div>
        <KeywordInput keywords={keywords()} setKeywords={setKeywords} />

        <button
            onClick={async () => {
                const previousDmcCode = thread.getDmcCode()
                const currentDmcCode = checked() ? dmcCode() : undefined
                const updatedThread: AnchorThread = new AnchorThread(color(), thread.getAnchorCode(), desc(), keywords(), currentDmcCode);
                const r = await getThread('dmc', currentDmcCode || 0);

                (!!previousDmcCode && (!currentDmcCode || (!!currentDmcCode && (previousDmcCode !== currentDmcCode))))
                    ? updatedThread.updateThread(previousDmcCode)
                    : updatedThread.updateThread()

                mutate((p: IThread[]) => {
                    const unchangedThreads = p.filter(t => ((t.getCode() !== (thread.getDmcCode() || thread.getAnchorCode()))))

                    if (r !== 'Not Found') {
                        const dmcThread = new DmcThread(color(), currentDmcCode!, r.description, r.variant, keywords(), r.anchor_codes, r.weeks_dye_works, r.classic_colorworks)
                        const isAddNeeded = !dmcThread.getAnchorCodes().includes(thread.getAnchorCode())
                        isAddNeeded ? dmcThread.addAnchorCode(thread.getAnchorCode()) : null

                        unchangedThreads.push(dmcThread)
                    }
                    return [...unchangedThreads, updatedThread]
                })
            }}
            class='w-1/4 self-end font-light uppercase hover:bg-green-600 bg-green-400 text-black rounded-sm disabled:opacity-60 disabled:bg-red-300'
        >
            save
        </button>
    </div>
}

export default EditAnchorThread;