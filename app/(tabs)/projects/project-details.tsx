// app/(tabs)/projects/project-details.tsx
import { ExternalLink } from "@/components/external-link";
import ThemedText from "@/components/ui/themed-text";
import { ThreadCard } from "@/components/ui/thread-card";
import { useProject } from "@/hooks/use-get-project";
import { useThemeColor } from "@/hooks/use-theme-color";
import { formatTimestamp } from "@/utils";
import { getImageUrl } from "@/utils/supabase";
import { RelativePathString, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function ProjectDetails() {
  const params = useLocalSearchParams<{ id: string; title?: string }>();
  const borderColor = useThemeColor({}, "text");
  const { project, loading, error } = useProject(params.id ?? null);

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
      <ThemedText variant="h1">{project.title}</ThemedText>
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
  container: { flex: 1, padding: 16, display: "flex", gap: 6 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  threadCard: {
    flex: 1,
    padding: 15,
  },
});
