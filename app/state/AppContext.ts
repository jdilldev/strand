import { ThreadType } from "@/types/types";
import { createContext } from "react";

export type AppState = {
	allThreads: ThreadType[];
	userEmail?: string;
	userLibrary?: any;
	userPreferences?: any;
};

export const AppContext = createContext<AppState | null>(null);
