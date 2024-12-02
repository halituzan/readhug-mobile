import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Props = {
  isDisable?: boolean;
  loading?: boolean;
  text: React.ReactNode;
  onPress: () => void;
};

const RHButton = ({ text, loading, onPress, isDisable }: Props) => {
  const { styles } = useStyles();
  const buttonStyles = styles({ isDisable }).button;
  const buttonTextStyles = styles({ isDisable }).buttonText;
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={buttonStyles}
        onPress={onPress}
        disabled={isDisable || loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.colors.primary} />
        ) : (
          <Text style={buttonTextStyles}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RHButton;
