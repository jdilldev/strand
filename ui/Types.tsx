import { JSX } from "solid-js/jsx-runtime";


export type ColorSwatchType = {
    brand: ThreadBrandType
    color: string
    description: string
    variant?: ThreadVariantType
    code?: number
}

export type ThreadBrandType = 'dmc' | 'anchor' | 'weeksDyeWorks' | 'classicColorworks'

export type ThreadVariantType = '6-strand' | 'diamant' | 'satin' | 'metallic' | 'variegated'


export const BrandMapping: Map<ThreadBrandType, string> = new Map()
BrandMapping.set('dmc', 'DMC')
BrandMapping.set('anchor', 'Anchor')
BrandMapping.set('classicColorworks', 'Classic Colorworks')
BrandMapping.set('weeksDyeWorks', 'Weeks Dye Works')


export type InputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"