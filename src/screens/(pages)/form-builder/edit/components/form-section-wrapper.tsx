import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";

import { useEditFormBuilderPageStore } from "../store/edit-form-builder-page-store";

import { Box } from "@/screens/components/ui/box";
import { Pressable } from "@/screens/components/ui/pressable";
import { VStack } from "@/screens/components/ui/vstack";

export const FormSectionWrapper = ({
  children,
}: {
  children: (isSelected: boolean) => ReactNode;
}) => {
  const localRef = useRef(null);

  const selectedItemRef = useEditFormBuilderPageStore((s) => s.selectedItemRef);
  const setSelectedItemRef = useEditFormBuilderPageStore((s) => s.setSelectedItemRef);

  const isSelected = selectedItemRef?.current === localRef.current;

  useEffect(() => {
    if (localRef.current) {
      setSelectedItemRef(localRef);
    }
  }, [setSelectedItemRef]);

  return (
    <Pressable onPress={() => setSelectedItemRef(localRef)}>
      <Box className="relative">
        <VStack
          ref={localRef}
          space="sm"
          className={clsx("rounded border border-typography-100 bg-white text-typography-950", {
            "border-l-8 border-primary-400": isSelected,
          })}
        >
          {children(isSelected)}
        </VStack>
      </Box>
    </Pressable>
  );
};
