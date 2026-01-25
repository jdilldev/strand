// app/(tabs)/projects/index.tsx
import ThemedText from "@/components/ui/themed-text";
import { useProjects } from "@/hooks/use-get-projects";
import { Project } from "@/types";
import { getImageUrl } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProjectsList() {
  const { projects, loading, error } = useProjects();
  const router = useRouter();

  const onProjectPress = (project: { id: string; title: string }) => {
    router.push({
      pathname: "/projects/project-details",
      params: { id: project.id, title: project.title },
    });
  };

  const renderItem = useCallback(({ item }: { item: Project }) => {
    const imageUrl =
      getImageUrl("project_images", item.imageUrl) ??
      "https://reactnative.dev/img/tiny_logo.png";

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onProjectPress(item)}
      >
        <Image source={{ uri: imageUrl }} style={styles.thumbnail} />
        <ThemedText variant="h3">{item.title}</ThemedText>
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <ThemedText>{error}</ThemedText>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<ThemedText>No projects yet.</ThemedText>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { fontSize: 24, marginBottom: 12 },
  list: { paddingBottom: 16 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  thumbnail: { width: 32, height: 32, marginRight: 12, borderRadius: 6 },
});
