import { useTheme } from "@/hooks/useTheme";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React from "react";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";
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
  const { themeModeColor } = useTheme();
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        snapPoints={[750, "85%"]}
        ref={bottomSheetModalRef}
        onChange={handleChange}
        handleStyle={{
          backgroundColor: themeModeColor(600),
          borderTopEndRadius: 8,
          borderTopStartRadius: 8,
        }}
      >
        <BottomSheetView
          style={[
            styles.contentContainer,
            { backgroundColor: themeModeColor(700) },
          ]}
        >
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
    minHeight: Dimensions.get("window").height - 200,
  },
});
