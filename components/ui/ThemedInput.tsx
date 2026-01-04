import { useThemeColor } from "@/hooks/use-theme-color";
import { EvilIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type ThemedInputProps = TextInputProps & {
  label?: string;
  error?: string;
  placeholder?: string;
  showSearchIcon?: boolean;
};

export function ThemedInput({
  placeholder,
  label,
  error,
  style,
  ...props
}: ThemedInputProps) {
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const errorColor = useThemeColor({}, "error");

  return (
    <View style={[styles.container, { borderColor: textColor }]}>
      {label && (
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      )}
      <EvilIcons
        style={styles.searchIcon}
        name={"search"}
        size={24}
        color={textColor}
      />
      <TextInput
        {...props}
        placeholder={placeholder}
        placeholderTextColor={`${textColor}99`}
        style={[
          styles.input,
          {
            color: textColor,
            backgroundColor: primaryColor,
            borderColor: error ? errorColor : textColor,
            fontFamily: "SourceSans3-Light",
          },
          style,
        ]}
      />

      {error && (
        <Text style={[styles.error, { color: errorColor }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "90%",
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
    flex: 0.1,
  },
  searchIcon: {
    //flex: 0.1,
  },
  input: {
    fontSize: 16,
    flex: 0.9,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});
