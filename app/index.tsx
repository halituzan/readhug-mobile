import WelcomeScreen from "@/components/WelcomeScreen";
import LocalStorage from "@/connections/LocalStorage";
import { changeUserSlice, selectTheme, selectUserLogin } from "@/store/features/userSlice";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const Welcome = (props: Props) => {

  const dispatch = useDispatch();
  const theme = useSelector(selectTheme)
  console.log("theme", theme.isWelcomeScreen);

  const getTheme = async () => {
    const themes = await LocalStorage.get("theme");
    const parsedThemes = JSON.parse(themes as string) ?? {
      language: "",
      mode: "",
      isWelcomeScreen: false,
    };
    dispatch(changeUserSlice({ state: "theme", data: parsedThemes }));
  };

  useEffect(() => { getTheme() }, []);

  if (theme.isWelcomeScreen) {
    return <Redirect href={"/auth/login"} />
  }

  return (
    <WelcomeScreen />
  );
};

export default Welcome;

const styles = StyleSheet.create({});
