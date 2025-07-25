import { createIcon } from "@gluestack-ui/icon";
import { Path, Svg } from "react-native-svg";
import * as simpleIcons from "simple-icons";

import type { SimpleIcon } from "simple-icons";

export const getSimpleIcon = (name: keyof typeof simpleIcons) => {
  const icon = simpleIcons[name] as unknown as SimpleIcon;
  if (!icon || typeof icon !== "object" || !("path" in icon)) throw new Error("Icon not found");

  return createIcon({
    Root: Svg,
    viewBox: "0 0 28 28",
    path: <Path d={icon.path} fill="currentColor" transform="translate(2,2)" />,
  });
};
