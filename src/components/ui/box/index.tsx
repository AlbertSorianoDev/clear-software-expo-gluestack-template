import React from "react";
import { View, ViewProps } from "react-native";

import { boxStyle } from "./styles";

import type { VariantProps } from "@gluestack-ui/nativewind-utils";

type IBoxProps = ViewProps & VariantProps<typeof boxStyle> & { className?: string };

const Box = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(function Box(
  { className, ...props },
  ref,
) {
  return <View ref={ref} {...props} className={boxStyle({ class: className })} />;
});

Box.displayName = "Box";
export { Box };
