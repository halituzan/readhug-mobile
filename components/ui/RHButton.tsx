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

type Props = {
  isDisable?: boolean;
  loading?: boolean;
  text: React.ReactNode;
  onPress: () => void;
};

const RHButton = ({ text, loading, onPress, isDisable }: Props) => {
  return (
    <View style={styles.provider}>
      <TouchableOpacity
        style={styles.button}
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
    backgroundColor: Colors.colors.primary,
    ...GlobalStyles.flexFullCenter,
    height: 48,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
