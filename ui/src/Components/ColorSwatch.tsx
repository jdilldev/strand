import { JSXElement } from "solid-js"

type ColorSwatchType = {
    color: string
}

export const ColorSwatch = ({ color }: ColorSwatchType) =>
    <div class='flex flex-col items-start gap-1'>
        <div
            class="w-20 h-20 rounded-md hover:-skew-y-3 hover:-skew-x-3"
            style={{ background: color }}
        />
        <div class='flex flex-col'>
            <span class='text-xs w-20'>DMC 333</span>
            <span class='text-xs w-20'>Blue Violet - Very dark</span>
        </div>
    </div>

export const ColorSwatchContainer = ({ heading, children }: { heading: string, children: JSXElement }) => <>
    <h3>{heading}</h3>
    <div class='flex flex-row pb-8 w-full gap-4 items-center'>
        {children}
    </div>
</>