import { createSignal, } from "solid-js"
import { ClassicColorworksThread, IThread, } from "../../Models"
import { FiPlusCircle } from 'solid-icons/fi'
import { AiOutlineDelete } from 'solid-icons/ai'

import { KeywordInput } from "./Shared"

const EditClassicColorworksThread = ({ thread, mutate }: { thread: ClassicColorworksThread, mutate: any }) => {
    const [color, setColor] = createSignal(thread.getColor())
    const [keywords, setKeywords] = createSignal(thread.getKeywords())
    const [dmcCodes, setDmcCodes] = createSignal(thread.getDmcCodes())
    const [checked, setChecked] = createSignal(dmcCodes().length > 0 && dmcCodes()[0] !== 0)


    //determine the other threads associated with the selected thread


    return <div class={`flex flex-col  gap-3`}>
        <div class={`flex flex-row ${dmcCodes().length > 1 ? 'items-start' : 'items-center'} gap-1`}>
            <input checked={checked()} onChange={() => setChecked(!checked())} type={'checkbox'} name='brand' />
            <p>DMC</p>
            <div class='flex flex-col gap-1'>
                {thread.getDmcCodes().map((code, i) => <div class='flex flex-row items-center gap-1'>
                    <input
                        type='text'
                        value={code}
                        class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                        placeholder="#"
                        onChange={(e) => {
                            const tmp = [...dmcCodes()]
                            const val = Number.parseInt(e.target.value)
                            if (!tmp.includes(val))
                                tmp[i] = val
                            setDmcCodes(tmp)
                        }}
                    />
                    {/*  <input
                        value={dmcCode}
                        type={'color'}
                        class="bg-transparent w-8 h-6 text-sm pl-1 placeholder:text-gray-300"
                    /> */}
                    {i === dmcCodes().length - 1 && <FiPlusCircle
                        class='stroke-green-600'
                        onMouseDown={() => {
                            setDmcCodes([...dmcCodes(), 0])
                        }} />}
                    {i > 0 && <AiOutlineDelete
                        class='fill-red-600'
                        onMouseDown={() => {
                            const updated = dmcCodes().filter((_, idx) => i !== idx)

                            setDmcCodes(updated)
                        }} />}
                </div>)}
            </div>
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
        <button
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
        </button>
    </div>
}

export default EditClassicColorworksThread;