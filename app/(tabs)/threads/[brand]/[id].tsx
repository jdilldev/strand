import ThemedText from "@/components/ui/ThemedText";
import { useSupabaseItem } from "@/hooks/useGetThreadFromDatabase";
import { getBrandDisplayName } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const getThreadTableInformation = (brand: string) => {
  switch (brand) {
    case "dmc":
      return { table: "dmc", identifier: "code" };
    case "anchor":
      return { table: "anchor", identifier: "code" };
    case "classicColorworks":
      return { table: "classic_colorworks", identifier: "description" };
    case "weeksDyeWorks":
      return { table: "weeks_dye_works", identifier: "description" };
    default:
      return { table: "", identifier: "" };
  }
};

export default function ThreadDetailScreen() {
  const { brand, id } = useLocalSearchParams<{ brand: string; id: any }>();

  const { table, identifier: column } = getThreadTableInformation(brand);

  const {
    data: thread,
    loading,
    error,
  } = useSupabaseItem<any>(table, column, id);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 16,
        }}
      >
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  console.log("Thread data:", table, column, id, thread);

  if (!thread) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 16,
        }}
      >
        <ThemedText>Thread not found.</ThemedText>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 16,
        gap: 8,
      }}
    >
      <ThemedText variant="h2">{thread.description}</ThemedText>
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: thread.color,
            borderRadius: 8,
          }}
        />
        <View style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <ThemedText variant="body" bold>
            {getBrandDisplayName(thread.brand)}
          </ThemedText>
          <ThemedText variant="body">{id}</ThemedText>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          borderRadius: 8,
        }}
      >
        <ThemedText variant="body">Inventory Quantities</ThemedText>
      </View>
      <ThemedText
        variant="body"
        bold
      >{`Projects using this thread (${0})`}</ThemedText>
    </View>
  );
}
