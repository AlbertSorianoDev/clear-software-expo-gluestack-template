import { MinusIcon, PlusIcon } from "lucide-react-native";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/screens/components/ui/accordion";

type AccordionItemData = {
  title: string;
  content: string;
};

const items: AccordionItemData[] = [
  {
    title: "Lorem?",
    content:
      "Ad ea proident fugiat occaecat nostrud pariatur pariatur sunt irure adipisicing cupidatat deserunt non. Do reprehenderit sit proident Lorem incididunt do nostrud mollit eu adipisicing cupidatat sunt voluptate. Incididunt exercitation aliqua aliqua aute quis consectetur pariatur fugiat ea est ullamco laborum sit. Dolore in nostrud adipisicing do magna commodo nisi. Nisi labore sint excepteur sit esse dolore mollit dolor. Amet tempor nulla duis dolore eu tempor. Labore ut ad cillum magna ut commodo voluptate magna magna quis sint.",
  },
  { title: "Item 2", content: "Et et ipsum incididunt et nisi aliqua non." },
  {
    title: "Item 3",
    content: "Incididunt proident sunt et anim labore dolore deserunt ad ad adipisicing.",
  },
  {
    title: "Item 4",
    content: "Tempor incididunt nulla labore nostrud qui reprehenderit veniam nisi sunt cupidatat.",
  },
];

export const AccordionComponent = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>(["item-1", "item-2"]);

  return (
    <Accordion
      className="rounded-lg bg-white"
      variant="unfilled"
      type="multiple"
      value={selectedValues}
      onValueChange={setSelectedValues}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className="border-b border-typography-300 last:border-0"
        >
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }: { isExpanded: boolean }) => (
                <>
                  <AccordionTitleText>{item.title}</AccordionTitleText>
                  {isExpanded ? <AccordionIcon as={MinusIcon} /> : <AccordionIcon as={PlusIcon} />}
                </>
              )}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>{item.content}</AccordionContentText>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
