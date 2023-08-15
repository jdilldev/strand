import { JSXElement } from "solid-js"
import { BrandMapping, ColorSwatchType, ThreadBrandType } from "../../Types"


export const ColorSwatch = ({ color, description, code, brand }: ColorSwatchType) => {
    console.log(color, code, brand, description)
    return <div class='flex flex-col items-start gap-1'
        onClick={() => console.log('click')}
    >
        <div
            class="w-20 h-20 rounded-md hover:-skew-y-3 hover:-skew-x-3"
            style={{ background: color }}
        />
        <div class='flex flex-col'>
            <span class={`text-xs w-20`}>{`${BrandMapping.get(brand)} ${code}`}</span>
            <span class='text-xs w-20'>{description}</span>
        </div>

    </div>
}

/* export const ColorSwatchContainer = ({ heading, children }: { heading: string, children: JSXElement }) => <>
    <h3>{heading}</h3>
    <div class='flex flex-row pb-8 w-full gap-4 items-center'>
        {children}
    </div>
</> */