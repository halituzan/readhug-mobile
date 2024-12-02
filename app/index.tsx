import WelcomeScreen from "@/components/WelcomeScreen";
import LocalStorage from "@/connections/LocalStorage";
import { useTheme } from "@/hooks/useTheme";
import {
  setLanguage,
  setTheme,
  setWelcomeScreen,
} from "@/store/features/themeSlice";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Welcome = () => {
  const dispatch = useDispatch();
  const [welcome, setWelcome] = useState<any>(false);
  const { theme } = useTheme();

  const getTheme = async () => {
    setWelcome(true);
    try {
      const themes = await LocalStorage.get("theme");
      const parsedThemes = JSON.parse(themes as string);

      if (parsedThemes.isWelcomeScreen) {
        dispatch(setTheme("light"));
        dispatch(setLanguage("tr"));
        dispatch(setWelcomeScreen(true)); // Varsayılan olarak true
        setWelcome(true);
        return;
      }

      setWelcome(parsedThemes.isWelcomeScreen);
      dispatch(setTheme(parsedThemes?.mode ?? "light"));
      dispatch(setLanguage(parsedThemes?.language ?? "tr"));
      dispatch(setWelcomeScreen(parsedThemes?.isWelcomeScreen ?? false));
    } catch (error) {
      setWelcome(true);
      dispatch(setTheme("light"));
      dispatch(setLanguage("tr"));
      dispatch(setWelcomeScreen(true));
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  if (!welcome) {
    return <Redirect href={"/auth/login"} />;
  }

  return <WelcomeScreen />;
};

export default Welcome;
