type Brand = "dmc" | "anchor" | "weeksDyeWorks" | "classicColorworks";
type Variant = "6-strand" | "variegated" | "satin" | "diamant" | "metallic";

export interface ThreadType {
	brand: Brand;
	description: string;
	color: string;
	keywords: string[];
	variant: Variant;
}

export type DmcModel = ThreadType & {
	brand: "dmc";
	code: number;
	classicColorworks: string;
	anchorCodes: number[];
	weeksDyeWorks: string[];
};

export type AnchorModel = ThreadType & {
	brand: "anchor";
	code: number;
	dmcCode: number;
};

export type WeeksDyeWorksModel = ThreadType & {
	brand: "weeksDyeWorks";
	dmcCode: number;
};
