import { Brand, ThreadType, Variant } from "./types";

export class WeeksDyeWorksModel implements ThreadType {
	description = "";
	dmc_code? = undefined;
	color = "";
	brand = "anchor" as Brand;
	variant = "6-strand" as Variant;
	keywords: string[] = [];

	constructor(obj: any) {
		this.description = obj.description;
		this.dmc_code = obj.dmc_code;
		this.color = obj.color;
		this.keywords = obj.keywords;
	}

	getSearchableFields = () => {
		const searchableFields: string[] = [];

		searchableFields.push(this.description);
		searchableFields.push(String(this.dmc_code));
		searchableFields.push(this.color);
		searchableFields.push(this.brand);
		searchableFields.push(...this.keywords);

		return searchableFields;
	};
}
