import { useStyles } from "@/hooks/useStyles";
import React from "react";
import { View } from "react-native";
import LibraryTabs from "./components/LibraryTabs";
import ProfileCard from "./components/ProfileCard";
type Props = {
  openModal: any;
};

const ProfilePage = ({ openModal }: Props) => {
  const { pageStyle } = useStyles();
  const style = pageStyle({});

  return (
    <View style={style.container}>
      <ProfileCard openModal={openModal} />
      <LibraryTabs />
    </View>
  );
};

export default ProfilePage;
