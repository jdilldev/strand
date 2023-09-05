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
    updateThread: () => void
    setColor: (color: string) => void
    setDescription: (desc: string) => void
    setKeywords: (keywords: string[]) => void
    getBrand: () => ThreadBrandType
    getColor: () => string
    getDescription: () => string
    getCode: () => number | undefined
    getVariant: () => ThreadVariantType
    getKeywords: () => string[]
    getThread: () => IThread
    deleteThread: () => void
}

export const getThread = async (brand: ThreadBrandType, identifier: number | string) => {
    const thread = (await axios.get(`${DEV}/get_thread/${brand}/${identifier}`))

    return thread.data
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

    setKeywords(keywords: string[]) { this.keywords = keywords }

    setAnchorCodes(anchorCodes: number[]) { this.anchorCodes = anchorCodes }

    setWeeksDyeWorks(descriptions: string[]) { this.weeksDyeWorks = descriptions }

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

    getThread() { return this }

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

    updateThread() {
        axios.put(`${DEV}/update_thread`, {
            brand: 'dmc',
            code: this.dmcCode,
            hex: this.color,
            variant: this.variant,
            description: this.description,
            keywords: this.keywords,
            anchor_codes: this.anchorCodes,
            weeks_dye_works: this.weeksDyeWorks,
            classic_colorworks: this.classicColorworks,
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


    deleteThread = async () => {
        await axios.delete(`${DEV}/delete_thread`)
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
            code: this.anchorCode,
            hex: this.color,
            anchor_code: this.anchorCode,
            description: this.description,
            keywords: this.keywords,
            dmc_code: this.dmcCode,
        })
    }

    updateThread = async () => {
        await axios.put(`${DEV}/update_thread`, {
            brand: 'anchor',
            hex: this.color,
            description: this.description,
            keywords: this.keywords,
            dmc_code: this.dmcCode,
            anchor_code: this.anchorCode,
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

    setKeywords(keywords: string[]) { this.keywords = keywords }

    setNotes = (notes: string) => {
        this.notes = notes
    }

    getCode() { return this.anchorCode }

    getColor() { return this.color }

    getBrand() { return this.brand }

    getVariant() { return '6-strand' as ThreadVariantType }

    getAnchorCode = () => this.anchorCode

    getDescription = () => this.description

    getDmcCode = () => this.dmcCode || 0

    getKeywords() { return this.keywords }

    getNotes = () => this.notes

    getThread() { return this }

    deleteThread = async () => {
        await axios.delete(`${DEV}/delete_thread`)
    }
}


export class WeeksDyeWorksThread implements IThread {
    brand: ThreadBrandType = "weeksDyeWorks";
    color: string = '#ffffff'
    description: string = '';
    keywords: string[] = []
    dmcCode?: number
    notes?: string

    constructor(color: string, description: string, keywords: string[] = [], dmcCode?: number) {
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

    updateThread = async (remove_dmc?: number) => {
        await axios.put(`${DEV}/update_thread`, {
            brand: 'weeksDyeWorks',
            description: this.description,
            dmc_code: this.dmcCode,
            keywords: this.keywords,
            hex: this.color,
            remove_dmc,
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

    setKeywords(keywords: string[]) { this.keywords = keywords }

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

    getThread() { return this }

    deleteThread = async () => {
        await axios.delete(`${DEV}/delete_thread`)
    }
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

    getDmcCodes() { return this.dmcCodes || [] }

    getThread() { return this }

    setColor(color: string) { this.color = color }

    setDescription(desc: string) { this.description = desc }

    setKeywords(keywords: string[]) { this.keywords = keywords }

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

    updateThread = async () => {
        await axios.put(`${DEV}/update_thread`, {
            brand: 'classicColorworks',
            description: this.description,
            dmc_codes: this.dmcCodes,
            keywords: this.keywords,
            hex: this.color,
        })
    }

    deleteThread = async () => {
        await axios.delete(`${DEV}/delete_thread`)
    }
}
