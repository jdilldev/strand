import axios from "axios"
import { createEffect, createResource, createSignal, } from "solid-js"
import { ThreadBrandType, ThreadVariantType } from "../../Types"
import { AnchorThread, ClassicColorworksThread, DmcThread, IThread, WeeksDyeWorksThread, getThread } from "../../Models"
import { FiPlusCircle } from 'solid-icons/fi'
import { IoCloseOutline } from 'solid-icons/io'
import { AiOutlineDelete } from 'solid-icons/ai'


const AddThreadInput = ({ defaultBrand, thread: currentThread, mutate, onClose }: { defaultBrand: ThreadBrandType, thread?: IThread, mutate: any, onClose: () => void }) => {
    const [variant, setVariant] = createSignal<ThreadVariantType>(currentThread ? currentThread.getVariant() : '6-strand')
    const [hex, setHex] = createSignal(currentThread ? currentThread.getColor() : '')
    const [dmcCode, setDmcCode] = createSignal<string>('')
    const [dmcCodes, setDmcCodes] = createSignal<number[]>([0])
    const [dmcDescription, setDmcDescription] = createSignal('')
    const [anchorCodes, setAnchorCodes] = createSignal<number[]>([0])
    const [anchorDescription, setAnchorDescription] = createSignal('')
    const [anchorCode, setAnchorCode] = createSignal('')
    const [weeksDyeWorksDescriptions, setWeeksDyeWorksDescriptions] = createSignal<string[]>([''])
    const [weeksDyeWorksDescription, setWeeksDyeWorksDescription] = createSignal('')
    const [classicColorworksDescription, setClassicColorworksDescription] = createSignal('')
    const [newKeyword, setNewKeyword] = createSignal('')
    const [keywords, setKeywords] = createSignal<string[]>(currentThread ? currentThread.getKeywords() : [])
    const [mappings, setMappings] = createSignal<ThreadBrandType[]>([])
    const [showSuccess, setShowSuccess] = createSignal(true)

    const [brand, setBrand] = createSignal<ThreadBrandType>(currentThread ? currentThread.getBrand() : defaultBrand)


    const handleBrandChange = (updatedBrand: ThreadBrandType) => {
        setBrand(updatedBrand)
    }

    const handleBrandCheck = (selectedBrand: ThreadBrandType) => {
        if (!mappings().includes(selectedBrand))
            setMappings([...mappings(), selectedBrand])
        else
            setMappings([...mappings().filter(x => x !== selectedBrand)])
    }


    const isBrandSelected = (selectedBrand: ThreadBrandType) => (mappings().includes(selectedBrand) || brand() === selectedBrand)


    const isValid = () => {
        let valid = false

        if (isBrandSelected('dmc')) {
            valid = !!dmcCode() && !!dmcDescription()
        }

        if (brand() === 'anchor') {
            valid = !!anchorCode() && !!anchorDescription()
        }

        if (brand() === 'weeksDyeWorks')
            valid = !!weeksDyeWorksDescription()

        if (brand() === 'classicColorworks' || mappings().includes('classicColorworks'))
            valid = !!classicColorworksDescription()

        if (brand() === 'classicColorworks' && mappings().includes('dmc'))
            valid = dmcCodes().every(code => !!code)

        if (mappings().includes('anchor'))
            valid = anchorCodes().every(code => !!code)

        if (mappings().includes('weeksDyeWorks'))
            valid = weeksDyeWorksDescriptions().every(desc => !!desc)


        return valid && !!hex() && hex().startsWith('#')
    }

    return <div class='z-10 fixed bg-white top-[100px] mb-3 flex flex-col items-center justify-center self-center rounded-md border-black border-2' >
        <div class='p-3 flex flex-col'>
            <IoCloseOutline class='self-end text-red-600' onClick={() => onClose()} />
            <p class="text-center text-lg font-light text-blue-500">{`Add to Thread Repository`}</p>
            <div class='flex flex-col mb-4 gap-4'>
                <div class={`flex flex-row gap-2 ${dmcCodes().length === 1 ? 'items-center' : 'items-start'}`}>
                    {brand() === 'dmc' ? <input checked={true} type={'radio'} name='brand' />
                        : <input checked={mappings().includes('dmc')} type={'checkbox'} onChange={() => handleBrandCheck('dmc')} />}
                    <p class={`hover:text-blue-400`} onClick={() => handleBrandChange('dmc')}>DMC</p>
                    {brand() === 'classicColorworks' ?
                        <div class='flex flex-col gap-1'>
                            {dmcCodes().map((thread, i) => <div class='flex flex-row gap-2'>
                                <input
                                    type='text'
                                    class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                                    placeholder="#"
                                    value={thread === 0 ? '' : thread}
                                    onChange={(e) => {
                                        const tmp = [...dmcCodes()]
                                        const val = Number.parseInt(e.target.value)
                                        if (!tmp.includes(val))
                                            tmp[i] = val
                                        setDmcCodes(tmp)
                                    }}
                                />
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
                        : <input
                            type='text'
                            class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300"
                            placeholder="#"
                            value={dmcCode() === '0' ? '' : dmcCode()}
                            onInput={(e) => {
                                setDmcCode(e.target.value)
                            }} />
                    }
                    {brand() === 'dmc' && <input type='text' value={dmcDescription()} onInput={(e) => setDmcDescription(e.target.value)} class="rounded-md w-64 h-6 text-sm pl-1 placeholder:text-gray-300" placeholder="DMC description" />}
                </div>
                <div class={`flex flex-row gap-2 ${anchorCodes().length === 1 ? 'items-center' : 'items-start'}`}>
                    {(brand() === 'anchor' || brand() === 'dmc') && (brand() === 'anchor' ? <input checked={true} type={'radio'} name='brand' /> :
                        <input checked={mappings().includes('anchor')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('anchor')} />)}
                    <p class={`hover:text-blue-400`} onClick={() => handleBrandChange('anchor')}>Anchor</p>
                    <div class='flex flex-col gap-1'>
                        {brand() === 'anchor' && <div class='flex flex-row gap-2 items-center'>
                            <input
                                type='text'
                                value={Number.parseInt(anchorCode()) === 0 ? '' : anchorCode()}
                                class="rounded-md h-6 w-16 text-sm pl-1 placeholder:text-gray-300" placeholder="#"
                                onChange={(e) => {
                                    setAnchorCode(e.target.value)
                                }} />
                            <input
                                type='text'
                                value={anchorDescription()}
                                class="rounded-md h-6 text-sm w-60 pl-1 placeholder:text-gray-300" placeholder="Anchor description"
                                onInput={(e) => setAnchorDescription(e.target.value)}
                            />
                        </div>}
                        {brand() === 'dmc' && anchorCodes().map((anchorCode, i) => {
                            return <div class='flex flex-row gap-2 items-center'>
                                <input
                                    type='text'
                                    value={anchorCode === 0 ? '' : anchorCode}
                                    class="rounded-md h-6 w-16 text-sm pl-1 placeholder:text-gray-300" placeholder="#"
                                    onChange={(e) => {
                                        const tmp = [...anchorCodes()]
                                        tmp[i] = Number.parseInt(e.target.value)
                                        setAnchorCodes(tmp)
                                    }} />
                                {(brand() === 'dmc') && <>
                                    {i === anchorCodes().length - 1 && <FiPlusCircle
                                        class='stroke-green-600 hover:opacity-60'
                                        onMouseDown={() => { setAnchorCodes([...anchorCodes(), 0]) }} />}
                                    {i > 0 && <AiOutlineDelete
                                        class='fill-red-600 hover:opacity-60'
                                        onMouseDown={() => {
                                            const updated = anchorCodes().filter((_, idx) => i !== idx)

                                            setAnchorCodes(updated)
                                        }} />}
                                </>
                                }
                            </div>
                        })}
                    </div>
                </div>
                <div class={`flex flex-row gap-2 ${weeksDyeWorksDescriptions().length > 0 ? 'items-start' : 'items-center'}`}>
                    {(brand() === 'weeksDyeWorks' || brand() === 'dmc') && (brand() === 'weeksDyeWorks' ? <input type={'radio'} name='brand' checked={true} /> :
                        <input checked={mappings().includes('weeksDyeWorks')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('weeksDyeWorks')} />)}
                    <p class={`hover:text-blue-400`} onClick={() => handleBrandChange('weeksDyeWorks')}>Weeks Dye Works</p>
                    <div class='flex flex-col gap-1'>
                        {brand() === 'weeksDyeWorks' &&
                            <input
                                type='text'
                                value={weeksDyeWorksDescription()}
                                class="rounded-md h-6 text-sm w-60 pl-1 placeholder:text-gray-300"
                                placeholder="Weeks Dye Works description"
                                onInput={(e) => setWeeksDyeWorksDescription(e.target.value)}
                            />}
                        {brand() === 'dmc' && weeksDyeWorksDescriptions().map((description, i) => {
                            return <div class='flex flex-row gap-2 items-center'>
                                <input
                                    type='text'
                                    value={description}
                                    class="rounded-md h-6 text-sm w-60 pl-1 placeholder:text-gray-300" placeholder="Weeks Dye Works description"
                                    onChange={(e) => {
                                        const tmp = [...weeksDyeWorksDescriptions()]
                                        tmp[i] = e.target.value
                                        setWeeksDyeWorksDescriptions(tmp)
                                    }}
                                />
                                {i === weeksDyeWorksDescriptions().length - 1 && <FiPlusCircle
                                    class='stroke-green-600 hover:opacity-60'
                                    onMouseDown={() => { setWeeksDyeWorksDescriptions([...weeksDyeWorksDescriptions(), '']) }} />}
                                {i > 0 && <AiOutlineDelete
                                    class='fill-red-600 hover:opacity-60'
                                    onMouseDown={() => {
                                        const updated = weeksDyeWorksDescriptions().filter((_, idx) => i !== idx)
                                        setWeeksDyeWorksDescriptions(updated)
                                    }} />}

                            </div>
                        })}
                    </div>
                </div>
                <div class='flex flex-row gap-2 items-center'>
                    {(brand() === 'classicColorworks' || brand() === 'dmc') && (brand() === 'classicColorworks' ? <input type={'radio'} name='brand' checked={true} /> : <input checked={mappings().includes('classicColorworks')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('classicColorworks')} />)}
                    <p class={`hover:text-blue-400`} onClick={() => handleBrandChange('classicColorworks')}>Classic Colorworks</p>
                    {(brand() === 'dmc' || brand() === 'classicColorworks') &&
                        <input
                            type='text'
                            value={classicColorworksDescription()}
                            onInput={
                                (e) => {
                                    setClassicColorworksDescription(e.target.value)
                                }}

                            class={`rounded-md h-6 pl-1 w-60 text-sm placeholder:text-gray-300" placeholder="Classic Colorworks description`} />}
                </div>
            </div>
            <div class='flex flex-row items-center self-center justify-center gap-3'>
                <p>Color</p>
                <input type='color' value={hex()} onInput={(e) => setHex(e.target.value)} class='bg-transparent' />
                <input class='h-2 bg-white border-black bg-transparent w-20 pl-0 rounded-sm text-sm' value={hex()} onInput={(e) => setHex(e.target.value)} />
            </div>
        </div>
        {brand() === 'dmc' && <div class='flex flex-row items-center self-center justify-center gap-3'>
            <p>Variant</p>
            <select value={variant()} onChange={(e) => setVariant(e.target.value as ThreadVariantType)} class='mb-2 rounded-md text-sm'>
                <option>6-strand</option>
                <option>diamant</option>
                <option>metallic</option>
                <option>variegated</option>
                <option>satin</option>
            </select>
        </div>}
        <div class='flex flex-col gap-1 mb-2 items-center'>
            <div class='flex flex-row gap-1 w-[300px] flex-wrap self-start px-2' >
                {keywords().map((tag) =>
                    <p
                        class='flex flex-row gap-1 items-center font-light text-xs text-white bg-purple-700 px-2 py-.5 rounded-full w-fit'
                        onClick={() => {
                            const tmp = [...keywords()]
                            tmp.filter(tmpTag => tag === tmpTag)
                            setKeywords(tmp)
                        }}
                    >
                        {tag}
                        <span>
                            <IoCloseOutline
                                class='w-3 h-3 hover:opacity-60'
                                onClick={() => {
                                    const tmp = keywords().filter((tmpTag) => tmpTag !== tag)
                                    setKeywords(tmp)
                                }}
                            />
                        </span>
                    </p>)}
            </div>
            <input
                type='text'
                placeholder="Enter keyword"
                class="rounded-md h-6 text-sm w-60 pl-1 placeholder:text-gray-300"
                value={newKeyword()}
                onInput={e => setNewKeyword(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        if (!keywords().includes(newKeyword()) && newKeyword() !== '') {
                            setKeywords([...keywords(), newKeyword()])
                            setNewKeyword('')
                        }
                        else
                            alert('Keyword already exists!')
                    }
                }}
            />
            <p class='text-xs text-purple-700'>(press enter to add keyword)</p>
        </div>
        <div class="flex flex-row justify-around w-3/4">
            <button
                disabled={!isValid()}
                class='w-1/4 font-light uppercase hover:bg-green-600 bg-green-400 text-black rounded-sm mb-1 disabled:opacity-60 disabled:bg-red-300'
                onClick={() => {
                    let newDmcThread: DmcThread | null = null;
                    let newAnchorThread: AnchorThread | null = null;
                    let newWeeksDyeWorksThread: WeeksDyeWorksThread | null = null;
                    let newClassicColorworksThread: ClassicColorworksThread | null = null;

                    const dmcCodeAsNumber = Number.parseInt(dmcCode()) ?? undefined
                    const requests: IThread[] = []


                    if (brand() === 'dmc') {
                        let anchorArr = anchorCodes()
                        let weeksDyeWorksArr = weeksDyeWorksDescriptions()
                        let classicColorworks = classicColorworksDescription()

                        if (Number.isNaN(dmcCodeAsNumber)) {
                            alert('DMC code is not a valid number; please recheck')
                        }

                        if (!mappings().includes('anchor'))
                            anchorArr = []
                        else {
                            anchorArr.filter(code => code !== 0 && !Number.isNaN(code)).forEach(code => {
                                const threadToAdd = new AnchorThread(hex(), code, 'MUST ADD', keywords(), dmcCodeAsNumber!)
                                requests.push(threadToAdd)

                            })
                            setAnchorCodes([0])
                        }

                        if (!mappings().includes('weeksDyeWorks'))
                            weeksDyeWorksArr = ['']
                        else {
                            weeksDyeWorksArr.filter(desc => desc !== '').forEach(desc => {
                                const threadToAdd = new WeeksDyeWorksThread(hex(), desc, keywords(), dmcCodeAsNumber!)
                                requests.push(threadToAdd)
                            })
                            setWeeksDyeWorksDescriptions([''])
                        }

                        if (!mappings().includes('classicColorworks'))
                            classicColorworks = ''
                        else {
                            const threadToAdd = new ClassicColorworksThread(hex(), classicColorworks, keywords(), dmcCodes())
                            requests.push(threadToAdd)
                            setClassicColorworksDescription('')
                        }

                        newDmcThread = new DmcThread(hex(), dmcCodeAsNumber, dmcDescription(), variant(), keywords(), anchorArr, weeksDyeWorksArr, classicColorworks)

                        requests.push(newDmcThread)

                    }

                    if (brand() === 'anchor') {
                        const anchorCodeAsNumber = Number.parseInt(anchorCode())

                        newAnchorThread = new AnchorThread(hex(), anchorCodeAsNumber, anchorDescription(), keywords(), dmcCodeAsNumber)
                        requests.push(newAnchorThread)

                        if (dmcCodeAsNumber)
                            requests.push(new DmcThread(hex(), dmcCodeAsNumber, 'MUST ADD', variant(), keywords(), [anchorCodeAsNumber]))
                    }

                    if (brand() === 'weeksDyeWorks') {

                        newWeeksDyeWorksThread = new WeeksDyeWorksThread(hex(), weeksDyeWorksDescription(), keywords(), dmcCodeAsNumber)
                        requests.push(newWeeksDyeWorksThread)

                        if (dmcCodeAsNumber)
                            requests.push(new DmcThread(hex(), dmcCodeAsNumber, 'MUST ADD', variant(), keywords(), [], [weeksDyeWorksDescription()]))
                    }

                    if (brand() === 'classicColorworks') {
                        let dmcArr = dmcCodes()

                        if (!mappings().includes('dmc'))
                            dmcArr = []
                        else {
                            dmcArr.filter(code => code !== 0 && !Number.isNaN(code)).forEach(code => {

                                const threadToAdd = new DmcThread(hex(), code, 'MUST ADD', '6-strand', keywords(), [], [], classicColorworksDescription())
                                requests.push(threadToAdd)
                            })
                        }

                        newClassicColorworksThread = new ClassicColorworksThread(hex(), classicColorworksDescription(), keywords(), dmcArr,)
                        requests.push(newClassicColorworksThread)
                    }

                    (async () => {
                        (await axios.all(requests.map(req => req.addThread())).then(axios.spread((res) => {
                            mutate((p: any) => [...p, ...requests])
                            alert(`Successfully added ${requests.length} thread${requests.length === 1 ? '' : 's'}!`)

                            setMappings([])


                        })).catch(() => alert('Failure to save all threads. Check for missing threads. May be a duplicate identifier')))
                    })()

                }}>save</button>
        </div>
    </div >
}

export default AddThreadInput