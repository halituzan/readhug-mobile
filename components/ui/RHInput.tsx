import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  KeyboardType,
  KeyboardTypeAndroid,
  KeyboardTypeIOS,
  Text,
  TextInput,
  TextInputProps,
  View
} from "react-native";

interface RHInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value: any;
  setValue: any;
  keyboardType?: KeyboardType | KeyboardTypeAndroid | KeyboardTypeIOS;
}
const RHInput = ({
  label,
  value,
  setValue,
  placeholder,
  keyboardType,
  ...props
}: RHInputProps) => {
  const { themeModeColor } = useTheme();
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  const inputStyles = style.input;
  const labelStyles = style.label;

  return (
    <View style={{ flex: 1 }}>
      {label && <Text style={labelStyles}>{label}</Text>}

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
        style={inputStyles}
        placeholderTextColor={themeModeColor(500)}
        {...props}
      />
    </View>
  );
};

export default RHInput;
