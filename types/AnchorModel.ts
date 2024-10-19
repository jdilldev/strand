import { Brand, ThreadType, Variant } from "./types";

export class AnchorModel implements ThreadType {
	code = undefined;
	dmc_code? = undefined;
	color = "";
	description = "";
	brand = "anchor" as Brand;
	variant = "6-strand" as Variant;
	keywords: string[] = [];

	constructor(obj: any) {
		this.code = obj.code;
		this.dmc_code = obj.dmc_code;
		this.color = obj.color;
		this.description = obj.description;
		this.keywords = obj.keywords;
	}

	getSearchableFields = () => {
		const searchableFields: string[] = [];

		searchableFields.push(String(this.code));
		searchableFields.push(String(this.dmc_code));
		searchableFields.push(this.color);
		searchableFields.push(this.description);
		searchableFields.push(this.brand);
		searchableFields.push(...this.keywords);

		return searchableFields;
	};

	getBrandText = () => `Anchor ${this.code}`;
}
