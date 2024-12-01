import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import RNPickerSelect from "react-native-picker-select";
type Props = {
  value: any;
  setValue: any;
  label?: string;
  items: { label: string; value: string }[];
};

const RHSelect = ({ value, setValue, label, items }: Props) => {
  const { theme } = useTheme();
  return (
    <>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: Colors[theme.mode][50],
            },
          ]}
        >
          {label}
        </Text>
      )}

      <RNPickerSelect
        pickerProps={{ style: { height: 50, overflow: "hidden" } }}
        onValueChange={(value: any) => setValue(value)}
        items={items}
        style={{
          inputIOS: {
            ...styles.pickerIOS,
            backgroundColor: Colors[theme.mode][800],
            color: Colors[theme.mode][50],
          },
          inputAndroid: {
            ...styles.pickerAndroid,
            backgroundColor: Colors[theme.mode][800],
            color: Colors[theme.mode][50],
          },
        }}
        value={value}
      />
    </>
  );
};

export default RHSelect;

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: 16,
  },
  pickerIOS: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
    height: 50, // Yükseklik ekleyin
  },
  pickerAndroid: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 0,
    borderRadius: 12,
  },
});
