import { useStyles } from "@/hooks/useStyles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  const { pageStyle } = useStyles();
  const style = pageStyle({});
  return (
    <SafeAreaView style={style.safeArea}>
      <Text>Notification Screen</Text>
    </SafeAreaView>
  );
}

