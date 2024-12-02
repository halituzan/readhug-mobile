import { useStyles } from "@/hooks/useStyles";
import { PickerIOS } from "@react-native-picker/picker";
import React from "react";
import { Platform } from "react-native";
import CustomPicker from "./PickerModal";
type Props = {
  value: any;
  setValue: any;
  label?: string;
  items: { label: string; value: string }[];
};

const PickerComponent = ({ value, setValue, label, items }: Props) => {
  const { styles } = useStyles();
  const platform = Platform.OS;
  return platform == "ios" ? (
    <PickerIOS
      itemStyle={styles({}).pickerItem}
      selectedValue={value}
      onValueChange={(itemValue) => setValue(itemValue)}
    >
      {items?.map((item) => {
        return (
          <PickerIOS.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        );
      })}
    </PickerIOS>
  ) : (
    <CustomPicker value={value} setValue={setValue} items={items} />
  );
};

export default PickerComponent;
