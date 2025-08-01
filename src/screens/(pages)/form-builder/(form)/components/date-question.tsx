import { format } from "@formkit/tempo";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import clsx from "clsx";
import { CalendarDays } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";

import { useQuestionContext } from "../hooks/use-question-context";

import { Input, InputField, InputIcon } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";

export const DateQuestion = ({ id }: { id: number }) => {
  const { submission, isLoading } = useQuestionContext(id);

  const [date, setDate] = useState<Date | undefined>(
    submission?.dateResponse?.date ? new Date(submission.dateResponse.date) : undefined,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (submission?.dateResponse?.date) {
      setDate(new Date(submission.dateResponse.date));
    } else {
      setDate(undefined);
    }
  }, [submission?.dateResponse?.date]);

  const onChangeNative = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const formattedDateValue = date ? format(date.toISOString(), "YYYY-MM-DD", "en") : "";

  if (isLoading) return <Text>Loading...</Text>;

  if (Platform.OS === "web") {
    return (
      <div>
        <input
          type="date"
          className={clsx(
            "px-2",
            { "text-typography-950": formattedDateValue != "" },
            { "text-typography-600": formattedDateValue == "" },
          )}
          value={formattedDateValue}
          onChange={onChangeWeb}
        />
      </div>
    );
  }

  return (
    <>
      <Input className="w-fit">
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

      {showDatePicker && (
        <DateTimePicker
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
