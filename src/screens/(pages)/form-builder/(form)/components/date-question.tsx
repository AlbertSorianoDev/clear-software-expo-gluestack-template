import { format } from "@formkit/tempo";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import clsx from "clsx";
import { CalendarDays } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";
import { useQuestionContext } from "../hooks/use-question-context";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { usePostFormFieldResponse } from "@/data/forms/hooks/use-post-form-field-response";
import { useUpdateFormFieldResponse } from "@/data/forms/hooks/use-update-form-field-response";
import { Input, InputField, InputIcon } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";

export const DateQuestion = ({ id }: { id: number }) => {
  const { submissionId } = useParsedSearchParams();

  const { data: formSubmission } = useGetFormSubmission(submissionId ?? 0);
  const { fieldSubmission, isLoading } = useQuestionContext(id);
  const { mutateAsync: postFormFieldResponse } = usePostFormFieldResponse();
  const { mutateAsync: updateFormFieldResponse } = useUpdateFormFieldResponse();

  const [optionKey, setOptionKey] = useState(0);
  const [date, setDate] = useState<Date | undefined>(
    fieldSubmission?.dateResponse?.date ? new Date(fieldSubmission.dateResponse.date) : undefined,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (fieldSubmission?.dateResponse) setOptionKey((prev) => prev + 1);
    if (fieldSubmission?.dateResponse?.date) {
      setDate(new Date(fieldSubmission.dateResponse.date));
    } else {
      setDate(undefined);
    }
  }, [fieldSubmission?.dateResponse]);

  const onChangeNative = async (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      if (!fieldSubmission) {
        await postFormFieldResponse({
          formSubmissionId: submissionId ?? 0,
          body: { formFieldId: id, dateAnswer: selectedDate },
        });
      } else {
        await updateFormFieldResponse({
          fieldResponseId: fieldSubmission.id ?? 0,
          body: { dateAnswer: selectedDate },
        });
      }
    }
  };

  const onChangeWeb = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    if (!selectedDate) {
      setDate(undefined);
      return;
    }
    const [year, month, day] = selectedDate.split("-").map(Number);
    const updatedDate = new Date();
    updatedDate.setFullYear(year, month - 1, day);
    updatedDate.setHours(0, 0, 0, 0);
    setDate(updatedDate);
    if (!fieldSubmission) {
      await postFormFieldResponse({
        formSubmissionId: submissionId ?? 0,
        body: { formFieldId: id, dateAnswer: updatedDate },
      });
    } else {
      await updateFormFieldResponse({
        fieldResponseId: fieldSubmission.id ?? 0,
        body: { dateAnswer: updatedDate },
      });
    }
  };

  const formattedDateValue = date ? format(date.toISOString(), "YYYY-MM-DD", "en") : "";

  if (isLoading) return <Text>Loading...</Text>;

  if (Platform.OS === "web") {
    return (
      <div key={optionKey}>
        <input
          type="date"
          className={clsx(
            "px-2",
            { "text-typography-950": formattedDateValue != "" },
            { "text-typography-600": formattedDateValue == "" },
          )}
          value={formattedDateValue}
          onChange={onChangeWeb}
          readOnly={formSubmission?.isSubmitted}
        />
      </div>
    );
  }

  return (
    <>
      <Input className="w-fit" key={optionKey}>
        <InputField
          placeholder="Month, day, year"
          className="w-fit"
          readOnly
          value={formattedDateValue}
        />
        <Pressable onPress={() => setShowDatePicker(true)} className="pr-4">
          <InputIcon as={CalendarDays} />
        </Pressable>
      </Input>

      {showDatePicker && !formSubmission?.isSubmitted && (
        <DateTimePicker
          key={"dp-" + optionKey}
          testID="dateTimePicker"
          value={date ?? new Date()}
          mode="date"
          is24Hour={true}
          onChange={onChangeNative}
        />
      )}
    </>
  );
};
