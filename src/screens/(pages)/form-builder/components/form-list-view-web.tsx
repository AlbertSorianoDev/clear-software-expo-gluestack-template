import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { useUpdateFieldOrder } from "@/data/forms/hooks/use-update-field-order";
import { FormField } from "@/data/forms/types/form-field";
import { SortableQuestionItem } from "@/screens/(pages)/form-builder/components/sortable-question-item-web";
import { Box } from "@/screens/components/ui/box";

export const FormListViewWeb = ({ fields }: { fields?: FormField[] }) => {
  const [items, setItems] = useState(fields ?? []);
  const { mutateAsync: updateFieldOrder } = useUpdateFieldOrder();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over?.id) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id.toString());
      const newIndex = items.findIndex((item) => item.id.toString() === over.id.toString());

      setItems((items) => {
        return arrayMove(items, oldIndex, newIndex);
      });

      const activeItem = items[oldIndex];
      const overItem = items[newIndex];

      await updateFieldOrder({
        formId: activeItem.formId,
        fieldId: activeItem.id,
        toOrder: overItem.order,
      });
    }
  };

  return (
    <Box className="flex-1">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((question) => question.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableQuestionItem key={item.id} question={item} />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  );
};
