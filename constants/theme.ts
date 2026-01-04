/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Colors = {
  light: {
    buttonPrimary: "rgb(116, 164, 162)",
    buttonSecondary: "rgb(232, 176, 164)",
    primary: "rgb(40, 48, 89)",
    text: "rgb(253, 251, 229)",
    error: "rgb(221, 45, 74)",
    accent1: "rgb(255, 189, 124)",
    accent2: "rgb(255, 149, 148)",
  },
  dark: {
    buttonPrimary: "rgb(116, 164, 162)",
    buttonSecondary: "rgb(232, 176, 164)",
    primary: "rgb(40, 48, 89)",
    text: "rgb(253, 251, 229)",
    error: "rgb(221, 45, 74)",
    accent1: "rgb(255, 189, 124)",
    accent2: "rgb(255, 149, 148)",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "SourceSans3",
  },
  default: {
    sans: "SourceSans3",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "SourceSans3, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
