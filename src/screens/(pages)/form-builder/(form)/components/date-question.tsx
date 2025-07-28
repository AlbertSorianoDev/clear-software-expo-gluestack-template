import { format } from "@formkit/tempo";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import { useState } from "react";
import { Platform } from "react-native";

import { Input, InputField, InputIcon } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";

export const DateQuestion = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeNative = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value; // formato: yyyy-mm-dd
    const [year, month, day] = selectedDate.split("-").map(Number);
    const updatedDate = new Date(date);
    updatedDate.setFullYear(year);
    updatedDate.setMonth(month - 1);
    updatedDate.setDate(day);
    updatedDate.setHours(0, 0, 0, 0); // resetear hora para evitar errores visuales
    setDate(updatedDate);
  };

  const formattedDateValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  if (Platform.OS === "web") {
    return (
      <div>
        <input
          type="date"
          id="appointment"
          name="appointment"
          className="px-2 text-typography-950"
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
          value={format(date.toISOString(), "MMMM D, YYYY", "en")}
        />
        <Pressable onPress={() => setShowDatePicker(true)} className="pr-4">
          <InputIcon as={CalendarDays} />
        </Pressable>
      </Input>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChangeNative}
        />
      )}
    </>
  );
};
