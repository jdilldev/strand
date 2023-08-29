import axios, { AxiosError } from "axios"
import { createSignal } from "solid-js"
import { BrandMapping, ColorSwatchType, ThreadBrandType, ThreadVariantType } from "../../Types"

const AddThreadInput = ({ mutate }: { mutate: any }) => {
    const [variant, setVariant] = createSignal<ThreadVariantType>('6-strand')
    const [hex, setHex] = createSignal('#')
    const [dmcDescription, setDmcDescription] = createSignal('')
    const [anchorDescription, setAnchorDescription] = createSignal('')
    const [weeksDyeWorksDescription, setWeeksDyeWorksDescription] = createSignal('')
    const [classicColorworksDescription, setClassicColorworksDescription] = createSignal('')
    const [dmcCode, setDmcCode] = createSignal<string>('')
    const [anchorCode, setAnchorCode] = createSignal<string>('')
    const [mappings, setMappings] = createSignal<ThreadBrandType[]>([])
    const [showSuccess, setShowSuccess] = createSignal(true)

    const [brand, setBrand] = createSignal<ThreadBrandType>('dmc')

    const isChecked = (threadBrand: ThreadBrandType) => brand() === threadBrand || mappings().includes(threadBrand)


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



    const isValid = () => {
        let valid = false

        if (mappings().includes('dmc') || brand() === 'dmc') {
            valid = !!dmcCode() && !!dmcDescription()
        }

        if (mappings().includes('anchor') || brand() === 'anchor') {
            valid = !!anchorCode() && !!anchorDescription()
        }

        if (mappings().includes('weeksDyeWorks') || brand() === 'weeksDyeWorks')
            valid = !!weeksDyeWorksDescription()

        if (mappings().includes('classicColorworks') || brand() === 'classicColorworks')
            valid = !!classicColorworksDescription()


        return valid && !!hex() && hex() !== '#'
    }

    return <div class='z-10 fixed bg-white top-[100px] mb-3 flex flex-col items-center justify-center self-center rounded-md border-black border-2'>
        <div class='p-3 flex flex-col'>
            {false && <p class='text-red-700 self-end' onClick={() => console.log()}>CLOSE</p>}
            <p class="text-center text-lg font-light text-blue-500">Add to Thread Repository</p>
            <div class='flex flex-col mb-4 gap-4'>

                <div class='flex flex-row gap-2 items-center'>
                    {brand() === 'dmc' ? <input checked={true} type={'radio'} name='brand' />
                        : <input checked={isChecked('dmc')} type={'checkbox'} onChange={() => handleBrandCheck('dmc')} />}
                    <p class="hover:text-blue-400" onClick={() => handleBrandChange('dmc')}>DMC</p>
                    <input type='text' value={dmcCode()} onInput={(e) => {
                        if (e.target.value)
                            handleBrandCheck('dmc')
                        else
                            handleBrandUncheck('dmc')
                        setDmcCode(e.target.value)
                    }} class="rounded-md w-16 h-6  text-sm pl-1 placeholder:text-gray-300" placeholder="#" />
                    {brand() === 'dmc' && <input type='text' value={dmcDescription()} onInput={(e) => setDmcDescription(e.target.value)} class="rounded-md w-64 h-6 text-sm pl-1 placeholder:text-gray-300" placeholder="DMC description" />}
                </div>
                <div class='flex flex-row gap-2 items-center'>
                    {(brand() === 'anchor' || brand() === 'dmc') && (brand() === 'anchor' ? <input checked={true} type={'radio'} name='brand' /> :
                        <input checked={isChecked('anchor')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('anchor')} />)}
                    <p class='hover:text-blue-400' onClick={() => handleBrandChange('anchor')}>Anchor</p>
                    {(brand() === 'anchor' || brand() === 'dmc') && <input type='text' value={anchorCode()}
                        onInput={(e) => {
                            if (e.target.value)
                                handleBrandCheck('anchor')
                            else
                                handleBrandUncheck('anchor')
                            setAnchorCode(e.target.value)
                        }} class="rounded-md h-6 w-16 text-sm pl-1 placeholder:text-gray-300" placeholder="#" />}
                    {(brand() === 'anchor' || brand() === 'dmc') && <input type='text' value={anchorDescription()} onInput={(e) => setAnchorDescription(e.target.value)} class="rounded-md h-6 text-sm w-60 pl-1 placeholder:text-gray-300" placeholder="Anchor description" />}
                </div>
                <div class='flex flex-row gap-2 items-center'>
                    {(brand() === 'weeksDyeWorks' || brand() === 'dmc') && (brand() === 'weeksDyeWorks' ? <input type={'radio'} name='brand' checked={true} /> :
                        <input checked={isChecked('weeksDyeWorks')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('weeksDyeWorks')} />)}
                    <p class='hover:text-blue-400' onClick={() => handleBrandChange('weeksDyeWorks')}>Weeks Dye Works</p>
                    {(brand() === 'weeksDyeWorks' || brand() === 'dmc') && <input type='text' value={weeksDyeWorksDescription()} onInput={
                        (e) => {
                            if (e.target.value)
                                handleBrandCheck('weeksDyeWorks')
                            else
                                handleBrandUncheck('weeksDyeWorks')

                            setWeeksDyeWorksDescription(e.target.value)
                        }}
                        class="rounded-md h-6 pl-1 w-60  text-sm placeholder:text-gray-300" placeholder="Weeks Dye Works description" />}
                </div>
                <div class='flex flex-row gap-2 items-center'>
                    {(brand() === 'classicColorworks' || brand() === 'dmc') && (brand() === 'classicColorworks' ? <input type={'radio'} name='brand' checked={true} /> : <input checked={isChecked('classicColorworks')} type={'checkbox'} name='brand' onInput={() => handleBrandCheck('classicColorworks')} />)}
                    <p class='hover:text-blue-400' onClick={() => handleBrandChange('classicColorworks')}>Classic Colorworks</p>
                    {(brand() === 'dmc' || brand() === 'classicColorworks') && <input type='text' value={classicColorworksDescription()} onInput={
                        (e) => {
                            if (e.target.value)
                                handleBrandCheck('classicColorworks')
                            else
                                handleBrandUncheck('classicColorworks')

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
        <button disabled={!isValid()} class='w-1/4 font-light uppercase bg-green-400 text-black rounded-sm mb-1 disabled:opacity-60 disabled:bg-red-300' onClick={() => {
            axios.post('http://127.0.0.1:5000/add_thread', {
                brand: brand(),
                dmcCode: dmcCode() ? Number.parseInt(dmcCode()!) : null,
                dmcDescription: dmcDescription(),
                anchorCode: anchorCode() ? Number.parseInt(anchorCode()!) : null,
                anchorDescription: anchorDescription() ?? null,
                weeksDyeWorksDescription: weeksDyeWorksDescription() ?? null,
                classicColorworksDescription: classicColorworksDescription() ?? null,
                hex: hex(),
                variant: variant()
            })
                .then(function () {
                    alert(`Successfully added thread`)
                    const newColors: ColorSwatchType[] = []

                    if (brand() === 'dmc')
                        newColors.push({ code: Number.parseInt(dmcCode()), description: dmcDescription(), brand: 'dmc', color: hex() })
                    if (mappings().includes('anchor') || brand() === 'anchor')
                        newColors.push({ code: Number.parseInt(anchorCode()), description: anchorDescription(), brand: 'anchor', color: hex() })
                    if (mappings().includes('weeksDyeWorks') || brand() === 'weeksDyeWorks')
                        newColors.push({ description: weeksDyeWorksDescription(), brand: 'weeksDyeWorks', color: hex() })
                    if (mappings().includes('classicColorworks') || brand() === 'classicColorworks')
                        newColors.push({ description: classicColorworksDescription(), brand: 'classicColorworks', color: hex() })

                    mutate((p: any) => [...p, ...newColors])
                })
                .catch(function (error: AxiosError) {
                    alert('Unable to save. Make sure the code is unique and has not already been entered. Make sure you entered numbers for dmc or anchor codes.')
                })
            // setShowModal(false)
        }}>save</button>
        {/*  <div class='flex flex-row'>
            <input type={'checkbox'} />
            <p>Show success popup?</p>
        </div> */}
    </div>
}

export default AddThreadInput