import axios from "axios"
import { createEffect, createResource, createSignal, } from "solid-js"
import { BrandMapping, ThreadBrandType, ThreadVariantType } from "../../Types"
import { AnchorThread, ClassicColorworksThread, DmcThread, IThread, WeeksDyeWorksThread, getThread } from "../../Models"
import { FiPlusCircle } from 'solid-icons/fi'
import { AiOutlineDelete } from 'solid-icons/ai'
import { IoCloseOutline } from 'solid-icons/io'
import { KeywordInput } from "./Shared"

const DEV = 'http://127.0.0.1:5000'
const PROD = 'https://jdilldev.pythonanywhere.com'

const EditAnchorThread = ({ thread, mutate }: { thread: AnchorThread, mutate: any }) => {
    const [keywords, setKeywords] = createSignal<string[]>(thread.getKeywords())
    const [color, setColor] = createSignal(thread.getColor())
    const [desc, setDesc] = createSignal(thread.getDescription())

    //determine the other threads associated with the selected thread


    return <div class="flex flex-col self-start gap-3">
        <div class='flex flex-row items-center gap-1'>
            <input checked={false} type={'checkbox'} name='brand' />
            <p>DMC</p>
            {thread.getDmcCode() && <input
                readonly
                value={thread.getDmcCode()}
                type={'text'}
                class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                placeholder="#"
            />}
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
                placeholder="#"
            />
            <input
                value={desc()}
                type={'text'}
                class="rounded-md w-60 h-6 text-sm pl-1 placeholder:text-gray-300"
                placeholder="Anchor description"
                onChange={(e) => thread.setDescription(e.target.value)}
            />
        </div>
        <div class='flex flex-row items-center self-center justify-center gap-2'>
            <p>Color</p>
            <input type='color' class='bg-transparent' value={color()} onChange={e => setColor(e.target.value)} />
            <input class='h-2 bg-white border-black bg-transparent w-20 pl-0 rounded-sm text-sm' value={color()} onChange={e => setColor(e.target.value)} />
        </div>
        <KeywordInput keywords={keywords()} setKeywords={setKeywords} />

        <button
            onClick={() => {
                mutate((p: IThread[]) => {
                    const updatedThread: AnchorThread = new AnchorThread(color(), thread.getAnchorCode(), desc(), keywords(), thread.getDmcCode())
                    updatedThread.updateThread()

                    const unchangedThreads = p.filter(t => (t.getCode() !== thread.getAnchorCode()))

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