import { TextField } from "./Shared"
import { ColorSwatch } from "./ColorSwatch"
import { createEffect, createResource, createSignal, For, Show } from "solid-js"
import AddThreadInput from "./AddThead"
import { ColorSwatchType, ThreadBrandType } from "../../Types"
import axios from "axios"
import { ColorSwatchModal } from "./ColorSwatchModal"
import { AnchorThread, ClassicColorworksThread, DmcThread, IThread, WeeksDyeWorksThread } from "../../Models"
import { EditThread } from "./EditThread"

const DEV = 'http://127.0.0.1:5000'
const PROD = 'https://jdilldev.pythonanywhere.com'

export const Dashboard = () => {
    const fetchDmcThreads = async () => {
        const r = (await axios.all([
            axios.get(`${PROD}/dmc`),
            axios.get(`${PROD}/anchor`),
            axios.get(`${PROD}/weeks_dye_works`),
            axios.get(`${PROD}/classic_colorworks`),
        ]).then(axios.spread((dmc, anchor, weeksColorWorks, classicColorworks) => {
            const arr: IThread[] = []
            //     return { data: [...dmc.data, ...anchor.data, ...weeksColorWorks.data, ...classicColorworks.data] }

            dmc.data.forEach((t: any) => {
                arr.push(new DmcThread(t.color, t.dmc_code, t.description, t.variant, t.keywords, t.anchor_codes, t.weeks_dye_works, t.classic_colorworks))
            })

            anchor.data.forEach((t: any) => {
                arr.push(new AnchorThread(t.color, t.anchor_code, t.description, t.keywords, t.dmc_code))
            })

            weeksColorWorks.data.forEach((t: any) => {
                arr.push(new WeeksDyeWorksThread(t.color, t.description, t.keywords, t.dmc_code))
            })

            classicColorworks.data.forEach((t: any) => {
                arr.push(new ClassicColorworksThread(t.color, t.description, t.keywords, t.dmc_codes))
            })

            return { data: arr }
        })))
        return r.data
    }

    const [data, { mutate, refetch }] = createResource(fetchDmcThreads);
    const [showAddThreadForm, setShowAddThreadForm] = createSignal(false)
    const [showEditSwatchModal, setShowEditSwatchModal] = createSignal(false)
    const [searchField, setSearchField] = createSignal('')
    const [selectedThread, setSelectedThread] = createSignal<IThread>()
    const [defaultBrand, setDefaultBrand] = createSignal<ThreadBrandType>('dmc')
    const [deleteMode, setDeleteMode] = createSignal(false)

    // createEffect(() => console.log(data()))

    return <Show when={data()} fallback={<p>Loading</p>}>
        <div class='flex flex-col justify-evenly items-center p-2'>
            <button class="self-end uppercase font-light bg-orange-300 px-4 mb-3 rounded-md" onClick={() => setShowAddThreadForm(!showAddThreadForm())}>{showAddThreadForm() ? 'CLOSE' : 'Add Thread'}</button>
            <div class='flex flex-col self-end items-center'>
                <p class='text-xs'>Set Default Brand </p>
                <select value={defaultBrand()} onChange={(e) => setDefaultBrand(e.target.value as ThreadBrandType)} class='mb-2 text-center rounded-md text-xs border-none outline-none ring-0'>
                    <option value={'dmc'}>DMC</option>
                    <option value={'anchor'}>Anchor</option>
                    <option value='weeksDyeWorks'>Weeks Dye Works</option>
                    <option value='classicColorworks'>Classic Colorworks</option>
                </select>
            </div>
            <div class={`flex flex-row self-center justify-between items-center px-2 rounded-full w-11/12 md:w-7/12 bg-[#F6F6F6] text-black placeholder:font-light placeholder:text-[#BDBDBD]`}>
                <input
                    placeholder='Search'
                    value={searchField()}
                    onInput={(e) => {
                        setSearchField(e.target.value)
                    }}
                    class='bg-transparent w-full border-transparent font-light focus:border-transparent focus:ring-0'
                />
            </div>
            {showAddThreadForm() && <AddThreadInput defaultBrand={defaultBrand()} mutate={mutate} onClose={() => setShowAddThreadForm(false)} />}
        </div>
        <div class='flex flex-row flex-wrap gap-3 items-start p-4'>
            <For each={data()?.filter((x: IThread) =>
                x.getDescription().toLowerCase().includes(searchField())
                || (('' + x.getCode()).includes(searchField()))
                || x.getKeywords().some(keyword => keyword.includes(searchField())))
                .sort((a, b) => a.getBrand() === 'dmc' ? -1 : b.getBrand() === 'dmc' ? 1 : (a.getBrand()).localeCompare(b.getBrand()))}
            >{(thread: IThread) =>
                <div onClick={() => {
                    setSelectedThread(thread)
                    setShowEditSwatchModal(true)
                }}>
                    <ColorSwatch thread={thread} deleteMode={deleteMode()} />
                </div>}
            </For>
        </div>
        {showEditSwatchModal() && !!selectedThread() && <div class='flex items-center justify-center'>
            <EditThread thread={selectedThread()!} mutate={mutate} onClose={() => setShowEditSwatchModal(false)} />
        </div>}
        {
            false && <div class="fixed bottom-3 left-1/4 w-54 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div class="flex">
                    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                    <div>
                        <p class="font-bold">Successfully added thread</p>
                        <p class="text-sm">Make sure you know how these changes affect you.</p>
                    </div>
                </div>
            </div>
        }
    </Show >
}