import {
  closestCenter,
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
import { Platform } from "react-native";

import { EditQuestionWrapper } from "../edit/components/edit-form/edit-questions/edit-question-wrapper";
import { RenderEditQuestion } from "../edit/components/edit-form/edit-questions/render-question";
import { FormSectionWrapper } from "../edit/components/form-section-wrapper";
import { RenderPreviewQuestion } from "../edit/components/form-view/render-question-preview";
import { SortableQuestionItem } from "./sortable-question-item-web";

import { Box } from "@/screens/components/ui/box";
import { Heading } from "@/screens/components/ui/heading";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

export interface QuestionModel {
  id: number;
  title: string;
  description: string;
  type: FormInputTypeEnum;
}

const questions: QuestionModel[] = [
  {
    id: 1,
    title: "What's your name?",
    description: "Please enter your full name as it appears on official documents.",
    type: FormInputTypeEnum.shortText,
  },
  {
    id: 2,
    title: "Tell us about yourself",
    description: "You can include your background, interests, or anything you'd like to share.",
    type: FormInputTypeEnum.longText,
  },
  {
    id: 3,
    title: "What is your favorite season?",
    description: "Select one option that best represents your favorite time of the year.",
    type: FormInputTypeEnum.singleChoice,
  },
  {
    id: 4,
    title: "Which programming languages do you use?",
    description: "You can select more than one if applicable.",
    type: FormInputTypeEnum.multipleChoice,
  },
  {
    id: 5,
    title: "How satisfied are you with our service?",
    description: "1 being not satisfied at all, 5 being extremely satisfied.",
    type: FormInputTypeEnum.linearScale,
  },
  {
    id: 6,
    title: "Select your country",
    description: "Choose the country where you currently reside.",
    type: FormInputTypeEnum.dropdown,
  },

  {
    id: 7,
    title: "Upload your document",
    description:
      "Upload a relevant file such as your ID, certificate, or any other required document.",
    type: FormInputTypeEnum.fileUpload,
  },
  {
    id: 8,
    title: "Select your birhtday's date",
    description: "Select your birhtday's date",
    type: FormInputTypeEnum.date,
  },
  {
    id: 9,
    title: "Select a time",
    description: "Pick a specific time that fits your availability or schedule.",
    type: FormInputTypeEnum.time,
  },
];
export const FormListView = () => {
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
      {Platform.OS == "web" ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={items.map((question) => question.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableQuestionItem key={item.id} question={item} />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <VStack space="lg">
          {items.map((question) => (
            <FormSectionWrapper id={question.id} key={question.id}>
              {(isSelected) =>
                isSelected ? (
                  <EditQuestionWrapper
                    title={question.title}
                    description={question.description}
                    type={question.type}
                  >
                    <RenderEditQuestion type={question.type} />
                  </EditQuestionWrapper>
                ) : (
                  <VStack space="sm" className="p-5">
                    <Heading size="md">{question.title}</Heading>
                    <Text size="md">{question.description}</Text>
                    <RenderPreviewQuestion type={question.type} />
                  </VStack>
                )
              }
            </FormSectionWrapper>
          ))}
        </VStack>
      )}
    </Box>
  );
};
