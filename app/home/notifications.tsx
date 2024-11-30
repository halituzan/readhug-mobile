import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification Screen</Text>
      <Link href='/home'>Go to About screen</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.colors.primary,
  },
});
