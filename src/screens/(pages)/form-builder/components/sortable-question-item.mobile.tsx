import React, { useCallback } from "react";
import { View } from "react-native";
import { SortableItem, SortableRenderItemProps } from "react-native-reanimated-dnd";

import { useUpdateFieldOrder } from "@/data/forms/hooks/use-update-field-order";
import { FormField } from "@/data/forms/types/form-field";
import { Badge, BadgeText } from "@/screens/components/ui/badge";
import { Box } from "@/screens/components/ui/box";
import { HStack } from "@/screens/components/ui/hstack";
import { Text } from "@/screens/components/ui/text";
import { formatSnakeCase } from "@/screens/utils/format-snake-case";

const Component = (props: SortableRenderItemProps<FormField>) => {
  const { item, id, positions, lowerBound, autoScrollDirection, itemsCount, itemHeight } = props;

  const { mutateAsync: updateFieldOrder } = useUpdateFieldOrder();

  const handleDrop = useCallback(
    async (currentId: string, position: number) => {
      const currentPosition = position + 1;
      if (currentPosition == item.order) return;
      await updateFieldOrder({ formId: item.formId, fieldId: item.id, toOrder: currentPosition });
    },
    [item.id, item.order, item.formId, updateFieldOrder],
  );

  return (
    <SortableItem
      key={id}
      id={item.id.toString()}
      data={item}
      positions={positions}
      lowerBound={lowerBound}
      autoScrollDirection={autoScrollDirection}
      itemsCount={itemsCount}
      itemHeight={itemHeight}
      // containerHeight={800}
      style={{ marginBottom: 0, flex: 1 }}
      // onDragStart={(currentId, position) => {
      //   const currentPosition = position + 1;
      //   if (currentPosition == item.order) return;
      //   console.log(`Item ${currentId} started dragging from position ${position}`);
      // }}
      onDrop={handleDrop}
    >
      <View
        className="flex-1 flex-row items-center bg-white p-4"
        style={[
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          },
        ]}
      >
        <View className="mr-3 h-6 w-6 items-center justify-center">
          <Text className="font-bold text-primary-600" size="lg">
            ⋮⋮
          </Text>
        </View>
        <View className="flex h-full flex-1">
          <HStack>
            <Text className="line-clamp-1 flex-1 font-bold">{item.title}</Text>
            <Badge action="info" size="sm">
              <BadgeText>{formatSnakeCase(item.inputType ?? "")}</BadgeText>
            </Badge>
          </HStack>
          <Box className="flex-1">
            <Text className="line-clamp-2">{item.description}</Text>
          </Box>
        </View>
      </View>
    </SortableItem>
  );
};

export const SortableQuestionItemMobile = React.memo(Component);
