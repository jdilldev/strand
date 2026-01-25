import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

interface ThemedTextProps extends TextProps {
  primary?: boolean;
  variant?: "h1" | "h2" | "h3" | "body";
  bold?: boolean;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const getFontFamily = (variant: ThemedTextProps["variant"], bold = false) => {
  switch (variant) {
    case "h1":
      return "SourceSans3-Black";
    case "h2":
      return "ArchivoNarrow-Medium";
    case "h3":
      return "SourceSans3-Light";
    case "body":
      if (bold) {
        return "SourceSans3-Bold";
      } else {
        return "SourceSans3-Regular";
      }
    default:
      return "SourceSans3-Regular";
  }
};

const getFontSize = (variant: ThemedTextProps["variant"]) => {
  switch (variant) {
    case "h1":
      return 32;
    case "h2":
      return 20;
    case "h3":
      return 18;
    case "body":
    default:
      return 16;
  }
};

const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "body",
  primary = false,
  bold,
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
          fontFamily: getFontFamily(variant, bold),
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
