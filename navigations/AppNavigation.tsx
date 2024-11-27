//navigation/AppNavigation.tsx
import { Redirect, Stack, useRouter } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";

import LocalStorage from "@/connections/LocalStorage";
import { GetMyInformation } from "@/services/user/user.service";
import {
  changeUserSlice,
  selectTheme,
  selectUserLogin,
} from "@/store/features/userSlice";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const AppNavigation: React.FC = (props: Props) => {
  const dispatch = useDispatch();
  const login = useSelector(selectUserLogin);
  const theme = useSelector(selectTheme);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const getTheme = async () => {
    const themes = await LocalStorage.get("theme");
    const parsedThemes = themes
      ? JSON.parse(themes as string)
      : {
        language: "",
        mode: "",
        isWelcomeScreen: false,
      };
    dispatch(changeUserSlice({ state: "theme", data: parsedThemes }));
  };

  const checkLogin = async () => {
    setIsLoading(true);

    const token = await LocalStorage.get("token");
    if (!token) {
      dispatch(changeUserSlice({ state: "login", data: false }));
      dispatch(changeUserSlice({ state: "info", data: {} }));
      setIsLoading(false);
      return;
    }
    try {
      const res = await GetMyInformation();

      if (res) {
        dispatch(changeUserSlice({ state: "login", data: true }));
        dispatch(changeUserSlice({ state: "info", data: res?.data }));
        setIsLoading(false);
      } else {
        dispatch(changeUserSlice({ state: "login", data: false }));
        dispatch(changeUserSlice({ state: "info", data: {} }));
        setIsLoading(false);
      }
    } catch (err) {
      dispatch(changeUserSlice({ state: "login", data: false }));
      dispatch(changeUserSlice({ state: "info", data: {} }));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      getTheme();
      checkLogin();
    })();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text style={{ color: "white" }}>Loading</Text>
        <Text style={{ color: "white" }}>Loading</Text>
        <Text style={{ color: "white" }}>Loading</Text>
        <Text style={{ color: "white" }}>Loading</Text>
        <Text style={{ color: "white" }}>Loading</Text>
        <Text style={{ color: "white" }}>Loading</Text>
      </View>
    );
  }

  if (!theme.isWelcomeScreen) {
    <Redirect href={"/"} />
  }

  return (
    <Fragment>
      {login ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='home' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='auth' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
      )}
    </Fragment>
  );
};

export default AppNavigation;
