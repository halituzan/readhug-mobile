import RHButton from "@/components/ui/RHButton";
import LocalStorage from "@/connections/LocalStorage";
import { width } from "@/constants/Theme";
import { Eraser, LogOutIcon } from "lucide-react-native";
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import AccountInformation from "./components/AccountInformation";
import PasswordChange from "./components/PasswordChange";
import Preferences from "./components/Preferences";
import { useStyles } from "@/hooks/useStyles";

const SettingsPage = () => {
  const clearLocalStorage = async () => {
    await LocalStorage.remove("theme");
  };
  const { styles: appStyle } = useStyles();
  const style= appStyle({})
  return (
    <ScrollView style={styles.container}>
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
        icon={<LogOutIcon color='white' style={styles.buttonIcon} />}
        isDanger={true}
      />
      <View style={{ marginVertical: 10 }}></View>
      <RHButton
        text={"Clear LocalStorage"}
        onPress={clearLocalStorage}
        icon={<Eraser color='white' style={styles.buttonIcon} />}
        isDanger={true}
      />

      <View style={{ paddingBottom: Platform.OS == "ios" ? 100 : 130 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width,
  },

  buttonIcon: {
    marginRight: 10,
  },
});

export default SettingsPage;
