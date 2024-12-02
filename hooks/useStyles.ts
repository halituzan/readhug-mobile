import { StyleSheet } from "react-native";
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
}

export const useStyles = () => {
  const { themeModeColor } = useTheme();

  const styles = ({
    bgColor,
    color,
    bgOpacity,
    colorOpacity,
    isDisable,
  }: StyleProps) => {
    return StyleSheet.create({
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
      button: {
        ...GlobalStyles.flexFullCenter,
        padding: 10,
        borderRadius: 10,
        height: 48,
        backgroundColor: isDisable
          ? Colors.colors.secondary
          : Colors.colors.primary,
      },
      buttonText: {
        fontSize: 16,
        color: isDisable ? themeModeColor(50) : themeModeColor(900),
      },
    });
  };
  return {
    styles,
  };
};
