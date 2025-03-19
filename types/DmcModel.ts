import { Brand, ThreadType, Variant } from "./types";

export class DmcModel implements ThreadType {
	color = "";
	description = "";
	code = undefined;
	brand = "dmc" as Brand;
	classicColorworks = "";
	anchorCodes: number[] = [];
	weeksDyeWorks: string[] = [];
	keywords: string[] = [];
	variant = "6-strand" as Variant;

	constructor(obj: any) {
		this.color = obj.color;
		this.description = obj.description;
		this.code = obj.code;
		this.classicColorworks = obj.classic_colorworks;
		this.anchorCodes = obj.anchor_codes;
		this.weeksDyeWorks = obj.weeks_dye_works;
		this.keywords = obj.keywords;
	}

	getSearchableFields = () => {
		const searchableFields: string[] = [];

		searchableFields.push(String(this.code));
		searchableFields.push(this.brand);
		searchableFields.push(this.description.toLowerCase());
		this.classicColorworks && searchableFields.push(this.classicColorworks);
		this.weeksDyeWorks && searchableFields.push(...this.weeksDyeWorks);
		if (this.keywords) searchableFields.push(...this.keywords);

		if (Array.isArray(this.anchorCodes)) {
			this.anchorCodes.forEach((anchorCode) =>
				searchableFields.push(String(anchorCode))
			);
		}

		return searchableFields;
	};

	getBrandText = () => `DMC ${this.code}`;
}
