import ThemedButton from "@/components/ui/ThemedButton";
import { ThemedInput } from "@/components/ui/ThemedInput";
import ThemedText from "@/components/ui/ThemedText";
import { getSupabaseClient } from "@/utils/supabase";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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

export default function AppRoot() {
  const supabase = getSupabaseClient();
  const [allThreads, setAllThreads] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const navigation = useNavigation();

  const isThreadMatch = (thread: any) => {
    const conidtionalData = thread.dmc_codes
      ? thread.dmc_codes
      : thread.classic_colorworks_codes;
    thread.code = conidtionalData ? conidtionalData.join(", ") : thread.code;
    const keywords = (thread.keywords || []).concat([
      thread.description,
      thread.brand,
    ]);

    return keywords.some((keyword: string) =>
      keyword.toLowerCase().includes(searchText.toLowerCase())
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
        <ThemedInput value={searchText} onChangeText={setSearchText} />
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
                onPress={() =>
                  navigation.navigate("ThreadDetails", { thread: item })
                }
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

const styles = StyleSheet.create({
  input: {},
});
