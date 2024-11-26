//navigation/AppNavigation.tsx
import { Redirect, Stack } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";

import LocalStorage from "@/connections/LocalStorage";
import { GetMyInformation } from "@/services/user/user.service";
import { changeUserSlice, selectTheme, selectUserLogin } from "@/store/features/userSlice";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const AppNavigation = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const login = useSelector(selectUserLogin);
  const theme = useSelector(selectTheme)

  const getTheme = async () => {
    const themes = await LocalStorage.get("theme");

    const parsedThemes = JSON.parse(themes as string) ?? {
      language: "",
      mode: "",
      isWelcomeScreen: false,
    };
    dispatch(changeUserSlice({ state: "theme", data: parsedThemes }));
  };

  useEffect(() => {
    const checkLogin = async () => {
      setIsLoading(true);
      const token = await LocalStorage.get("token");
      if (token) {
        try {
          const res = await GetMyInformation();
          console.log("resssssssssss", res);

          dispatch(changeUserSlice({ state: "login", data: true }));
          dispatch(changeUserSlice({ state: "info", data: res?.data }));
        } catch (err) {
          dispatch(changeUserSlice({ state: "login", data: false }));
          dispatch(changeUserSlice({ state: "info", data: {} }));
        }
      } else {
        dispatch(changeUserSlice({ state: "login", data: false }));
        dispatch(changeUserSlice({ state: "info", data: {} }));
      }
      setIsLoading(false);
    };

    (async () => {
      await getTheme(); // İlk önce tema ayarlarını al
      await checkLogin(); // Ardından giriş kontrolü yap
    })();
  }, [dispatch]);

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
    return <Redirect href={"/"} />;
  }
  console.log("login", login);

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
