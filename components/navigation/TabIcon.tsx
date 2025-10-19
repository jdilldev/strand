// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

type IconName =
  | { type: "material"; name: keyof typeof MaterialIcons.glyphMap }
  | { type: "ionic"; name: keyof typeof Ionicons.glyphMap }
  | { type: "fontAwesome"; name: keyof typeof FontAwesome.glyphMap };

interface TabIconProps {
  icon: IconName;
  size: number;
  color?: string;
}
export function TabIcon({ icon, size, color, ...rest }: TabIconProps) {
  switch (icon.type) {
    case "material":
      return <MaterialIcons name={icon.name} size={size} color={color} />;
    case "ionic":
      return <Ionicons name={icon.name} size={size} color={color} />;
    case "fontAwesome":
      return <FontAwesome name={icon.name} size={size} color={color} />;
    default:
      return null;
  }
}
