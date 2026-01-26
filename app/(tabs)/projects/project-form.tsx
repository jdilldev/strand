import ThemedButton from "@/components/ui/themed-button";
import { ThemedInput } from "@/components/ui/themed-input";
import { useProject } from "@/hooks/use-get-project";
import { formatTimestamp } from "@/utils";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ProjectForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();
  const params = useLocalSearchParams<{ id: string }>();
  const { project, loading, error } = useProject(params.id ?? null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: id ? "Edit Project" : "New Project",
    });
  }, [id, navigation]);

  const isEdit = Boolean(id);

  const [projectTitle, setProjectTitle] = useState("");
  const [completionDate, setProjectDate] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");

  useEffect(() => {
    if (!project) return;

    setProjectTitle(project.title ?? "");
    setProjectDate(
      project.createdAt ? formatTimestamp(project.createdAt, {}) : "",
    );
    setProjectDescription(project.description ?? "");
    setProjectLink(project.patternLink ?? "");
  }, [project]);

  const onSave = async () => {
    if (isEdit) {
      // UPDATE project
      // await supabase.from("projects").update({ title: projectTitle }).eq("id", id);
    } else {
      // CREATE project
      // await supabase.from("projects").insert({ title: projectTitle });
    }

    router.back();
  };

  return (
    <View style={styles.container}>
      <ThemedInput
        value={projectTitle}
        onChangeText={setProjectTitle}
        placeholder="Cool Thread Project"
        label="Projct Name"
      />
      <ThemedInput
        value={completionDate}
        onChangeText={setProjectDate}
        placeholder="01/25/2026"
        label="Completion Date"
      />
      <ThemedInput
        value={projectDescription}
        onChangeText={setProjectDescription}
        placeholder=""
        label="Description"
        textarea
      />
      <ThemedButton onPress={onSave}>
        {isEdit ? "Save Changes" : "Create Project"}
      </ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 0,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
  },
});
