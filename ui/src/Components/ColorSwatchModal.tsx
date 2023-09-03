import { Show, createEffect, createResource, createSignal } from "solid-js"
import { BrandMapping, ColorSwatchType } from "../../Types"
import { DmcThread, IThread, getThread } from "../../Models"


export const ColorSwatchModal = ({ thread: { brand, color, description, code, }, onClose }: { thread: ColorSwatchType, onClose: () => void }) => {
    const [swatchColor, setSwatchColor] = createSignal(color)
    const getter = async () => (brand === 'dmc' || brand === 'anchor') ? await getThread(brand, code!) : await getThread(brand, description)
    const [data, { mutate }] = createResource(getter);
    const [thread, setThread] = createSignal<IThread>()

    createEffect(() => {
        if (!data()) return
        if (brand === 'dmc') {
            const { anchor_codes, classic_colorworks, color, description, dmc_code, notes, variant, weeks_dye_works } = data()
            setThread(new DmcThread(color, description, dmc_code, variant, anchor_codes, weeks_dye_works, classic_colorworks))
        }
    })

    return <Show when={data()} fallback={<p></p>} >
        <div class='flex flex-col rounded items-center justify-center gap-2 absolute left-1/4 top-[100px] p-4 bg-white border-2 border-black w-1/2'>
            <p class="text-sm text-red-600 self-end hover:text-red-300" onClick={() => onClose()}>CLOSE</p>
            <p class={`text-center capitalize text-sm`}>{BrandMapping.get(brand)}</p>
            <div
                class="w-20 h-20 rounded-md hover:opacity-90"
                style={{ background: swatchColor() }}
            >
                <input type="color" class='opacity-0 w-20 h-20 z-10' value={swatchColor()} onInput={(e) => setSwatchColor(e.target.value)} />
            </div>
            <p class='text-xs text-gray-300'>(click the swatch to edit its color)</p>
            <input type='text' placeholder={'desc'} />
            <input type='text' placeholder={'color'} value={swatchColor()} onInput={(e) => setSwatchColor(e.target.value)} />
            {brand === 'anchor' && <>
                <p class='text-xs'>Anchor Number</p>
                <input type='text' />
            </>}
            {brand === 'weeksDyeWorks' &&
                <>
                    <p class='text-xs text-center'>Weeks Dye Works Brand Code(s)</p>
                    <input type='text' />
                </>
            }
            {brand === 'classicColorworks' && <>
                <p class="text-center text-xs">Classic Colorworks Description(s)</p>
                <input type='text' />
            </>
            }
            {brand === 'classicColorworks' ?
                <p class='text-xs text-center'>DMC Number(s)</p>

                : <p class='text-xs'>DMC Number {thread() && (thread() as DmcThread).getDmcCode()}</p>}
            <input type='text' />
            {brand === 'dmc' && <>
                <p class='text-xs text-center'>Anchor Number(s)</p>
                <p class='text-xs text-center'>Weeks Dye Works Description(s)</p>
                <p class="text-center text-xs">Classic Colorworks Description</p>

            </>}
        </div>
    </Show>
}