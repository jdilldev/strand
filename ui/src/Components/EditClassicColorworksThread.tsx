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

const EditClassicColorworksThread = ({ thread, mutate }: { thread: ClassicColorworksThread, mutate: any }) => {
    const [color, setColor] = createSignal(thread.getColor())
    const [keywords, setKeywords] = createSignal(thread.getKeywords())


    //determine the other threads associated with the selected thread


    return <div class="flex flex-col self-start gap-3">
        <div class='flex flex-row items-center gap-1'>
            <input disabled checked={thread.getDmcCodes().length > 0 && thread.getDmcCodes()[0] !== 0} type={'checkbox'} name='brand' />
            <p>DMC</p>
            {thread.getDmcCodes().map((dmcCode, i) => <>
                <input
                    type='text'
                    class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                    placeholder="#"
                />
                <input
                    value={dmcCode}
                    type={'color'}
                    class="bg-transparent w-8 h-6 text-sm pl-1 placeholder:text-gray-300"
                />
                <FiPlusCircle
                    class='stroke-green-600'
                />
                {i > 0 && <AiOutlineDelete
                    class='fill-red-600'
                />}
            </>)}
        </div>
        <div class='flex flex-row items-center gap-1'>
            <input
                readOnly
                type={'radio'}
                checked={true} />
            <p>Classic Colorworks</p>
            <input
                readOnly
                type={'text'}
                class="rounded-md w-60 h-6 text-sm pl-1 placeholder:text-gray-300"
                placeholder="Classic Colorworks description"
                value={thread.getDescription()}
            />
        </div>
        <div class='flex flex-row items-center self-center justify-center gap-2'>
            <p>Color</p>
            <input type='color' value={color()} class='bg-transparent' onInput={(e) => setColor(e.target.value)} />
            <input class='h-2 bg-white border-black bg-transparent w-20 pl-0 rounded-sm text-sm' value={color()} onInput={(e) => setColor(e.target.value)} />
        </div>
        <KeywordInput keywords={keywords()} setKeywords={setKeywords} />

        {true && <button
            onClick={() => {
                mutate((p: IThread[]) => {
                    const updatedThread: ClassicColorworksThread = new ClassicColorworksThread(color(), thread.getDescription(), keywords(), thread.getDmcCodes())
                    updatedThread.updateThread()

                    const unchangedThreads = p.filter(t => (t.getDescription() !== thread.getDescription()))

                    return [...unchangedThreads, updatedThread]

                })
            }}
            class='w-1/4 self-end font-light uppercase hover:bg-green-600 bg-green-400 text-black rounded-sm disabled:opacity-60 disabled:bg-red-300'>
            save
        </button>}
    </div>
}

export default EditClassicColorworksThread;