import { StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>User ID screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
});
