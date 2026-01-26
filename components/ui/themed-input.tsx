import { useThemeColor } from "@/hooks/use-theme-color";
import { EvilIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import ThemedText from "./themed-text";

type ThemedInputProps = TextInputProps & {
  label?: string;
  error?: string;
  showSearchIcon?: boolean;
  textarea?: boolean;
};

export function ThemedInput({
  label,
  error,
  style,
  showSearchIcon = false,
  textarea = false,
  ...props
}: ThemedInputProps) {
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const errorColor = useThemeColor({}, "error");

  return (
    <View style={styles.wrapper}>
      {label && <ThemedText variant="h2">{label}</ThemedText>}

      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? errorColor : textColor },
        ]}
      >
        {showSearchIcon && (
          <EvilIcons
            name="search"
            size={24}
            color={textColor}
            style={styles.searchIcon}
          />
        )}

        <TextInput
          {...props}
          placeholderTextColor={`${textColor}99`}
          style={[
            styles.input,
            textarea && styles.textarea,
            {
              color: textColor,
              backgroundColor: primaryColor,
              fontFamily: "SourceSans3-Light",
            },
            style,
          ]}
          multiline={textarea}
          textAlignVertical={textarea ? "top" : "center"}
          numberOfLines={textarea ? 4 : 1}
        />
      </View>

      {error && (
        <Text style={[styles.error, { color: errorColor }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  searchIcon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  textarea: {
    minHeight: 100, // 👈 makes it feel multiline
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});
