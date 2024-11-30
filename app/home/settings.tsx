import Colors from "@/constants/Colors";
import { GlobalStyles } from "@/constants/Theme";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[
        GlobalStyles.flexFullCenter,
        { backgroundColor: Colors[theme.mode].background },
      ]}
    >
      <Text style={styles.text}>SettingsScreen</Text>
      <Link href='/home'>Go to About screen</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.colors.primary,
  },
});
