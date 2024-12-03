import { Platform, StyleSheet } from "react-native";
import { useTheme } from "./useTheme";
import { ColorsTypes, OpacityTypes } from "@/constants/types";
import { GlobalStyles, width } from "@/constants/Theme";
import Colors from "@/constants/Colors";

interface StyleProps {
  bgColor?: ColorsTypes;
  color?: ColorsTypes;
  bgOpacity?: OpacityTypes;
  colorOpacity?: OpacityTypes;
  isDisable?: boolean;
  isLastChild?: boolean;
  isDanger?: boolean;
  isOk?: boolean;
  fontSize?: number;
  show?: boolean;
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
    isDanger,
    isOk,
    fontSize = 16,
  }: StyleProps) => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: themeModeColor(700),
        width,
      },
      // TODO: UI Components
      //? Input
      input: {
        backgroundColor: themeModeColor(
          bgColor && (bgColor >= 0 || bgColor < 951) ? bgColor : 800,
          bgOpacity && (bgOpacity >= 0 || bgOpacity < 101) ? bgOpacity : 100
        ),
        color: themeModeColor(color ? color : 50, colorOpacity && colorOpacity),
        borderColor: themeModeColor(500),
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 10,
      },
      label: {
        color: themeModeColor(color ? color : 50),
        marginBottom: 4,
        fontSize,
      },
      //? Button
      button: {
        ...GlobalStyles.flexFullCenter,
        padding: 10,
        borderRadius: 10,
        height: 48,
        backgroundColor: isDanger
          ? Colors.colors.danger
          : isDisable
          ? themeModeColor(600)
          : Colors.colors.primary,
      },
      buttonText: {
        fontSize,
        color: "white",
        // color: isDanger
        //   ? "white"
        //   : isDisable
        //   ? themeModeColor(50)
        //   : themeModeColor(900),
      },
      //? Card
      card: {
        ...GlobalStyles.Card,
        backgroundColor: themeModeColor(800),
        height: "auto",
      },
      cardTitle: {
        fontSize,
        fontWeight: "bold",
        marginBottom: 15,
        color: themeModeColor(50),
      },
      cardEmptyBlock: { minWidth: 75, minHeight: 60, width: 75, height: 60 },
      //? Card > Header
      cardHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
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
        fontSize,
        fontWeight: "bold",
        color: themeModeColor(100),
      },
      cardBookAuthor: {
        fontSize,
        color: themeModeColor(200),
      },
      cardBookImage: {
        width: 60,
        height: 90,
        position: "absolute",
        top: -30,
        borderRadius: 10,
      },
      cardUserAvatar: { width: 40, height: 40, borderRadius: 100 },
      //? Card > Content
      cardContent: {
        width: "100%",
        paddingVertical: 16,
        flexWrap: "wrap",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      cardContentText: {
        color: themeModeColor(100),
      },
      //? Card > Footer
      cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        width: "100%",
        borderTopColor: themeModeColor(500),
        borderTopWidth: 1,
        paddingVertical: 8,
      },
      cardFooterInteractionButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      },
      cardFooterContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      cardFooterInteraction: {
        marginLeft: 4,
        fontSize,
        color: themeModeColor(300),
      },
      cardFooterDate: {
        fontSize,
        color: themeModeColor(300),
      },
      //? Welcome Screen
      options: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
      },
      optionButton: {
        backgroundColor: themeModeColor(50),
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 10,
      },
      optionText: {
        color: "white",
      },
      optionSelected: {
        backgroundColor: isOk ? Colors.colors.primary : themeModeColor(500),
      },
      welcomeLogo: {
        width: 100,
        height: 90,
        marginBottom: 20,
      },
      //? Slide
      slide: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
      },
      slideTitle: {
        fontSize,
        fontWeight: "bold",
        color: themeModeColor(100),
        textAlign: "center",
        marginBottom: 20,
      },
      slideSubtitle: {
        fontSize,
        color: themeModeColor(50),
        textAlign: "center",
      },
      pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
      },
      paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 15,
        backgroundColor: themeModeColor(900),
        marginHorizontal: 5,
      },
      paginationDotActive: {
        backgroundColor: Colors.colors.primary,
        width: 12,
        height: 12,
        borderRadius: 15,
      },

      //! Only Android
      pickerButton: {
        borderWidth: 1,
        borderColor: themeModeColor(500),
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
        fontSize,
        textAlign: "left",
        fontWeight: "bold",
        paddingVertical: 0,
        height: platform == "ios" ? 100 : 0,
        backgroundColor: themeModeColor(900, 40),
        // borderWidth: 1,
        marginVertical: 10,
        borderRadius: 16,
      },
    });
  };
  const settingsStyles = ({ fontSize = 16, show = false }: StyleProps) => {
    return StyleSheet.create({
      //? AccountInformation
      profileImageContainer: {
        alignItems: "center",
        marginBottom: 20,
        shadowColor: themeModeColor(50),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        shadowColor: themeModeColor(50),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      cameraIconContainer: {
        position: "absolute",
        bottom: -10,
        right: "35%",
        backgroundColor: Colors.colors.primary,
        borderRadius: 20,
        padding: 8,
        shadowColor: themeModeColor(50),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      nameProvider: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        gap: 6,
      },
      label: {
        marginBottom: 5,
        fontSize,
        color: themeModeColor(50),
      },
      dateTouchable: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: themeModeColor(800),
        padding: 12,
        borderColor: themeModeColor(500),
        borderWidth: 1,
        borderBottomWidth: show ? 0 : 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: Platform.OS === "ios" && show ? 0 : 8,
        borderBottomRightRadius: Platform.OS === "ios" && show ? 0 : 8,
      },
      dateText: {
        fontSize,
        color: themeModeColor(50),
      },
      dateContent: {
        backgroundColor: themeModeColor(800),
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: show ? themeModeColor(500) : "transparent",
        borderWidth: show ? 1 : 0,
        borderTopWidth: show ? 0 : 0,
        marginBottom: 8,
      },
      preferenceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        // marginTop: Platform.OS === "ios" ? 0 : 8,
        marginBottom: Platform.OS === "ios" ? 0 : 8,
      },
      preferenceRowLabel: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 10,
      },
      preferenceRowLabelText: {
        marginHorizontal: 10,
        minWidth: 50,
        color: themeModeColor(50),
      },
    });
  };
  const pageStyle = ({}) => {
    return StyleSheet.create({
      container: {
        flex: 1,
        width,
      },

      safeArea: {
        ...GlobalStyles.flexFullCenter,
        backgroundColor: themeModeColor(950),
      },
      tabStyles: {
        backgroundColor: themeModeColor(900),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 0,
        borderColor: "transparent",
        padding: 0,
        marginHorizontal: 15,
        position: "absolute",
        bottom: Platform.OS == "ios" ? 40 : 30,
        zIndex: 10,
        elevation: 5,
        flex: 1,
        height: 50,
      },
      profileBar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "relative",
      },
      profileBarImage: {
        width: 56,
        height: 56,
        borderRadius: 50,
        objectFit: "cover",
        position: "absolute",
      },
      profileBarButton: {
        top: Platform.OS == "ios" ? -8 : -22,
        left: "auto",
        justifyContent: "center",
        alignItems: "center",
        width: 64,
        height: 64,
        backgroundColor: themeModeColor(950),
        borderRadius: 100,
      },
    });
  };
  const profileStyle = ({ fontSize = 16 }: StyleProps) => {
    return StyleSheet.create({
      container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: themeModeColor(500),
        width: "100%",
        paddingBottom: 8,
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
      },
      userName: {
        marginLeft: 10,
      },
      name: {
        fontSize,
        fontWeight: "bold",
        color: themeModeColor(50),
      },
      info: {
        flexDirection: "row",
      },
      infoItem: {
        marginTop: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: themeModeColor(500),
        marginRight: 8,
        padding: 8,
        borderRadius: 8,
      },
      infoText: {
        fontSize,
        color: themeModeColor(950),
      },
    });
  };

  return {
    styles,
    settingsStyles,
    pageStyle,
    profileStyle,
  };
};
