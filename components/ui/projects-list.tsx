import ThemedText from "@/components/ui/themed-text";
import { useProjects } from "@/hooks/use-get-projects";
import { Project } from "@/types";
import { getImageUrl } from "@/utils/supabase";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type ProjectsListProps = {
  emptyText?: string;
};

export function ProjectsList({
  emptyText = "No projects yet.",
}: ProjectsListProps) {
  const router = useRouter();
  const { projects, loading, error } = useProjects();

  if (loading)
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    return (
      <View>
        <ThemedText>{error}</ThemedText>
      </View>
    );

  const onProjectPress = (project: Project) => {
    router.push({
      pathname: "/projects/project-details",
      params: { id: project.id },
    });
  };

  const renderItem = ({ item }: { item: Project }) => {
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
  };

  return (
    <FlatList
      data={projects}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.empty}>
          <ThemedText>{emptyText}</ThemedText>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
  empty: {
    paddingTop: 32,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  thumbnail: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 6,
  },
});
