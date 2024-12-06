import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
type Props = {
  bottomSheetModalRef: any;
  handleChange: any;
  children: React.ReactNode;
};

const RHBottomSheet = ({
  bottomSheetModalRef,
  handleChange,
  children,
}: Props) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        snapPoints={[750, "85%"]}
        ref={bottomSheetModalRef}
        onChange={handleChange}
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default RHBottomSheet;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    minHeight: Dimensions.get("window").height - 100,
  },
});
