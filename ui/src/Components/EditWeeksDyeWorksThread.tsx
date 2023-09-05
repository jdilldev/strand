import axios from "axios"
import { Show, createEffect, createResource, createSignal, } from "solid-js"
import { BrandMapping, ThreadBrandType, ThreadVariantType } from "../../Types"
import { AnchorThread, ClassicColorworksThread, DmcThread, IThread, WeeksDyeWorksThread, getThread } from "../../Models"
import { FiPlusCircle } from 'solid-icons/fi'
import { AiOutlineDelete } from 'solid-icons/ai'
import { IoCloseOutline } from 'solid-icons/io'
import { ChromePicker, SketchPicker } from 'react-color';
import { KeywordInput } from "./Shared"

const DEV = 'http://127.0.0.1:5000'
const PROD = 'https://jdilldev.pythonanywhere.com';




const EditWeeksDyeWorksThread = ({ thread, mutate }: { thread: WeeksDyeWorksThread, mutate: any }) => {
    const [color, setColor] = createSignal(thread.getColor())
    const [keywords, setKeywords] = createSignal(thread.getKeywords())
    const [dmcCode, setDmcCode] = createSignal(thread.getDmcCode())
    const [checked, setChecked] = createSignal(!!dmcCode() && dmcCode() !== 0)
    const [dmcThread, setDmcThread] = createSignal<DmcThread>();

    return <div class="flex flex-col self-start gap-3">
        <div class='flex flex-row items-center gap-1'>
            <input
                disabled
                checked={!!checked()}
                type={'checkbox'}
                name='brand'
            //onChange={() => checked() ? setChecked(false) : setChecked(true)}
            />
            <p>DMC</p>
            <input
                readOnly
                type={'text'}
                class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                placeholder="#"
                value={!!dmcCode() ? dmcCode() : ''}
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
                onChange={(e) => thread.setDescription(e.target.value)}
            />
        </div>
        <div class='flex flex-row items-center self-center justify-center gap-2'>
            <p>Color</p>
            <input type='color' value={color()} class='bg-transparent' onInput={(e) => setColor(e.target.value)} />
            <input class='h-2 bg-white border-black bg-transparent w-20 pl-0 rounded-sm text-sm' value={color()} onInput={(e) => setColor(e.target.value)} />
        </div>
        <KeywordInput keywords={keywords()} setKeywords={setKeywords} />
        <button
            disabled={checked() && !(!!dmcCode())}
            class='w-1/4 self-end font-light uppercase hover:bg-green-600 bg-green-400 text-black rounded-sm disabled:opacity-60 disabled:bg-red-300'
            onClick={() => {

                const dmc_code = checked() ? dmcCode() : undefined
                const updatedThread: WeeksDyeWorksThread = new WeeksDyeWorksThread(color(), thread.getDescription(), keywords(), dmc_code)
                updatedThread.updateThread()

                mutate((p: IThread[]) => {
                    const unchangedThreads = p.filter(t => (t.getDescription() !== thread.getDescription()))

                    return [...unchangedThreads, updatedThread]

                })

                //  mutate((p: IThread[]) => {
                /*    const unchangedThreads = p.filter(t => (t.getDescription() !== thread.getDescription()) && (t.getCode() !== thread.getDmcCode()))
                   //if the dmc_code didnt exist previously, but does now, then dmc_code added
                   if (!thread.getDmcCode() && dmc_code) {
                       console.log('dmc added ', dmc_code)
 
                       //check if DMC thread exists, if not create it
                       getThread('dmc', dmc_code).then(res => {
                           console.log(res)
                           if (res === 'Not Found') {
 
 
 
                               updatedThreads.push(new DmcThread(res.color, dmc_code, 'MUST ADD', '6-strand', [], [], [thread.getDescription()]))
                           }
 
                       })
 
                       // if previous dmc_code was present
                   } else if (thread.getDmcCode()) {
                       getThread('dmc', thread.getDmcCode()!).then(res => {
                           if (dmc_code === undefined) {
                               console.log('dmc removed')
                           }
                           else if (thread.getDmcCode() !== dmc_code) {
                               console.log('dmc changed')
                           }
                       })
                   } */
                //  })

                // updatedThreads.forEach(threadToUpdate => threadToUpdate.updateThread())
            }} >
            save
        </button>
    </div>
}

export default EditWeeksDyeWorksThread;