export type Brand = "dmc" | "anchor" | "weeksDyeWorks" | "classicColorworks";
export type Variant =
	| "6-strand"
	| "variegated"
	| "satin"
	| "diamant"
	| "metallic";

export interface ThreadType {
	description: string;
	brand: Brand;
	variant: Variant;
	color: string;
	keywords: string[];
	getSearchableFields: () => string[];
	getBrandText: () => string;
}

export type AnchorModell = ThreadType & {
	brand: "anchor";
	code: number;
	dmcCode: number;
};

export type WeeksDyeWorksModel = ThreadType & {
	brand: "weeksDyeWorks";
	dmcCode: number;
};
