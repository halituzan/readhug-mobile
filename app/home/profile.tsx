import Colors from "@/constants/Colors";
import { GlobalStyles } from "@/constants/Theme";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[
        GlobalStyles.flexFullCenter,
        { backgroundColor: Colors[theme.mode][950]},
      ]}
    >
      <Text style={styles.text}>Profile screen</Text>
      <Link href='/home'>Go to Home screen</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.colors.primary,
  },
});
