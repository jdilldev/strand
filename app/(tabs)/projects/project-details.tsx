// app/(tabs)/projects/project-details.tsx
import { ExternalLink } from "@/components/external-link";
import ThemedText from "@/components/ui/themed-text";
import { useProject } from "@/hooks/use-get-project";
import { formatTimestamp } from "@/utils";
import { RelativePathString, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ProjectDetails() {
  const params = useLocalSearchParams<{ id: string; title?: string }>();

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
      <ThemedText variant="body">Description: {project.description}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
