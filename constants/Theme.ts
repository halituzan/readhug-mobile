import { Dimensions, Platform, ViewStyle } from "react-native";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const GlobalStyles = {
  P15: {
    padding: 15,
  } as ViewStyle,
  PH15: {
    paddingHorizontal: 15,
  } as ViewStyle,
  PT15: {
    paddingTop: 15,
  } as ViewStyle,
  MT30: {
    marginTop: 30,
  } as ViewStyle,
  MT15: {
    marginTop: 15,
  } as ViewStyle,
  MT10: {
    marginTop: 10,
  } as ViewStyle,
  ML15: {
    marginLeft: 15,
  } as ViewStyle,
  ML10: {
    marginLeft: 10,
  } as ViewStyle,
  MB15: {
    marginBottom: 15,
  } as ViewStyle,
  MB10: {
    marginBottom: 10,
  } as ViewStyle,
  MB5: {
    marginBottom: 5,
  } as ViewStyle,
  flexFullCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  } as ViewStyle,
  flexVerticalBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
  flexHorizontalBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  } as ViewStyle,
  flexHorizontalStart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  } as ViewStyle,
  flexHorizontalCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  } as ViewStyle,
  inputBoard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    height: "100%",
  } as ViewStyle,
  SafeArea: {
    backgroundColor: "white",
  } as ViewStyle,
  Page: {
    flex: 1,
  } as ViewStyle,
  Body: {
    height: height - (Platform.OS === "ios" ? 198 : 140),
  } as ViewStyle,
  Card: {
    padding: 15,
    marginBottom: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 } as ViewStyle,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  } as ViewStyle,
  Shadow: {
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  } as ViewStyle,
};
