import clsx from "clsx";
import React from "react";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface ColumnsWebScrollMobileView {
  children: React.ReactNode;
  scrollViewProps?: React.ComponentProps<typeof ScrollView>;
  className?: string;
}

export function ColumnsWebScrollMobileView({
  children,
  scrollViewProps,
  className,
}: ColumnsWebScrollMobileView) {
  const isMobile = useIsMobile();
  const childrenArray = React.Children.toArray(children);

  const Content = (
    <HStack className={clsx("flex w-full flex-col gap-4 md:flex-row", className)}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<{ className?: string }>;
          const existingClass = element.props.className ?? "";
          const hasFlexOrWidth = /\b(flex|w-|max-w-)\b/.test(existingClass);

          const finalClass = clsx(existingClass, {
            "flex-1": !hasFlexOrWidth,
          });

          return (
            <Box key={index} className={finalClass}>
              {React.cloneElement(element, { className: finalClass })}
            </Box>
          );
        }

        return (
          <Box key={index} className="flex-1">
            {child}
          </Box>
        );
      })}
    </HStack>
  );

  return isMobile ? (
    <ScrollView {...scrollViewProps} className="w-full flex-1">
      {Content}
    </ScrollView>
  ) : (
    <>{Content}</>
  );
}
