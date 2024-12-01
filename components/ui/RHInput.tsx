import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import Colors from "@/constants/Colors";

interface Props extends TextInputProps {
  label?: string;
  placeholder?: string;
  value: any;
  setValue: any;
}
const RHInput = ({ label, value, setValue, placeholder }: Props) => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1 } as ViewStyle}>
      <Text style={[styles.label, { color: Colors[theme.mode][50] }]}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={[
          styles.input,
          {
            backgroundColor: Colors[theme.mode][800],
            color: Colors[theme.mode][50],
          },
        ]}
      />
    </View>
  );
};

export default RHInput;

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
  },
});
