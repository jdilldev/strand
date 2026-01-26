import { ProjectsList } from "@/components/ui/projects-list";
import ThemedButton from "@/components/ui/themed-button";
import ThemedText from "@/components/ui/themed-text";
import { ThreadCard } from "@/components/ui/thread-card";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AppRoot() {
  const textColor = useThemeColor({}, "text");
  const styles = createStyles(textColor);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          margin: 16,
          display: "flex",
          gap: 12,
          flexDirection: "column",
        }}
      >
        <View style={styles.homeScreenSection}>
          <ThemedText variant="h2">{`My Threads (${394})`}</ThemedText>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
            }}
          >
            <ThreadCard text="Have" value={0} />
            <ThreadCard text="Need" value={0} />
          </View>
        </View>
        <ThemedButton>Browse Thread Catalog</ThemedButton>
        <View style={styles.homeScreenSection}>
          <ThemedText variant="h2">{`My Projects`}</ThemedText>
          <ProjectsList />
        </View>
        <View style={styles.homeScreenSection}>
          <ThemedText variant="h2">{`Recently Viewed Colors`}</ThemedText>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const createStyles = (textColor: string) =>
  StyleSheet.create({
    homeScreenSection: {
      justifyContent: "flex-start",
      borderColor: textColor,
      borderWidth: 1,
      padding: 12,
      gap: 8,
    },
  });
