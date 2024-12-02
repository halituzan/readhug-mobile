import RHButton from "@/components/ui/RHButton";
import LocalStorage from "@/connections/LocalStorage";
import { useStyles } from "@/hooks/useStyles";
import { Eraser, LogOutIcon } from "lucide-react-native";
import React from "react";
import { Platform, ScrollView, View } from "react-native";
import AccountInformation from "./components/AccountInformation";
import PasswordChange from "./components/PasswordChange";
import Preferences from "./components/Preferences";

const SettingsPage = () => {
  const clearLocalStorage = async () => {
    await LocalStorage.remove("theme");
  };
  const { pageStyle } = useStyles();

  return (
    <ScrollView style={pageStyle({}).container}>
      {/* Kullanıcı Bilgileri */}
      <AccountInformation />
      {/* Tercihler */}
      <Preferences />
      {/* Şifre İşlemleri */}
      <PasswordChange />

      {/* Çıkış Butonu */}

      <RHButton
        text={"Çıkış"}
        onPress={() => {}}
        icon={<LogOutIcon color='white' style={{ marginRight: 10 }} />}
        isDanger={true}
      />
      <View style={{ marginVertical: 10 }}></View>
      <RHButton
        text={"Clear LocalStorage"}
        onPress={clearLocalStorage}
        icon={<Eraser color='white' style={{ marginRight: 10 }} />}
        isDanger={true}
      />

      <View style={{ paddingBottom: Platform.OS == "ios" ? 100 : 130 }}></View>
    </ScrollView>
  );
};


export default SettingsPage;
