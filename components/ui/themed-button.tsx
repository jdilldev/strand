import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ThemedText from "./themed-text";

interface ThemedButtonProps {
  children: string | null;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: "filled" | "outline";
  type?: "primary" | "secondary";
  style?: ViewStyle; // outer container
  disabled?: boolean;

  // Optional icons
  leadingIcon?: React.ReactElement<any>;
  trailingIcon?: React.ReactElement<any>;

  iconSpacing?: number; // space between icon and text
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  type = "primary",
  variant = "filled",
  children,
  onPress,
  style,
  disabled = false,
  leadingIcon,
  trailingIcon,
  iconSpacing = 8,
}) => {
  const textColor = useThemeColor({}, "text");
  const buttonPrimary = useThemeColor({}, "buttonPrimary");
  const buttonSecondary = useThemeColor({}, "buttonSecondary");

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          borderWidth: variant === "outline" ? 2 : 0,
          borderColor: type === "primary" ? buttonPrimary : buttonSecondary,
          backgroundColor:
            variant === "filled"
              ? type === "primary"
                ? buttonPrimary
                : buttonSecondary
              : "transparent",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      disabled={disabled}
    >
      <View style={styles.content}>
        {leadingIcon && (
          <View style={{ marginRight: iconSpacing }}>{leadingIcon}</View>
        )}

        <ThemedText
          style={[
            {
              color: textColor,
              textAlign: "center",
              fontFamily: "SourceSans3-Medium",
            },
          ]}
        >
          {children}
        </ThemedText>

        {trailingIcon && (
          <View style={{ marginLeft: iconSpacing }}>{trailingIcon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ThemedButton;
