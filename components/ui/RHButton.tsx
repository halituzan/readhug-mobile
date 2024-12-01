import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { GlobalStyles } from "@/constants/Theme";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  isDisable?: boolean;
  loading?: boolean;
  text: React.ReactNode;
  onPress: () => void;
};

const RHButton = ({ text, loading, onPress, isDisable }: Props) => {
  const { theme: appTheme } = useTheme();
  return (
    <View style={styles.provider}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isDisable
              ? Colors.colors.secondary
              : Colors.colors.primary,
          },
        ]}
        onPress={onPress}
        disabled={isDisable || loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.colors.primary} />
        ) : (
          <Text style={styles.buttonText}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RHButton;

const styles = StyleSheet.create({
  provider: {
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    ...GlobalStyles.flexFullCenter,
    height: 48,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
