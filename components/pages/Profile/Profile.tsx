import { useStyles } from "@/hooks/useStyles";
import React from "react";
import { View } from "react-native";
import ProfileCard from "./components/ProfileCard";

type Props = {};

const ProfilePage = (props: Props) => {
  const { pageStyle } = useStyles();
  const style = pageStyle({});
  return (
    <View style={style.container}>
      <ProfileCard />
    </View>
  );
};

export default ProfilePage;
