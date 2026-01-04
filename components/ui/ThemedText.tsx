import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface ThemedTextProps extends TextProps {
  primary?: boolean;
  variant?: "h1" | "h2" | "body";
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const getFontFamily = (variant: ThemedTextProps["variant"]) => {
  switch (variant) {
    case "h1":
      return "SourceSans3-Black";
    case "h2":
      return "ArchivoNarrow-Medium";
    case "body":
    default:
      return "SourceSans3";
  }
};

const getFontSize = (variant: ThemedTextProps["variant"]) => {
  switch (variant) {
    case "h1":
      return 32;
    case "h2":
      return 20;
    case "body":
    default:
      return 16;
  }
};

const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "body",
  primary = false,
  children,
  style,
  ...props
}) => {
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(variant),
          fontSize: getFontSize(variant),
          color: primary ? primaryColor : textColor,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
