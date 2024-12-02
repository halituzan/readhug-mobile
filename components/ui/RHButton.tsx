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
};

const RHButton = ({
  text,
  loading,
  onPress,
  isDisable = false,
  isDanger = false,
  icon,
}: Props) => {
  const { styles } = useStyles();
  return (
    <TouchableOpacity
      style={styles({ isDisable, isDanger }).button}
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
          <Text style={styles({ isDisable, isDanger }).buttonText}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RHButton;
