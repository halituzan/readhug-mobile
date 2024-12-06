import CreateBookSheet from "@/components/pages/Profile/CreateBookSheet";
import ProfilePage from "@/components/pages/Profile/Profile";
import RHBottomSheet from "@/components/ui/RHBottomSheet";
import { useStyles } from "@/hooks/useStyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { pageStyle } = useStyles();
  const style = pageStyle({});
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaView style={style.safeArea}>
      <ProfilePage openModal={handlePresentModalPress} />
      <RHBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        handleChange={handleSheetChanges}
      >
        <CreateBookSheet />
      </RHBottomSheet>
    </SafeAreaView>
  );
}
