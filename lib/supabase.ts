import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
//import { Database } from "./database.types";

const supabaseUrl = "https://cmtuataygizvzsasngbg.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtdHVhdGF5Z2l6dnpzYXNuZ2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0MzgwNTMsImV4cCI6MjAyMzAxNDA1M30.A0qq-iUitH-VfJCyTcCSwlPmzHDuZMmTFvYThFyiekE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log(supabase);
