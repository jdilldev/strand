import { RadioGroup, TextField } from "./Shared"
import { ColorSwatch } from "./ColorSwatch"
import { createEffect, createResource, createSignal, For, Show } from "solid-js"
import { ThreadBrandType } from "../../Types"
import axios from "axios"

export const Dashboard = () => {
    const fetchDmcThreads = async () => {
        return (await fetch(`http://127.0.0.1:5000/get_dmc`)).json();
    }
    const [data, { mutate, refetch }] = createResource(fetchDmcThreads);
    const [showModal, setShowModal] = createSignal(false)
    const [hex, setHex] = createSignal('#')
    const [colorDescription, setColorDescription] = createSignal('')
    const [brandCode, setBrandCode] = createSignal<number | string>('TBD')
    const [brand, setBrand] = createSignal<ThreadBrandType>('dmc')

    return <Show when={data()} fallback={<p>Loading</p>}>
        <div class='p-4 flex flex-col justify-evenly items-start'>
            <button class="self-end uppercase font-light bg-orange-300 px-4 rounded-md" onClick={() => setShowModal(true)}>Add Thread</button>
            <TextField classnames='self-center mb-8' label='Search' inputType='text' rounded />
            {showModal() && <div class='absolute top-1/4 w-1/2 h-1/2 bg-gray-100 flex flex-col justify-between self-center rounded-md'>
                <div class='p-3'>
                    <p class="text-center text-lg font-light text-black">Add to Thread Repository</p>
                    <div class='flex flex-col mb-4 '>
                        <RadioGroup
                            name='brand'
                            control={brand()}
                            onChangeAction={(v: ThreadBrandType) => setBrand(v)}
                            options={[{ name: 'DMC', value: 'dmc' }, { name: 'Anchor', value: 'anchor' }, { name: 'Weeks Dye Works', value: 'weeksDyeWorks' }, { name: 'Classic Colorworks', value: 'classicColorwoks' }]} />
                    </div>
                    <p>Color:</p>
                    <div class='flex flex-row items-center'>
                        <input type='color' value={hex()} onInput={(e) => setHex(e.target.value)} />
                        <input class='h-2 text-sm border-black bg-transparent w-20 pl-0' value={hex()} onChange={(e) => setHex(e.target.value)} />
                    </div>
                    {(brand() === 'dmc' || brand() === 'anchor') &&
                        <>
                            <p>Brand Code</p>
                            <input class='h-2 text-sm border-black bg-transparent w-20 pl-0' value={brandCode()} onChange={(e) => {
                                const code = Number.parseInt(e.target.value);
                                console.log(Number.isNaN(code))
                                if (Number.isNaN(code))
                                    setBrandCode('invalid')
                                else
                                    setBrandCode(code)
                            }} />
                        </>
                    }

                    <p>Description:</p>
                    <input class='h-2 text-sm border-black bg-transparent w-full pl-0' value={colorDescription()} onChange={(e) => setColorDescription(e.target.value)} />

                </div>
                <div class='flex w-full'>
                    <button class='w-full font-light uppercase bg-red-300 rounded-sm' onClick={() => {
                        setShowModal(false)
                    }}>cancel</button>
                    <button class='w-full font-light uppercase bg-blue-200 rounded-sm' onClick={() => {
                        mutate((p) => [...p, { code: brandCode(), description: colorDescription(), brand: brand(), color: hex() }])

                        axios.post('http://127.0.0.1:5000/add_thread', {
                            brand: brand(),
                            code: brandCode() ?? null,
                            description: colorDescription(),
                            hex: hex()
                        })
                            .then(function (response) {
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                        // setShowModal(false)
                    }}>save</button>
                </div>

            </div>}

            <div class='flex flex-row gap-3 items-center'>
                <For each={data()}>{(threadEntry: any) => {
                    console.log(threadEntry)
                    return <ColorSwatch brand={'dmc'} color={threadEntry.color} description={threadEntry.description} code={threadEntry.code} />
                }}
                </For>
            </div>
        </div>
    </Show>
}