import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { ChevronRight, Lock } from "lucide-react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { useStyles } from "@/hooks/useStyles";
import Card from "@/components/ui/Card";

type Props = {};

const PasswordChange = (props: Props) => {
  const { theme: appTheme } = useTheme();
  const { styles: appStyle, settingsStyles } = useStyles();
  const style = appStyle({});
  const settings = settingsStyles({});
  return (
    <Card cardTitle='Şifre İşlemleri'>
      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: Colors[appTheme.mode][800],
          },
        ]}
      >
        <Lock
          style={[
            styles.buttonIcon,
            {
              color: Colors.colors.primary,
            } as ViewStyle,
          ]}
        />
        <Text
          style={[
            styles.buttonText,
            {
              color: Colors[appTheme.mode][50],
            },
          ]}
        >
          Şifre Değiştir
        </Text>
        <ChevronRight color='gray' />
      </TouchableOpacity>
    </Card>
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
