import { Brand, ThreadType, Variant } from "./types";

export class ClassicColorworksModel implements ThreadType {
	description = "";
	color = "";
	dmcCodes: number[] = [];
	brand = "classicColorworks" as Brand;
	variant = "6-strand" as Variant;
	keywords: string[] = [];

	constructor(obj: any) {
		this.description = obj.description;
		this.color = obj.color;
		this.dmcCodes = obj.dmc_codes;
		this.keywords = obj.keywords;
	}

	getSearchableFields = () => {
		const searchableFields: string[] = [];

		searchableFields.push(this.description);
		searchableFields.push(this.brand);
		this.keywords && searchableFields.push(...this.keywords);

		if (this.dmcCodes)
			this.dmcCodes.forEach((dmcCode) =>
				searchableFields.push(String(dmcCode))
			);

		return searchableFields;
	};

	getBrandText = () => `Classic Colorworks`;
}
