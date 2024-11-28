import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  toggleTheme,
  setTheme,
  setLanguage,
} from "../store/features/themeSlice";

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

  return {
    theme, // { mode, language } objesi
    switchTheme,
    setSpecificTheme,
    changeLanguage,
  };
};
