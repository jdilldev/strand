import { createSignal } from "solid-js"
import { ColorSwatchType } from "../../Types"

export const ColorSwatchModal = ({ thread: { brand, color, description, code, variant }, onClose }: { thread: ColorSwatchType, onClose: () => void }) => {
    const [swatchColor, setSwatchColor] = createSignal(color)
    return <div class='flex flex-col rounded items-center justify-center gap-2 absolute left-1/4 top-[100px] p-4 bg-white border-2 border-black w-1/2 '>
        <p class="text-sm text-red-600 self-end hover:text-red-300" onClick={() => onClose()}>CLOSE</p>
        <div
            class="w-20 h-20 rounded-md hover:opacity-90"
            style={{ background: swatchColor() }}
        >
            <input type="color" class='opacity-0 w-20 h-20 z-10' value={swatchColor()} onInput={(e) => setSwatchColor(e.target.value)} />
        </div>
        <p class='text-xs text-gray-400'>(click the swatch to edit its color)</p>
        <input type='text' placeholder={'code'} />
        <input type='text' placeholder={'desc'} />
        <input type='text' placeholder={'color'} />
        <p>DMC Brand Code</p>
        <input type='text' />
        <p>Anchor Brand Code</p>
        <input type='text' />
        <p>Weeks Dye Works Brand Code(s)</p>
        <input type='text' />
        <p>Classic Colorworks Brand Code(s)</p>
        <input type='text' />

    </div>
}