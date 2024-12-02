import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  toggleTheme,
  setTheme,
  setLanguage,
} from "../store/features/themeSlice";
import Colors from "@/constants/Colors";
import { ColorsTypes, OpacityTypes } from "@/constants/types";

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch: AppDispatch = useDispatch();

  const switchTheme = () => {
    dispatch(toggleTheme());
  };

  const setSpecificTheme = (mode: "light" | "dark") => {
    dispatch(setTheme(mode));
  };

  const changeLanguage = (language: "en" | "tr") => {
    dispatch(setLanguage(language));
  };

  const themeModeColor = (colorCode: ColorsTypes, opacity?: OpacityTypes) => {
    const color = Colors[theme.mode][colorCode];
    if (opacity !== undefined) {
      const opacityHex = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, "0");
      return `${color}${opacityHex}`;
    }

    return color;
  };

  return {
    theme, // { mode, language } objesi
    switchTheme,
    setSpecificTheme,
    changeLanguage,
    themeModeColor,
  };
};
