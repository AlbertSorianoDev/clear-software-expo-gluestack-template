import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import { useState } from "react";

import { Input, InputField, InputIcon } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";

export const DateQuestion = () => {
  const [date, setDate] = useState(new Date(1598051730000));

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <>
      <Pressable
        onPress={() => {
          setShowDatePicker(true);
        }}
      >
        <Input className="w-fit" isDisabled>
          <InputField placeholder="Mont, day, year" className="w-fit" />
          <InputIcon as={CalendarDays} />
        </Input>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </>
  );
};
