import { width } from "@/constants/Theme";
import { LogOutIcon } from "lucide-react-native";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import AccountInformation from "./components/AccountInformation";
import PasswordChange from "./components/PasswordChange";
import Preferences from "./components/Preferences";

const SettingsPage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Kullanıcı Bilgileri */}
      <AccountInformation />
      {/* Tercihler */}
      <Preferences />
      {/* Şifre İşlemleri */}
      <PasswordChange />

      {/* Çıkış Butonu */}
      <TouchableOpacity style={styles.logoutButton}>
        <LogOutIcon color='white' style={styles.buttonIcon} />
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width,
    paddingBottom: 80,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.OS == "ios" ? 90 : 120,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SettingsPage;
