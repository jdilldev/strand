import { ThreadType } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const searchThreads = async (searchText: string) => {
	const { data: dmcThreads } = await supabase.from("dmc").select()!;
	const { data: anchorThreads } = await supabase.from("anchor").select();
	const threads = dmcThreads!.concat(anchorThreads);

	if (!searchText) return threads;
	const filteredThreads = threads.filter((thread: ThreadType) => {});
	return filteredThreads;
};
