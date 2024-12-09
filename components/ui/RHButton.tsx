import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Props = {
  isDisable?: boolean;
  loading?: boolean;
  text: React.ReactNode;
  onPress: () => void;
  isDanger?: boolean;
  icon?: React.ReactNode;
  height?: number;
  width?: number;
  buttonStyles?: any;
};

const RHButton = ({
  text,
  loading,
  onPress,
  isDisable = false,
  isDanger = false,
  icon,
  height,
  width,
  buttonStyles,
}: Props) => {
  const { styles: appStyle } = useStyles();
  return (
    <TouchableOpacity
      style={[
        appStyle({ isDisable, isDanger, width, height }).button,
        { ...buttonStyles },
      ]}
      onPress={onPress}
      disabled={isDisable || loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.colors.primary} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon && icon}
          <Text style={appStyle({ isDisable, isDanger }).buttonText}>
            {text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RHButton;
