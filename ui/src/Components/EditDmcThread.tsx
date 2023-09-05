import axios from "axios"
import { createEffect, createResource, createSignal, } from "solid-js"
import { BrandMapping, ThreadBrandType, ThreadVariantType } from "../../Types"
import { AnchorThread, ClassicColorworksThread, DmcThread, IThread, WeeksDyeWorksThread, getThread } from "../../Models"
import { FiPlusCircle } from 'solid-icons/fi'
import { AiOutlineDelete } from 'solid-icons/ai'
import { IoCloseOutline } from 'solid-icons/io'
import { KeywordInput } from "./Shared"

const EditDmcThread = ({ thread, mutate }: { thread: DmcThread, mutate: any }) => {
    const [brand] = createSignal<ThreadBrandType>(thread.getBrand())
    const [description, setDescription] = createSignal(thread.getDescription())
    const [color, setColor] = createSignal(thread.getColor())
    const [keywords, setKeywords] = createSignal<string[]>(thread.getKeywords())
    const [variant, setVariant] = createSignal<ThreadVariantType>('6-strand')

    //determine the other threads associated with the selected thread


    return <div class="flex flex-col self-start gap-3">
        <div class='flex flex-row items-center gap-1'>
            <input checked={true} type={'radio'} name='brand' />
            <p>{BrandMapping.get(brand())}</p>
            <input
                readOnly
                value={thread.getCode()}
                type={'text'}
                class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                placeholder="#"
            />
            <input
                value={description()}
                type={'text'}
                class="rounded-md w-64 h-6 text-sm pl-1 placeholder:text-gray-300"
                placeholder="DMC description"
                onChange={e => setDescription(e.target.value)}
            />
        </div>
        <div class={`flex flex-row  ${thread.getAnchorCodes().length > 1 ? 'items-start' : 'items-center'}  gap-1`}>
            <input
                disabled
                type={'checkbox'}
                checked={thread.getAnchorCodes().length > 0 && thread.getAnchorCodes()[0] !== 0} />
            <p>Anchor</p>
            <div class="flex flex-col flex-start gap-1">
                {thread.getAnchorCodes().map(ac => <input
                    readonly
                    value={ac}
                    type={'text'}
                    class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                    placeholder="#"
                />)}
            </div>
        </div>
        <div class={`flex flex-row ${thread.getWeeksDyeWorks().length > 1 ? 'items-start' : 'items-center'} gap-1`}>
            <input
                disabled
                type={'checkbox'}
                checked={thread.getWeeksDyeWorks().length > 0 && thread.getWeeksDyeWorks()[0] !== ''} />
            <p>Weeks Dye Works</p>
            <div class="flex flex-col flex-start gap-1">
                {thread.getWeeksDyeWorks().map(wdw => <input
                    readOnly
                    value={wdw}
                    type='text'
                    class="rounded-md h-6 text-sm w-60 pl-1 placeholder:text-gray-300"
                    placeholder="Weeks Dye Works description"
                />)}
            </div>
        </div>
        <div class='flex flex-row items-center gap-1'>
            <input
                disabled
                type={'checkbox'}
                checked={!!thread?.getClassicColorWorks()} />
            <p>Classic Colorworks</p>
            {thread.getClassicColorWorks() && <input
                readOnly
                value={thread.getClassicColorWorks()}
                type='text'
                class="rounded-md h-6 text-sm w-60 pl-1 placeholder:text-gray-300"
                placeholder="Classic Colorworks description"
            />}
        </div>
        <div class='flex flex-row items-center self-center justify-center gap-2'>
            <p>Color</p>
            <input type='color' class='bg-transparent' value={color()} onChange={e => setColor(e.target.value)} />
            <input class='h-2 bg-white border-black bg-transparent w-20 pl-0 rounded-sm text-sm' value={color()} onChange={e => setColor(e.target.value)} />
        </div>
        <div class='flex flex-row items-center self-center justify-center gap-3'>
            <p>Variant</p>
            <select value={variant()} disabled class='mb-2 rounded-md text-sm'>
                <option>6-strand</option>
                <option>diamant</option>
                <option>metallic</option>
                <option>variegated</option>
                <option>satin</option>
            </select>
        </div>
        <KeywordInput keywords={keywords()} setKeywords={setKeywords} />
        <button
            onClick={() => {
                mutate((p: IThread[]) => {
                    const updatedThread: DmcThread = new DmcThread(color(), thread.getCode(), description(), thread.getVariant(), keywords(), thread.getAnchorCodes(), thread.getWeeksDyeWorks(), thread.getClassicColorWorks())
                    updatedThread.updateThread()

                    const unchangedThreads = p.filter(t => (t.getCode() !== thread.getCode()))

                    return [...unchangedThreads, updatedThread]

                })
            }}
            class='w-1/4 self-end font-light uppercase hover:bg-green-600 bg-green-400 text-black rounded-sm disabled:opacity-60 disabled:bg-red-300'>
            save
        </button>
    </div>
}

export default EditDmcThread