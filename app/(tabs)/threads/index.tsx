import ThemedButton from "@/components/ui/ThemedButton";
import { ThemedInput } from "@/components/ui/ThemedInput";
import ThemedText from "@/components/ui/ThemedText";
import { getSupabaseClient } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const getBrandDisplayName = (brand: string) => {
  switch (brand) {
    case "dmc":
      return "DMC";
    case "anchor":
      return "Anchor";
    case "classicColorworks":
      return "Classic Colorworks";
    case "weeksDyeWorks":
      return "Weeks Dye Works";
    default:
      return brand;
  }
};

const getThreadCodes = (thread: any) => {
  const codes: string[] = [];

  if (thread.dmc_codes) {
    codes.concat(thread.dmc_codes);
  }
  if (thread.dmc_code) {
    codes.push(thread.dmc_code);
  }

  if (thread.anchor_codes) {
    codes.concat(thread.anchor_codes);
  }

  if (thread.code) {
    codes.push(thread.code);
  }

  return codes;
};

export default function AppRoot() {
  const supabase = getSupabaseClient();
  const [allThreads, setAllThreads] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();

  const isThreadMatch = (thread: any) => {
    const threadCodes = getThreadCodes(thread);

    const keywords = (thread.keywords || [])
      .concat([thread.description.replace(/ /g, ""), thread.brand])
      .concat(threadCodes ?? []);

    console.log(keywords);
    return keywords.some(
      (keyword: string | number) =>
        String(keyword)
          .toLowerCase()
          .includes(searchText.replace(/ /g, "").toLowerCase()) // ignore spaces and case in search
    );
  };

  useEffect(() => {
    async function getTodos() {
      const threads: any[] = [];
      const results = await Promise.all([
        supabase.from("dmc").select(),
        supabase.from("anchor").select(),
        supabase.from("classic_colorworks").select(),
        supabase.from("weeks_dye_works").select(),
      ]);

      results.forEach((result) => {
        if (result.error) {
          console.error("Error fetching data:", result.error);
        } else {
          threads.push(...result.data);
        }
      });

      setAllThreads(threads);
    }

    getTodos();
  }, [supabase]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <ThemedInput
          placeholder="Search for threads"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginHorizontal: 10,
          }}
          numColumns={3}
          keyExtractor={(item, index) => `${item.brand}-${item.code}-${index}`}
          data={
            searchText
              ? allThreads.filter((thread) => isThreadMatch(thread))
              : allThreads
          }
          renderItem={({ item }) => (
            <View style={{ display: "flex" }}>
              <ThemedButton
                style={{
                  width: 100,
                  maxWidth: 100,
                  height: 100,
                  backgroundColor: item.color,
                  borderRadius: 10,
                  margin: 10,
                  marginBottom: 1,
                }}
                // eslint-disable-next-line react/no-children-prop
                children={null}
                onPress={() => {
                  console.log("Pressed", item.brand, item.code);
                  router.push({
                    pathname: "/threads/[brand]/[id]",
                    params: {
                      brand: String(item.brand),
                      id: String(item.code),
                    },
                  });
                }}
              />
              <ThemedText
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  fontSize: 11,
                  flexWrap: "wrap",
                  width: 100,
                }}
              >
                {`${getBrandDisplayName(item.brand)} ${item.code || ""}\n${
                  item.description
                }`}
              </ThemedText>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
