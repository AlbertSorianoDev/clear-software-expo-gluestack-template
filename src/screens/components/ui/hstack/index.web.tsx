import React from "react";

import { hstackStyle } from "./styles";

import type { VariantProps } from "@gluestack-ui/nativewind-utils";

type IHStackProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof hstackStyle>;

const HStack = React.forwardRef<React.ComponentRef<"div">, IHStackProps>(function HStack(
  { className, space, reversed, ...props },
  ref,
) {
  return (
    <div className={hstackStyle({ space, reversed, class: className })} {...props} ref={ref} />
  );
});

HStack.displayName = "HStack";

export { HStack };
