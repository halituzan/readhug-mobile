import SettingsPage from "@/components/pages/Settings/Settings";
import { useStyles } from "@/hooks/useStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { pageStyle } = useStyles();
  const style = pageStyle({});
  return (
    <SafeAreaView style={style.safeArea}>
      <SettingsPage />
    </SafeAreaView>
  );
}
