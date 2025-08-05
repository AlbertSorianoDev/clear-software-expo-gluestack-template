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

import { FormField } from "@/data/forms/types/form-field";
import { SortableQuestionItem } from "@/screens/(pages)/form-builder/components/sortable-question-item-web";
import { Box } from "@/screens/components/ui/box";

export const FormListViewWeb = ({ fields }: { fields?: FormField[] }) => {
  const [items, setItems] = useState(fields ?? []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over?.id) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id.toString() === active.id.toString());
        const newIndex = items.findIndex((item) => item.id.toString() === over.id.toString());

        return arrayMove(items, oldIndex, newIndex);
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
