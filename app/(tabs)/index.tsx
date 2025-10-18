import { getSupabaseClient } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AppRoot() {
  const supabase = getSupabaseClient();
  const [allThreads, setAllThreads] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const isThreadMatch = (thread: any) => {
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
      <SafeAreaView style={{ flex: 1, margin: 10 }}>
        <TextInput
          style={{ borderColor: "black", borderWidth: 1, borderRadius: 3 }}
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          numColumns={3}
          contentContainerStyle={{ flexGrow: 1, gap: 10 }}
          style={{ margin: 10, flex: 1, width: "100%" }}
          keyExtractor={(item, index) => `${item.brand}-${item.code}-${index}`}
          data={
            searchText
              ? allThreads.filter((thread) => isThreadMatch(thread))
              : allThreads
          }
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: item.color,
                  borderRadius: 10,
                  margin: 10,
                  marginBottom: 1,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  maxWidth: 100,
                  fontSize: 11,
                }}
              >
                {`${item.brand} ${item.code || ""}`}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 11 }}>
                {`${item.description}`}
              </Text>
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
