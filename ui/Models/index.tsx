import axios from "axios";
import { ThreadBrandType, ThreadVariantType } from "../Types";

const DEV = 'http://127.0.0.1:5000'
const PROD = 'https://jdilldev.pythonanywhere.com'

export interface IThread {
    brand: ThreadBrandType,
    description: string,
    color: string,
    keywords: string[]
    addThread: () => void
    updateThread?: (thread: IThread) => void
    getBrand: () => ThreadBrandType
    getColor: () => string
    getDescription: () => string
    getCode: () => number | undefined
    getVariant: () => ThreadVariantType
    getKeywords: () => string[]
    getThread?: () => IThread
}

export const getThread = async (brand: ThreadBrandType, identifier: number | string) => {
    const riner = (await axios.get(`${DEV}/get_thread/${brand}/${identifier}`))

    return riner.data
}

export class DmcThread implements IThread {
    brand: ThreadBrandType = "dmc";
    color: string = '#ffffff'
    description: string = '';
    dmcCode: number = 0
    variant: ThreadVariantType = '6-strand'
    keywords: string[] = []
    anchorCodes?: number[]
    weeksDyeWorks?: string[]
    classicColorworks?: string
    notes?: string


    constructor(color: string, dmcCode: number, description: string, variant: ThreadVariantType, keywords: string[] = [], anchorCodes?: number[], weeksDyeWorksDescriptions?: string[], classicColorWorksThread?: string,) {
        this.brand = 'dmc'
        this.color = color
        this.dmcCode = dmcCode
        this.description = description
        this.variant = variant
        this.keywords = keywords
        this.anchorCodes = anchorCodes
        this.weeksDyeWorks = weeksDyeWorksDescriptions
        this.classicColorworks = classicColorWorksThread
    }




    setCode(code: number) { this.dmcCode = code }

    setColor(color: string) { this.color = color }

    setDescription(description: string) { this.description = description }

    setVariant(variant: ThreadVariantType) { this.variant = variant }

    setClassicColorworksThread(s: string) { this.classicColorworks = s }

    getCode() { return this.dmcCode }

    getDmcCode() { return this.dmcCode }

    getBrand() { return this.brand }

    getColor() { return this.color }

    getDescription() { return this.description }

    getAnchorCodes() { return this.anchorCodes || [] }

    getWeeksDyeWorks() { return this.weeksDyeWorks || [] }

    getClassicColorWorks() { return this.classicColorworks || '' }

    getKeywords() { return this.keywords }

    getVariant() { return this.variant }

    getNotes() { return this.notes }

    addAnchorCode(code: number) {
        if (this.anchorCodes)
            this.anchorCodes.push(code)
        else
            this.anchorCodes = [code]
    }

    addWeeksDyeWorksThread(desc: string) {
        if (this.weeksDyeWorks)
            this.weeksDyeWorks.push(desc)
        else
            this.weeksDyeWorks = [desc]
    }

    updateThread([key]: any) {
        axios.put(`${PROD}/update_thread`, {
            brand: this.brand,
            dmcCode: this.dmcCode,
            dmcDescription: this.description,
            anchorCode: this.anchorCodes,
            weeksDyeWorksDescription: [],
            classicColorworksDescription: [],
            hex: this.color,
            variant: this.variant
        })
    }

    addThread = async () => {
        await axios.post(`${DEV}/add_thread`, {
            brand: 'dmc',
            dmc_code: this.dmcCode,
            hex: this.color,
            variant: this.variant,
            description: this.description,
            keywords: this.keywords,
            anchor_codes: this.anchorCodes,
            weeks_dye_works: this.weeksDyeWorks,
            classic_colorworks: this.classicColorworks,
        })
    }

    retrieveThread = (code: number): void => {
        const res = axios.get(`${PROD}/dmc/${code}`)
    }
}

export class AnchorThread implements IThread {
    brand: ThreadBrandType = "anchor";
    color: string = '#ffffff'
    anchorCode: number = 0
    description: string = '';
    keywords: string[] = []
    dmcCode?: number
    notes?: string

    constructor(color: string, anchorCode: number, description: string, keywords: string[] = [], dmcCode?: number) {
        this.brand = 'anchor'
        this.color = color
        this.anchorCode = anchorCode
        this.description = description
        this.keywords = keywords
        this.dmcCode = dmcCode
    }

    addThread = async () => {
        await axios.post(`${DEV}/add_thread`, {
            brand: this.brand,
            hex: this.color,
            anchor_code: this.anchorCode,
            description: this.description,
            keywords: this.keywords,
            dmc_code: this.dmcCode,
        })
    }

    setAnchorCode = (code: number) => {
        this.anchorCode = code
    }

    setColor = (color: string) => {
        this.color = color
    }

    setDescription = (desc: string) => {
        this.description = desc
    }

    setDmcCode = (code: number) => {
        this.dmcCode = code
    }

    setNotes = (notes: string) => {
        this.notes = notes
    }

    getCode() { return this.anchorCode }

    getColor() { return this.color }

    getBrand() { return this.brand }

    getVariant() { return '6-strand' as ThreadVariantType }

    getAnchorCode = () => this.anchorCode

    getDescription = () => this.description

    getDmcCode = () => this.dmcCode

    getKeywords() { return this.keywords }

    getNotes = () => this.notes

}


export class WeeksDyeWorksThread implements IThread {
    brand: ThreadBrandType = "weeksDyeWorks";
    color: string = '#ffffff'
    description: string = '';
    keywords: string[] = []
    dmcCode?: number
    notes?: string

    constructor(color: string, description: string, keywords: string[] = [], dmcCode?: number,) {
        this.brand = 'weeksDyeWorks'
        this.color = color
        this.description = description
        this.keywords = keywords
        this.dmcCode = dmcCode
    }

    addThread = async () => {
        await axios.post(`${DEV}/add_thread`, {
            brand: this.brand,
            hex: this.color,
            description: this.description,
            keywords: this.keywords,
            dmc_code: this.dmcCode,
        })
    }

    setColor = (color: string) => {
        this.color = color
    }

    setDescription = (desc: string) => {
        this.description = desc
    }

    setDmcCode = (code: number) => {
        this.dmcCode = code
    }

    setNotes = (notes: string) => {
        this.notes = notes
    }

    getCode() { return undefined }

    getColor() { return this.color }

    getBrand() { return this.brand }

    getDescription = () => this.description

    getKeywords() { return this.keywords }

    getVariant() { return '6-strand' as ThreadVariantType }

    getDmcCode = () => this.dmcCode
}

export class ClassicColorworksThread implements IThread {
    brand: ThreadBrandType = "classicColorworks";
    color: string = '#ffffff'
    description: string = '';
    keywords: string[] = []
    dmcCodes?: number[]
    notes?: string

    constructor(color: string, description: string, keywords: string[] = [], dmcCodes?: number[]) {
        this.brand = 'classicColorworks'
        this.color = color
        this.description = description
        this.keywords = keywords
        this.dmcCodes = dmcCodes
    }

    getBrand() { return this.brand }

    getCode() { return undefined }

    getColor() { return this.color }

    getDescription() { return this.description };

    getKeywords() { return this.keywords }

    getVariant() { return '6-strand' as ThreadVariantType }

    getDmcCodes() { return this.dmcCodes }

    setDmcCodes(codes: number[]) { this.dmcCodes = codes }

    addThread = async () => {
        await axios.post(`${DEV}/add_thread`, {
            brand: 'classicColorworks',
            dmc_codes: this.dmcCodes,
            description: this.description,
            keywords: this.keywords,
            hex: this.color,
        })
    }
}
