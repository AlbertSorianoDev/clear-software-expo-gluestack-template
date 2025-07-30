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

import { InputTypeEnum } from "@/data/forms/types/enums";
import { SortableQuestionItem } from "@/screens/(pages)/form-builder/components/sortable-question-item-web";
import { Box } from "@/screens/components/ui/box";

export interface QuestionModel {
  id: number;
  title: string;
  description: string;
  type: InputTypeEnum;
}

const questions: QuestionModel[] = [
  {
    id: 1,
    title: "What's your name?",
    description: "Please enter your full name as it appears on official documents.",
    type: InputTypeEnum.shortText,
  },
  {
    id: 2,
    title: "Tell us about yourself",
    description: "You can include your background, interests, or anything you'd like to share.",
    type: InputTypeEnum.longText,
  },
  {
    id: 3,
    title: "What is your favorite season?",
    description: "Select one option that best represents your favorite time of the year.",
    type: InputTypeEnum.singleChoice,
  },
  {
    id: 4,
    title: "Which programming languages do you use?",
    description: "You can select more than one if applicable.",
    type: InputTypeEnum.multipleChoice,
  },
  {
    id: 5,
    title: "How satisfied are you with our service?",
    description: "1 being not satisfied at all, 5 being extremely satisfied.",
    type: InputTypeEnum.linearScale,
  },
  {
    id: 6,
    title: "Select your country",
    description: "Choose the country where you currently reside.",
    type: InputTypeEnum.dropdown,
  },

  {
    id: 7,
    title: "Upload your document",
    description:
      "Upload a relevant file such as your ID, certificate, or any other required document.",
    type: InputTypeEnum.fileUpload,
  },
  {
    id: 8,
    title: "Select your birhtday's date",
    description: "Select your birhtday's date",
    type: InputTypeEnum.date,
  },
  {
    id: 9,
    title: "Select a time",
    description: "Pick a specific time that fits your availability or schedule.",
    type: InputTypeEnum.time,
  },
];

export const FormListViewWeb = () => {
  const [items, setItems] = useState(questions);

  const sensors = useSensors(
    useSensor(PointerSensor),
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
