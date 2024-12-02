import Colors from "@/constants/Colors";
import { GlobalStyles } from "@/constants/Theme";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[
        GlobalStyles.flexFullCenter,
        { backgroundColor: Colors[theme.mode][950] },
      ]}
    >
      <Text style={styles.text}>Notification Screen</Text>
      <Link href='/home'>Go to About screen</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.colors.primary,
  },
});
