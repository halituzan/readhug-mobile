import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import React from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";
import CustomPicker from "./PickerModal";
type Props = {
  value: any;
  setValue: any;
  label?: string;
  items: { label: string; value: string }[];
};

const PickerComponent = ({ value, setValue, label, items }: Props) => {
  const { theme } = useTheme();
  const platform = Platform.OS;
  return platform == "ios" ? (
    <PickerIOS
      itemStyle={[
        styles.item,
        {
          color: Colors[theme.mode][50],
        },
      ]}
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

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
    paddingVertical: 0,
    height: Platform.OS == "ios" ? 100 : 0,
  },
});
