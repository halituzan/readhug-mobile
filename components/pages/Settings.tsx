import Colors from "@/constants/Colors";
import { width } from "@/constants/Theme";
import { useTheme } from "@/hooks/useTheme";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {
  Camera,
  ChevronRight,
  GlobeIcon,
  Lock,
  LogOutIcon,
  PaletteIcon,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import RHInput from "../ui/RHInput";
import RHSelect from "../ui/RHSelect";

const SettingsPage = () => {
  const { theme: appTheme } = useTheme();
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setfirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [userName, setUserName] = useState("johndoe");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("tr");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setProfileImage(result.assets[0].uri as any);
    }
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === "ios");
    setBirthDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Kullanıcı Bilgileri */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors[appTheme.mode][700],
          },
        ]}
      >
        <Text style={styles.cardTitle}>Kullanıcı Bilgileri</Text>

        <View style={styles.profileImageContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/placeholder/avatar.png")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.cameraIconContainer}
            onPress={pickImage}
          >
            <Camera color='white' size={20} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              gap: 6,
              marginTop: 6,
            },
          ]}
        >
          <RHInput
            value={firstName}
            setValue={setfirstName}
            label='Ad'
            placeholder='Adınızı Girin'
          />
          <RHInput
            value={lastName}
            setValue={setLastName}
            label='Soyad'
            placeholder='Soyadınızı Girin'
          />
        </View>

        <View style={styles.inputContainer}>
          <RHInput
            value={userName}
            setValue={setUserName}
            label='Kullanıcı Adı'
            placeholder='Kullanıcı Adınızı Girin'
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            // {
            //   backgroundColor: Colors[appTheme.mode][800],
            // },
          ]}
        >
          <Text style={styles.label}>Doğum Tarihi</Text>
          <TouchableOpacity
            style={[
              styles.inputTouchable,
              {
                backgroundColor: Colors[appTheme.mode][800],
                color: Colors[appTheme.mode][50],
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius:
                  Platform.OS === "ios" && showDatePicker ? 0 : 8,
                borderBottomRightRadius:
                  Platform.OS === "ios" && showDatePicker ? 0 : 8,
              } as ViewStyle,
            ]}
            onPress={() => setShowDatePicker(!showDatePicker)}
          >
            <Text
              style={[
                styles.inputText,
                {
                  color: Colors[appTheme.mode][50],
                },
              ]}
            >
              {birthDate.toLocaleDateString()}
            </Text>
            <ChevronRight color='gray' />
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: Colors[appTheme.mode][800],
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            {showDatePicker && (
              <RNDateTimePicker
                value={birthDate}
                mode='date'
                display='spinner'
                onChange={(event: any, selectedDate: any) => {
                  const currentDate = selectedDate || birthDate;
                  setShowDatePicker(Platform.OS === "ios");
                  setBirthDate(currentDate);
                }}
              />
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <RHSelect
            value={gender}
            setValue={setGender}
            label={"Cinsiyet"}
            items={[
              { label: "Erkek", value: "male" },
              { label: "Kadın", value: "female" },
              { label: "Diğer", value: "other" },
            ]}
          />
        </View>
      </View>

      {/* Şifre İşlemleri */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors[appTheme.mode][700],
          },
        ]}
      >
        <Text style={styles.cardTitle}>Şifre İşlemleri</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Lock color='gray' style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Şifre Değiştir</Text>
          <ChevronRight color='gray' />
        </TouchableOpacity>
      </View>

      {/* Tercihler */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors[appTheme.mode][700],
          },
        ]}
      >
        <Text style={styles.cardTitle}>Tercihler</Text>

        <View style={[styles.preferenceRow]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingVertical: 10,
              minWidth: 50,
            }}
          >
            <PaletteIcon
              style={[
                styles.buttonIcon,
                {
                  color: Colors.colors.primary,
                } as ViewStyle,
              ]}
            />
            <Text
              style={{
                color: Colors[appTheme.mode][50],
                marginRight: 10,
                minWidth: 50,
              }}
            >
              Tema:
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <RHSelect
              value={theme}
              setValue={setTheme}
              items={[
                { label: "Açık Tema", value: "light" },
                { label: "Koyu Tema", value: "dark" },
              ]}
            />
          </View>
        </View>
        <View style={[styles.preferenceRow]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <GlobeIcon
              style={[
                styles.buttonIcon,
                {
                  color: Colors.colors.primary,
                } as ViewStyle,
              ]}
            />
            <Text
              style={{
                color: Colors[appTheme.mode][50],
                marginRight: 10,
                minWidth: 50,
              }}
            >
              Dil:
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <RHSelect
              value={language}
              setValue={setLanguage}
              items={[
                { label: "Türkçe", value: "tr" },
                { label: "İngilizce", value: "en" },
              ]}
            />
          </View>
        </View>
      </View>

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
  input: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: -10,
    right: "35%",
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 8,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: "gray",
    marginBottom: 5,
  },
  inputTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
  },
  inputText: {
    fontSize: 16,
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
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginBottom: 15,
  },
  preferenceLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  preferenceText: {
    marginLeft: 10,
    fontSize: 16,
  },
  pickerIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
  },
  pickerAndroid: {
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: "black",
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
