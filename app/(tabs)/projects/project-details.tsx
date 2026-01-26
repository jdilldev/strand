// app/(tabs)/projects/project-details.tsx
import { ExternalLink } from "@/components/external-link";
import ThemedText from "@/components/ui/themed-text";
import { ThreadCard } from "@/components/ui/thread-card";
import { useProject } from "@/hooks/use-get-project";
import { useThemeColor } from "@/hooks/use-theme-color";
import { formatTimestamp } from "@/utils";
import { getImageUrl } from "@/utils/supabase";
import Feather from "@expo/vector-icons/Feather";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProjectDetails() {
  const params = useLocalSearchParams<{ id: string; title?: string }>();
  const router = useRouter();
  const borderColor = useThemeColor({}, "text");
  const { project, loading, error } = useProject(params.id ?? null);
  const textColor = useThemeColor({}, "text");

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !project) {
    return (
      <View style={styles.center}>
        <ThemedText variant="body">{error ?? "Project not found."}</ThemedText>
      </View>
    );
  }

  const imageUrl =
    getImageUrl("project_images", project.imageUrl) ??
    "https://reactnative.dev/img/tiny_logo.png";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText variant="h2">{project.title ?? "Project"}</ThemedText>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/projects/project-form",
              params: { id: project.id, title: project.title },
            })
          }
        >
          <Feather name="edit" size={20} color={textColor} />
        </TouchableOpacity>
      </View>
      <ThemedText variant="h3">
        Started:{" "}
        {formatTimestamp(project.createdAt, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </ThemedText>
      {project.patternLink && (
        <ExternalLink
          href={project.patternLink as RelativePathString}
          text="View Pattern Link"
        />
      )}
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: 200, borderRadius: 10 }}
      />
      <ThemedText variant="body">{project.description}</ThemedText>
      <View
        style={{
          borderColor,
          borderWidth: 1,
          padding: 15,
          gap: 6,
        }}
      >
        <ThemedText variant="h2">Project Threads</ThemedText>
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <ThreadCard text="Have" value={0} />
          <ThreadCard text="Need" value={0} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, display: "flex", gap: 6 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  threadCard: {
    flex: 1,
    padding: 15,
  },
});
