import {
  KeyboardType,
  KeyboardTypeAndroid,
  KeyboardTypeIOS,
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
import { useStyles } from "@/hooks/useStyles";

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
  const { styles } = useStyles();

  const inputStyles = styles({}).input;
  const labelStyles = styles({}).label;

  return (
    <View style={{ flex: 1 }}>
      {label && <Text style={labelStyles}>{label}</Text>}

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
        style={inputStyles}
        {...props}
      />
    </View>
  );
};

export default RHInput;
