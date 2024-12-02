import Card from "@/components/ui/Card";
import GenderIcon from "@/components/ui/Icons/GenderIcon";
import PickerComponent from "@/components/ui/Picker";
import RHButton from "@/components/ui/RHButton";
import RHInput from "@/components/ui/RHInput";
import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/hooks/useTheme";
import { selectUser } from "@/store/features/userSlice";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Camera, ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {};

const AccountInformation = (props: Props) => {
  const { themeModeColor } = useTheme();
  const { settingsStyles } = useStyles();
  const settings = settingsStyles({});
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
  }, [firstName, lastName, userName, gender, birthDate]);
  return (
    <Card cardTitle='Kullanıcı Bilgileri'>
      <View style={settings.profileImageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../../../assets/placeholder/avatar.png")
          }
          style={settings.profileImage}
        />
        <TouchableOpacity
          style={settings.cameraIconContainer}
          onPress={pickImage}
        >
          <Camera color='white' size={20} />
        </TouchableOpacity>
      </View>

      <View style={settings.nameProvider}>
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

      <View>
        <RHInput
          value={userName}
          setValue={setUserName}
          label='Kullanıcı Adı'
          placeholder='Kullanıcı Adınızı Girin'
        />
      </View>

      <View>
        <Text style={settings.label}>Doğum Tarihi</Text>
        <TouchableOpacity
          style={settingsStyles({ show: showDatePicker }).dateTouchable}
          onPress={() => setShowDatePicker(!showDatePicker)}
        >
          <Text style={settings.dateText}>
            {birthDate.toLocaleDateString()}
          </Text>
          <ChevronRight color='gray' />
        </TouchableOpacity>

        <View style={settingsStyles({ show: showDatePicker }).dateContent}>
          {showDatePicker && (
            <RNDateTimePicker
              value={birthDate}
              mode='date'
              textColor={themeModeColor(50)}
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

      <View style={settings.preferenceRow}>
        <View style={settings.preferenceRowLabel}>
          <GenderIcon color={Colors.colors.primary} width={24} height={24} />
          <Text style={settings.preferenceRowLabelText}>Cinsiyet:</Text>
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
    </Card>
  );
};

export default AccountInformation;
