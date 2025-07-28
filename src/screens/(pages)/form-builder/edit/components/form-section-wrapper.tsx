import clsx from "clsx";
import { ReactNode } from "react";
import { Platform } from "react-native";

import { useEditFormBuilderPageStore } from "../store/edit-form-builder-page-store";

import { Box } from "@/screens/components/ui/box";
import { Pressable } from "@/screens/components/ui/pressable";
import { VStack } from "@/screens/components/ui/vstack";

export const FormSectionWrapper = ({
  children,
  id,
}: {
  children: (isSelected: boolean) => ReactNode;
  id: number;
}) => {
  const selectedItemId = useEditFormBuilderPageStore((s) => s.selectedItemId);
  const setSelectedItemId = useEditFormBuilderPageStore((s) => s.setSelectedItemId);

  const isWeb = Platform.OS === "web";
  const isSelected = selectedItemId === null ? false : selectedItemId === id;

  const handlePress = () => {
    setSelectedItemId(id);
  };

  return (
    <Pressable onPressIn={isWeb ? handlePress : undefined}>
      <Box className="relative">
        <VStack
          {...(!isWeb && { onTouchStart: handlePress })}
          space="sm"
          className={clsx(
            "rounded border border-typography-100 bg-white text-typography-950 transition-all ease-in-out",
            {
              "border-l-8 border-primary-400": isSelected,
            },
          )}
        >
          {children(isSelected)}
        </VStack>
      </Box>
    </Pressable>
  );
};
