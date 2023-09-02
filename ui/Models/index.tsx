import axios from "axios";
import { ThreadBrandType, ThreadVariantType } from "../Types";

const DEV = 'http://127.0.0.1:5000'
const PROD = 'https://jdilldev.pythonanywhere.com'

export interface IThread {
    brand: ThreadBrandType,
    description: string,
    color: string,
    addThread: () => void
    updateThread?: (thread: IThread) => void
    getThread: (key: string) => IThread
}

export class DmcThread implements IThread {
    brand: ThreadBrandType = "dmc";
    color: string = '#ffffff'
    description: string = '';
    dmcCode: number = 0
    variant: ThreadVariantType = '6-strand'
    anchorCodes?: number[]
    weeksDyeWorksDescriptions?: string[]
    classicColorWorksThread?: string
    notes?: string


    constructor(color: string, description: string, dmcCode: number, variant: ThreadVariantType, anchorCodes?: number[], weeksDyeWorksDescriptions?: string[], classicColorWorksThread?: string) {
        this.brand = 'dmc'
        this.color = color
        this.description = description
        this.dmcCode = dmcCode
        this.variant = variant
        this.anchorCodes = anchorCodes
        this.weeksDyeWorksDescriptions = weeksDyeWorksDescriptions
        this.classicColorWorksThread = classicColorWorksThread
    }


    getThread = (): DmcThread => {
        return this
    }

    setCode(code: number) { this.dmcCode = code }

    setColor(color: string) { this.color = color }

    setDescription(description: string) { this.description = description }

    setVariant(variant: ThreadVariantType) { this.variant = variant }

    setClassicColorworksThread(s: string) { this.classicColorWorksThread = s }

    getDmcCode() { this.dmcCode }

    getDescription() { this.description }

    getColor() { this.color }

    getVariant() { this.variant }

    getNotes() { this.notes }

    addAnchorCode(code: number) {
        if (this.anchorCodes)
            this.anchorCodes.push(code)
        else
            this.anchorCodes = [code]
    }

    addWeeksDyeWorksThread(desc: string) {
        if (this.weeksDyeWorksDescriptions)
            this.weeksDyeWorksDescriptions.push(desc)
        else
            this.weeksDyeWorksDescriptions = [desc]
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
            dmcCode: this.dmcCode,
            dmcDescription: this.description,
            anchorCode: this.anchorCodes,
            weeksDyeWorksDescriptions: this.weeksDyeWorksDescriptions,
            classicColorworksDescription: [],
            hex: this.color,
            variant: this.variant
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
    dmcCode?: number
    notes?: string

    constructor(color: string, anchorCode: number, description: string, dmcCode?: number) {
        this.brand = 'anchor'
        this.color = color
        this.anchorCode = anchorCode
        this.description = description
        this.dmcCode = dmcCode
    }

    addThread = async () => {
        await axios.post(`${PROD}/add_thread`, {
            brand: this.brand,
            dmcCode: this.dmcCode,
            dmcDescription: this.description,
            weeksDyeWorksDescription: [],
            classicColorworksDescription: [],
            hex: this.color,
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

    getColor = () => this.color


    getAnchorCode = () => this.anchorCode


    getDescription = () => this.description


    getDmcCode = () => this.dmcCode


    getNotes = () => this.notes


    getThread: (key: string) => IThread = () => this

}


export class WeeksDyeWorksThread implements IThread {
    brand: ThreadBrandType = "weeksDyeWorks";
    color: string = '#ffffff'
    description: string = '';
    dmcCode?: number
    notes?: string

    constructor(color: string, description: string, dmcCode?: number) {
        this.brand = 'weeksDyeWorks'
        this.color = color
        this.description = description
        this.dmcCode = dmcCode
    }

    addThread = async () => {
        await axios.post(`${PROD}/add_thread`, {
            brand: this.brand,
            dmcCode: this.dmcCode,
            dmcDescription: this.description,
            weeksDyeWorksDescription: [],
            classicColorworksDescription: [],
            hex: this.color,
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

    getColor = () => this.color


    getDescription = () => this.description


    getDmcCode = () => this.dmcCode


    getThread: (key: string) => IThread = () => this

}

export class ClassicColorworksThread implements IThread {
    brand: ThreadBrandType = "classicColorworks";
    description: string = '';
    color: string = '#ffffff'
    dmcCodes?: number[]
    notes?: string

    constructor(color: string, description: string, dmcCode?: number[]) {
        this.brand = 'classicColorworks'
        this.color = color
        this.description = description
        this.dmcCodes = dmcCode
    }

    addThread = async () => {
        await axios.post(`${DEV}/add_thread`, {
            brand: 'classicColorworks',
            dmc_codes: this.dmcCodes,
            hex: this.color,
        })
    }
    getThread: (key: string) => IThread = () => {
        return this
    }
}
