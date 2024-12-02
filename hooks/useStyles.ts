import { Platform, StyleSheet } from "react-native";
import { useTheme } from "./useTheme";
import { ColorsTypes, OpacityTypes } from "@/constants/types";
import { GlobalStyles } from "@/constants/Theme";
import Colors from "@/constants/Colors";

interface StyleProps {
  bgColor?: ColorsTypes;
  color?: ColorsTypes;
  bgOpacity?: OpacityTypes;
  colorOpacity?: OpacityTypes;
  isDisable?: boolean;
  isLastChild?: boolean;
}

export const useStyles = () => {
  const { themeModeColor } = useTheme();
  const platform = Platform.OS;
  const styles = ({
    bgColor,
    color,
    bgOpacity,
    colorOpacity,
    isDisable,
    isLastChild,
  }: StyleProps) => {
    return StyleSheet.create({
      // TODO: UI Components
      //? Input
      input: {
        backgroundColor: themeModeColor(
          bgColor && (bgColor >= 0 || bgColor < 951) ? bgColor : 800,
          bgOpacity && (bgOpacity >= 0 || bgOpacity < 101) ? bgOpacity : 100
        ),
        color: themeModeColor(color ? color : 50, colorOpacity && colorOpacity),
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 10,
      },
      label: {
        color: themeModeColor(color ? color : 50),
        marginBottom: 4,
        fontSize: 16,
      },
      //? Button
      button: {
        ...GlobalStyles.flexFullCenter,
        padding: 10,
        borderRadius: 10,
        height: 48,
        backgroundColor: isDisable
          ? themeModeColor(600)
          : Colors.colors.primary,
      },
      buttonText: {
        fontSize: 16,
        color: isDisable ? themeModeColor(50) : themeModeColor(900),
      },
      //? Card
      card: {
        ...GlobalStyles.Card,
        backgroundColor: themeModeColor(800),
      },
      cardEmptyBlock: { minWidth: 75, minHeight: 60, width: 75, height: 60 },
      cardHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderBottomColor: "gray",
        borderBottomWidth: 2,
        paddingBottom: 8,
      },
      cardBook: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
      },
      cardBookText: {
        fontSize: 16,
        fontWeight: "bold",
        color: themeModeColor(100),
      },
      cardBookAuthor: {
        fontSize: 14,
        color: themeModeColor(300),
      },
      cardBookImage: {
        width: 60,
        height: 90,
        position: "absolute",
        top: -30,
        borderRadius: 10,
      },
      cardUserAvatar: { width: 40, height: 40, borderRadius: 100 },
      cardContent: {
        marginBottom: 12,
        width: "100%",
        paddingVertical: 8,
        flexWrap: "wrap",
        flex: 1,
        flexDirection: "row",
      },
      cardContentText: {
        color: themeModeColor(100),
      },
      cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        width: "100%",
        borderTopColor: "gray",
        borderTopWidth: 1,
        paddingVertical: 8,
      },
      cardFooterContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      cardFooterInteraction: {
        marginLeft: 4,
        fontSize: 14,
        color: themeModeColor(300),
      },
      cardFooterDate: {
        fontSize: 12,
        color: themeModeColor(300),
      },

      //! Only Android
      pickerButton: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 12,
        borderRadius: 8,
        backgroundColor: themeModeColor(800),
      },
      selectedValue: {
        color: themeModeColor(50),
      },
      pickerModalContainer: {
        ...GlobalStyles.flexFullCenter,
        width: "100%",
        backgroundColor: themeModeColor(700, 50),
      },
      pickerModalContent: {
        color: themeModeColor(50),
        backgroundColor: themeModeColor(800),
        width: "80%",
        borderRadius: 8,
        padding: 16,
      },
      pickerModalItem: {
        padding: 12,
        borderBottomWidth: isLastChild ? 1 : 0,
        borderBottomColor: themeModeColor(500),
      },
      pickerModalItemText: {
        color: themeModeColor(50),
      },
      //! Only IOS
      pickerItem: {
        color: themeModeColor(50),
        fontSize: 18,
        textAlign: "left",
        fontWeight: "bold",
        paddingVertical: 0,
        height: platform == "ios" ? 100 : 0,
      },
    });
  };
  return {
    styles,
  };
};
