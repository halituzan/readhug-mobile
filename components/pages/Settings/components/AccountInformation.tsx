import Colors from "@/constants/Colors";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Camera, ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import GenderIcon from "@/components/ui/Icons/GenderIcon";
import PickerComponent from "@/components/ui/Picker";
import RHInput from "@/components/ui/RHInput";
import { useTheme } from "@/hooks/useTheme";
import * as ImagePicker from "expo-image-picker";
import RHButton from "@/components/ui/RHButton";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";

type Props = {};

const AccountInformation = (props: Props) => {
  const { theme: appTheme } = useTheme();
  const user = useSelector(selectUser);
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [userName, setUserName] = useState(user.userName);
  const [birthDate, setBirthDate] = useState(new Date(user.birthDate));
  const [gender, setGender] = useState(
    user?.gender?.toString() ? user?.gender?.toString() : "0"
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(true);
  console.log("birthDate", birthDate);
  console.log("user.birthDate", user.birthDate);
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
  const buttonControl = () => {
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !birthDate ||
      (userName === user.userName &&
        firstName === user.firstName &&
        lastName === user.lastName &&
        gender === user.gender.toString() &&
        birthDate.getTime() === new Date(user.birthDate).getTime())
    ) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    const data = buttonControl();
    setIsDisableButton(data);
    console.log(data, "isDisabled");
  }, [firstName, lastName, userName, gender, birthDate]);
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors[appTheme.mode][700],
        },
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          {
            color: Colors[appTheme.mode][50],
          },
        ]}
      >
        Kullanıcı Bilgileri
      </Text>

      <View style={styles.profileImageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../../../assets/placeholder/avatar.png")
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
        <Text style={[styles.label, { color: Colors[appTheme.mode][50] }]}>
          Doğum Tarihi
        </Text>
        <TouchableOpacity
          style={[
            styles.inputTouchable,
            {
              backgroundColor: Colors[appTheme.mode][800],
              color: Colors[appTheme.mode][50],
              borderColor: "gray",
              borderWidth: 1,
              borderBottomWidth: showDatePicker ? 0 : 1,
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
          style={
            {
              backgroundColor: Colors[appTheme.mode][800],
              color: Colors[appTheme.mode][50],
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderColor: showDatePicker ? "gray" : "transparent",
              borderWidth: showDatePicker ? 1 : 0,
              borderTopWidth: showDatePicker ? 0 : 0,
            } as ViewStyle
          }
        >
          {showDatePicker && (
            <RNDateTimePicker
              value={birthDate}
              mode='date'
              textColor={Colors[appTheme.mode][50]}
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

      <View style={styles.preferenceRow}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
            minWidth: 50,
          }}
        >
          <GenderIcon color={Colors.colors.primary} width={24} height={24} />
          <Text
            style={{
              color: Colors[appTheme.mode][50],
              marginRight: 10,
              minWidth: 50,
            }}
          >
            Cinsiyet:
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <PickerComponent
            value={gender}
            setValue={setGender}
            items={[
              { label: "Erkek", value: "2" },
              { label: "Kadın", value: "1" },
              { label: "Diğer", value: "0" },
            ]}
          />
        </View>
      </View>
      <RHButton text='Kaydet' onPress={() => {}} isDisable={isDisableButton} />
    </View>
  );
};

export default AccountInformation;

const styles = StyleSheet.create({
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
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginBottom: 15,
  },
});