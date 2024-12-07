import UserProfilePage from "@/components/pages/UserProfile/UserProfile";
import { useStyles } from "@/hooks/useStyles";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

type Props = {};

const UserProfile = (props: Props) => {
  const { userName } = useLocalSearchParams();
  const { pageStyle } = useStyles();
  const style = pageStyle({});

  return (
    <SafeAreaView style={style.safeArea}>
      <UserProfilePage userName={userName as string} />
    </SafeAreaView>
  );
};

export default UserProfile;
