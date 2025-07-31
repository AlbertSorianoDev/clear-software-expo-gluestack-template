import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { EditQuestionWrapper } from "../edit/components/edit-form/edit-questions/edit-question-wrapper";
import { RenderEditQuestion } from "../edit/components/edit-form/edit-questions/render-question";
import { FormSectionWrapper } from "../edit/components/form-section-wrapper";
import { RenderPreviewQuestion } from "../edit/components/form-view/render-question-preview";

import { FormField } from "@/data/forms/types/form-field";
import { Heading } from "@/screens/components/ui/heading";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export function SortableQuestionItem({ question }: { question: FormField }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: question.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={{ ...style, touchAction: "none" }} className="mb-4">
      <div
        {...attributes}
        {...listeners}
        className="flex w-full items-center justify-center border border-b-0 border-typography-100 bg-white"
      >
        <Text className="text-center">⋮⋮</Text>
      </div>

      <FormSectionWrapper id={question.id}>
        {(isSelected) =>
          isSelected ? (
            <EditQuestionWrapper
              title={question.title}
              description={question.description ?? ""}
              type={question.inputType}
            >
              <RenderEditQuestion type={question.inputType} />
            </EditQuestionWrapper>
          ) : (
            <VStack space="sm" className="p-5">
              <Heading size="md">{question.title}</Heading>
              <Text size="md">{question.description}</Text>
              <RenderPreviewQuestion type={question.inputType} />
            </VStack>
          )
        }
      </FormSectionWrapper>
    </div>
  );
}
