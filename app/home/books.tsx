import { useStyles } from "@/hooks/useStyles";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BooksScreen() {
  const { pageStyle } = useStyles();
  const style = pageStyle({});
  return (
    <SafeAreaView style={style.safeArea}>
      <Text>BooksScreen</Text>
    </SafeAreaView>
  );
}