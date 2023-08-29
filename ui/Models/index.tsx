import { ThreadBrandType, ThreadVariantType } from "../Types";

export interface IThread {
    brand: ThreadBrandType,
    description: string,
    color: string,
    getThread: (key: string) => IThread
}


export class DmcThread implements IThread {
    brand: ThreadBrandType = "dmc";
    color: string = '#ffffff'
    description: string = '';
    dmcCode: number = 0
    anchorCode?: number
    weeksDyeWorksThreads?: string[]
    classicColorWorksThreads?: string[]

    getThread: (key: string) => IThread = () => {
        return this
    }
}

export class AnchorThread implements IThread {
    brand: ThreadBrandType = "anchor";
    color: string = '#ffffff'
    anchorCode: number = 0
    description: string = '';
    dmcCode?: number

    getThread: (key: string) => IThread = () => {
        return this
    }
}


export class WeeksDyeWorksThread implements IThread {
    brand: ThreadBrandType = "weeksDyeWorks";
    color: string = '#ffffff'
    description: string = '';
    dmcCode?: number

    getThread: (key: string) => IThread = () => {
        return this
    }
}

export class ClassicColorworksThread implements IThread {
    brand: ThreadBrandType = "classicColorworks";
    description: string = '';
    color: string = '#ffffff'
    dmcCode?: number

    getThread: (key: string) => IThread = () => {
        return this
    }
}
