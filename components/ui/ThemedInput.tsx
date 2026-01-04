import { useThemeColor } from "@/hooks/use-theme-color";
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
};

export function ThemedInput({
  label,
  error,
  style,
  ...props
}: ThemedInputProps) {
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const errorColor = useThemeColor({}, "error");

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      )}

      <TextInput
        {...props}
        placeholderTextColor={`${textColor}99`}
        style={[
          styles.input,
          {
            color: textColor,
            backgroundColor: primaryColor,
            borderColor: error ? errorColor : textColor,
            fontFamily: "SourceSans3",
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
    borderRadius: 3,
    width: "90%",
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});
