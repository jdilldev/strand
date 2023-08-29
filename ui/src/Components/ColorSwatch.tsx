import { JSXElement, createSignal } from "solid-js"
import { BrandMapping, ColorSwatchType, ThreadBrandType, ThreadVariantType } from "../../Types"


const variantTagStyle = (variant: ThreadVariantType) => {
    let style = 'text-sky-600 bg-sky-200'
    switch (variant) {
        case '6-strand':
            style = 'text-sky-600 bg-sky-200'
            break;
        case 'diamant':
            style = 'text-amber-600 bg-amber-200'
            break;
        case 'metallic':
            style = 'text-lime-600 bg-lime-200'
            break;
        case 'satin':
            style = 'text-pink-600 bg-pink-200'
            break;
        case 'variegated':
            style = 'text-violet-600 bg-violet-200'
            break;
    }
    return style

}


export const ColorSwatch = ({ color, description, code, brand, variant }: ColorSwatchType) => {

    return <div class='flex flex-col items-start gap-1'>
        <div
            class="w-20 h-20 rounded-md hover:-skew-y-3 hover:-skew-x-3"
            style={{ background: color }}
        />
        {true && <span class={`text-xs font-medium inline-block py-.5 px-1.5 uppercase rounded last:mr-0 mr-0.5 ${variantTagStyle(variant ?? '6-strand')}`}>{variant ?? '6-strand'}</span>}
        <div class='flex flex-col'>
            <span class={`font-semibold text-xs w-20`}>{`${BrandMapping.get(brand)} ${code ?? ''}`}</span>
            <span class='font-light text-xs w-20'>{description}</span>
        </div>
    </div>
}

export const ColorSwatchContainer = ({ heading, children }: { heading: string, children: JSXElement }) => <>
    <h3>{heading}</h3>
    <div class='flex flex-row pb-8 w-full gap-4 items-center'>
        {children}
    </div>
</> 