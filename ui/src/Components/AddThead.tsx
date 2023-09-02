import axios, { AxiosError } from "axios"
import { createSignal } from "solid-js"
import { BrandMapping, ColorSwatchType, ThreadBrandType, ThreadVariantType } from "../../Types"
import { AnchorThread, ClassicColorworksThread, DmcThread, IThread, WeeksDyeWorksThread } from "../../Models"
import { FiPlusCircle } from 'solid-icons/fi'
import { AiOutlineDelete } from 'solid-icons/ai'

const DEV = 'http://127.0.0.1:5000'
const PROD = 'https://jdilldev.pythonanywhere.com'

const AddThreadInput = ({ mutate, onClose }: { mutate: any, onClose: () => void }) => {
    const [variant, setVariant] = createSignal<ThreadVariantType>('6-strand')
    const [hex, setHex] = createSignal('')
    const [dmcCode, setDmcCode] = createSignal<string>('')
    const [dmcCodes, setDmcCodes] = createSignal<number[]>([0])
    const [dmcDescription, setDmcDescription] = createSignal('')
    const [anchorCodes, setAnchorCodes] = createSignal<number[]>([0])
    const [anchorDescription, setAnchorDescription] = createSignal('')
    const [anchorCode, setAnchorCode] = createSignal('')
    const [weeksDyeWorksDescriptions, setWeeksDyeWorksDescriptions] = createSignal<string[]>([''])
    const [weeksDyeWorksDescription, setWeeksDyeWorksDescription] = createSignal('')
    const [classicColorworksDescription, setClassicColorworksDescription] = createSignal('')

    const [mappings, setMappings] = createSignal<ThreadBrandType[]>([])
    const [showSuccess, setShowSuccess] = createSignal(true)

    const [brand, setBrand] = createSignal<ThreadBrandType>('dmc')


    const handleBrandChange = (updatedBrand: ThreadBrandType) => {
        setBrand(updatedBrand)
    }

    const handleBrandCheck = (selectedBrand: ThreadBrandType) => {
        if (!mappings().includes(selectedBrand))
            setMappings([...mappings(), selectedBrand])
        else
            handleBrandUncheck(selectedBrand)
    }

    const handleBrandUncheck = (selectedBrand: ThreadBrandType) => setMappings([...mappings().filter(x => x !== selectedBrand)])


    const isBrandSelected = (selectedBrand: ThreadBrandType) => (mappings().includes(selectedBrand) || brand() === selectedBrand)

    const isValid = () => {
        let valid = false

        if (isBrandSelected('dmc')) {
            valid = !!dmcCode() && !!dmcDescription()
        }

        if (mappings().includes('anchor') || brand() === 'anchor') {
            // valid = !!anchorCode() && !!anchorDescription()
        }

        if (mappings().includes('weeksDyeWorks') || brand() === 'weeksDyeWorks')
            valid = !!weeksDyeWorksDescription()

        if (mappings().includes('classicColorworks') || brand() === 'classicColorworks')
            valid = !!classicColorworksDescription()


        return valid && !!hex() && hex().startsWith('#')
    }

    return <div class='z-10 fixed bg-white top-[100px] mb-3 flex flex-col items-center justify-center self-center rounded-md border-black border-2' >
        <div class='p-3 flex flex-col'>
            {true && <p class='text-red-700 self-end' onClick={() => onClose()}>CLOSE</p>}
            <p class="text-center text-lg font-light text-blue-500">Add to Thread Repository</p>
            <div class='flex flex-col mb-4 gap-4'>
                <div class={`flex flex-row gap-2 ${dmcCodes().length === 1 ? 'items-center' : 'items-start'}`}>
                    {brand() === 'dmc' ? <input checked={true} type={'radio'} name='brand' />
                        : <input checked={isBrandSelected('dmc')} type={'checkbox'} onChange={() => handleBrandCheck('dmc')} />}
                    <p class="hover:text-blue-400" onClick={() => handleBrandChange('dmc')}>DMC</p>
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
                                        tmp[i] = Number.parseInt(e.target.value)
                                        setDmcCodes(tmp)
                                    }} />
                                {i === dmcCodes().length - 1 && <FiPlusCircle
                                    class='stroke-green-600'
                                    onMouseDown={() => { setDmcCodes([...dmcCodes(), 0]) }} />}
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
                            value={dmcCode()}
                            onInput={(e) => {
                                setDmcCode(e.target.value)
                            }} />
                    }
                    {brand() === 'dmc' && <input type='text' value={dmcDescription()} onInput={(e) => setDmcDescription(e.target.value)} class="rounded-md w-64 h-6 text-sm pl-1 placeholder:text-gray-300" placeholder="DMC description" />}
                </div>
                <div class={`flex flex-row gap-2 ${anchorCodes().length === 1 ? 'items-center' : 'items-start'}`}>
                    {(brand() === 'anchor' || brand() === 'dmc') && (brand() === 'anchor' ? <input checked={true} type={'radio'} name='brand' /> :
                        <input checked={isBrandSelected('anchor')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('anchor')} />)}
                    <p class='hover:text-blue-400' onClick={() => handleBrandChange('anchor')}>Anchor</p>
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
                        <input checked={isBrandSelected('weeksDyeWorks')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('weeksDyeWorks')} />)}
                    <p class='hover:text-blue-400' onClick={() => handleBrandChange('weeksDyeWorks')}>Weeks Dye Works</p>
                    <div class='flex flex-col gap-1'>
                        {brand() === 'weeksDyeWorks' &&
                            <input
                                type='text'
                                value={weeksDyeWorksDescription()}
                                class="rounded-md h-6 text-sm w-60 pl-1 placeholder:text-gray-300" placeholder="Weeks Dye Works description"
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
                    {(brand() === 'classicColorworks' || brand() === 'dmc') && (brand() === 'classicColorworks' ? <input type={'radio'} name='brand' checked={true} /> : <input checked={isBrandSelected('classicColorworks')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('classicColorworks')} />)}
                    <p class='hover:text-blue-400' onClick={() => handleBrandChange('classicColorworks')}>Classic Colorworks</p>
                    {(brand() === 'dmc' || brand() === 'classicColorworks') && <input type='text' value={classicColorworksDescription()} onInput={
                        (e) => {
                            setClassicColorworksDescription(e.target.value)
                        }}

                        class="rounded-md h-6 pl-1 w-60 text-sm placeholder:text-gray-300" placeholder="Classic Colorworks description" />}
                </div>
            </div>
            <div class='flex flex-row items-center self-center justify-center gap-3'>
                <p>Color</p>
                <input type='color' value={hex()} onInput={(e) => setHex(e.target.value)} />
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
        <button
            disabled={false}
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
                        anchorArr.forEach(code => {
                            const threadToAdd = new AnchorThread(hex(), code, 'MUST ADD', dmcCodeAsNumber!)
                            requests.push(threadToAdd)
                        })
                    }

                    if (!mappings().includes('weeksDyeWorks'))
                        weeksDyeWorksArr = []
                    else {
                        weeksDyeWorksArr.forEach(desc => {
                            const threadToAdd = new WeeksDyeWorksThread(hex(), desc, dmcCodeAsNumber!)
                            requests.push(threadToAdd)
                        })
                    }

                    if (!mappings().includes('classicColorworks'))
                        classicColorworks = ''
                    else {
                        const threadToAdd = new ClassicColorworksThread(hex(), classicColorworks, [dmcCodeAsNumber!])
                        requests.push(threadToAdd)
                    }

                    newDmcThread = new DmcThread(hex(), dmcDescription(), dmcCodeAsNumber, variant(), anchorArr, weeksDyeWorksArr, classicColorworks)

                    requests.push(newDmcThread)
                }

                if (brand() === 'anchor') {
                    const anchorCodeAsNumber = Number.parseInt(anchorCode())

                    newAnchorThread = new AnchorThread(hex(), anchorCodeAsNumber, anchorDescription(), dmcCodeAsNumber)
                    requests.push(newAnchorThread)
                }

                if (brand() === 'weeksDyeWorks') {

                    newWeeksDyeWorksThread = new WeeksDyeWorksThread(hex(), weeksDyeWorksDescription(), dmcCodeAsNumber)
                    requests.push(newWeeksDyeWorksThread)
                }

                if (brand() === 'classicColorworks') {
                    let dmcArr = dmcCodes()

                    if (!mappings().includes('dmc'))
                        dmcArr = []
                    else {
                        dmcArr.forEach(code => {
                            console.log(code)
                            const threadToAdd = new DmcThread(hex(), 'MUST ADD', code, '6-strand')
                            requests.push(threadToAdd)
                        })
                    }

                    newClassicColorworksThread = new ClassicColorworksThread(hex(), classicColorworksDescription(), dmcArr)
                    requests.push(newClassicColorworksThread)
                }

                (async () => {

                    (await axios.all(requests.map(req => req.addThread())).then(axios.spread((res) => {
                        mutate((p: any) => [...p, ...requests])

                    })))
                })()
                console.log(requests)
            }}>save</button>
        {/*  <div class='flex flex-row'>
            <input type={'checkbox'} />
            <p>Show success popup?</p>
        </div> */}
    </div>
}

export default AddThreadInput