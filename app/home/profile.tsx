import ProfilePage from "@/components/pages/Profile/Profile";
import { useStyles } from "@/hooks/useStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { pageStyle } = useStyles();
  const style = pageStyle({});
  return (
    <SafeAreaView style={style.safeArea}>
      <ProfilePage />
    </SafeAreaView>
  );
}
