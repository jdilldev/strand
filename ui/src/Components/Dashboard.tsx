import { TextField } from "./Shared"
import { ColorSwatch } from "./ColorSwatch"
import { createResource, createSignal, For, Show } from "solid-js"
import AddThreadInput from "./AddThead"
import { ColorSwatchType } from "../../Types"
import axios from "axios"
import { ColorSwatchModal } from "./ColorSwatchModal"

// fiber type
export const Dashboard = () => {
    const fetchDmcThreads = async () => {
        const r = (await axios.all([
            axios.get(`http://127.0.0.1:5000/dmc`),
            axios.get(`http://127.0.0.1:5000/anchor`),
            axios.get(`http://127.0.0.1:5000/weeks_dye_works`),
            axios.get(`http://127.0.0.1:5000/classic_colorworks`),
        ]).then(axios.spread((dmc, anchor, weeksColorWorks, classicColorworks) => {
            return { data: [...dmc.data, ...anchor.data, ...weeksColorWorks.data, ...classicColorworks.data] }

        })))
        return r.data
    }

    const [data, { mutate }] = createResource(fetchDmcThreads);
    const [showAddThreadForm, setShowAddThreadForm] = createSignal(false)
    const [showEditSwatchModal, setShowEditSwatchModal] = createSignal(true)
    const [searchField, setSearchField] = createSignal('')

    //const filtered = data().filter((d: ColorSwatchType) => d.brand == 'anchor')

    return <Show when={data()} fallback={<p>Loading</p>}>
        <div class='flex flex-col justify-evenly items-start p-2'>
            <button class="self-end uppercase font-light bg-orange-300 px-4 mb-3 rounded-md" onClick={() => setShowAddThreadForm(!showAddThreadForm())}>{showAddThreadForm() ? 'CLOSE' : 'Add Thread'}</button>
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
            {showAddThreadForm() && <AddThreadInput mutate={mutate} />}
        </div>
        <div class='flex flex-row flex-wrap gap-3 items-start p-4'>
            <For each={data()?.filter((x: ColorSwatchType) =>
                x.description.toLowerCase().includes(searchField()))
            }>{(threadEntry: ColorSwatchType) =>
                <div onClick={() => setShowEditSwatchModal(true)}>
                    <ColorSwatch brand={threadEntry.brand} color={threadEntry.color} description={threadEntry.description} code={threadEntry.code} variant={threadEntry.variant} />
                    {showEditSwatchModal() && <ColorSwatchModal thread={threadEntry} onClose={() => setShowEditSwatchModal(false)} />}
                </div>}
            </For>
        </div>

        {/*         <div class='flex flex-row flex-wrap gap-3 items-start p-4'>
            <For each={data()?.filter((x: ColorSwatchType) =>
                x.description.toLowerCase().includes(searchField()) && x.brand === 'anchor')
            }>{(threadEntry: ColorSwatchType) => <ColorSwatch brand={threadEntry.brand} color={threadEntry.color} description={threadEntry.description} code={threadEntry.code} variant={threadEntry.variant} />
                }
            </For>
        </div>
        <div class='flex flex-row flex-wrap gap-3 items-start p-4'>
            <For each={data()?.filter((x: ColorSwatchType) =>
                x.description.toLowerCase().includes(searchField()) && x.brand === 'weeksDyeWorks')
            }>{(threadEntry: ColorSwatchType) => <ColorSwatch brand={threadEntry.brand} color={threadEntry.color} description={threadEntry.description} code={threadEntry.code} variant={threadEntry.variant} />
                }
            </For>
        </div>
        <div class='flex flex-row flex-wrap gap-3 items-start p-4'>
            <For each={data()?.filter((x: ColorSwatchType) =>
                x.description.toLowerCase().includes(searchField()) && x.brand === 'classicColorworks')
            }>{(threadEntry: ColorSwatchType) => <ColorSwatch brand={threadEntry.brand} color={threadEntry.color} description={threadEntry.description} code={threadEntry.code} variant={threadEntry.variant} />
                }
            </For>
        </div> */}
        {false && <div class="fixed bottom-3 left-1/4 w-54 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                <div>
                    <p class="font-bold">Successfully added thread</p>
                    <p class="text-sm">Make sure you know how these changes affect you.</p>
                </div>
            </div>
        </div>}
    </Show >
}