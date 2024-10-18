import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { ThreadType } from "@/types/types";
import { DmcModel } from "@/types/DmcModel";
//import { Database } from "./database.types";

const supabaseUrl = "https://xkgwsoiuzhaeuoagbzco.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZ3dzb2l1emhhZXVvYWdiemNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMDQzMTgsImV4cCI6MjA0NDU4MDMxOH0.M8_t_kSGz1oBDwOmI1Qfo_YANT27yvG2tpKg8y48i_g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const _isArray = (potentialArr: any) => Array.isArray(potentialArr);

const _loadData = async () => {
	const { data: dmcThreads } = await supabase.from("dmc").select();
	const { data: anchorThreads } = await supabase.from("anchor").select();
	const { data: classicColorworksThreads } = await supabase
		.from("classic_colorworks")
		.select();
	const { data: weeksDyeWorksThreads } = await supabase
		.from("weeks_dye_works")
		.select();

	if (
		!_isArray(dmcThreads) ||
		!_isArray(anchorThreads) ||
		!_isArray(classicColorworksThreads) ||
		!_isArray(weeksDyeWorksThreads)
	) {
		throw Error("Error retrieving all threads from the database");
		console.log("Error retrieving all threads from the database");
	} else {
		const allThreads: ThreadType[] = [];
		dmcThreads.forEach((dmcThread) => {
			const t = new DmcModel(dmcThread);
			allThreads.push(t);
		});
	}
};

_loadData();

//console.log(supabase);
