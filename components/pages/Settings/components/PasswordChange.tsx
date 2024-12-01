import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ChevronRight, Lock } from "lucide-react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";

type Props = {};

const PasswordChange = (props: Props) => {
  const { theme: appTheme } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors[appTheme.mode][700],
        },
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          {
            color: Colors[appTheme.mode][50],
          },
        ]}
      >
        Şifre İşlemleri
      </Text>
      <TouchableOpacity style={styles.actionButton}>
        <Lock color='gray' style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Şifre Değiştir</Text>
        <ChevronRight color='gray' />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
  },
});
