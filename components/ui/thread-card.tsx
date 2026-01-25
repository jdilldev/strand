import { StyleSheet } from "react-native";
import ThemedButton from "./themed-button";

export function ThreadCard({ text, value }: { text: string; value: number }) {
  return (
    <ThemedButton
      style={styles.threadCard}
    >{`${text}\n(${value})`}</ThemedButton>
  );
}

const styles = StyleSheet.create({
  threadCard: {
    flex: 1,
    padding: 15,
  },
});
