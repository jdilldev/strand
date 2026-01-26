import { ProjectsList } from "@/components/ui/projects-list";
import { StyleSheet, View } from "react-native";

export default function ProjectsScreen() {
  return (
    <View style={styles.container}>
      <ProjectsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
