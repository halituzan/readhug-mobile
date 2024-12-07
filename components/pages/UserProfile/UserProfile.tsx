import { useStyles } from "@/hooks/useStyles";
import { GetUserProfile } from "@/services/user/user.service";
import {
  clearProfileLibrary,
  setUserName,
} from "@/store/features/profileLibrarySlice";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import LibraryTabs from "./components/LibraryTabs";
import ProfileCard from "./components/UserProfileCard";
type Props = { userName: string };

const UserProfilePage = ({ userName }: Props) => {
  const dispatch = useDispatch();
  const { pageStyle } = useStyles();
  const style = pageStyle({});
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const getUserProfile = async (userName: string) => {
    setLoading(true);
    try {
      const data = await GetUserProfile(userName);

      dispatch(setUserName(data.user.userName));
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log("error123123213", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(clearProfileLibrary());
  }, []);
  useEffect(() => {
    if (userName) {
      getUserProfile(userName);
    }
  }, [userName]);

  return (
    <View style={style.container}>
      <ProfileCard user={user ?? {}} />
      <LibraryTabs user={user.user ?? {}} />
    </View>
  );
};

export default UserProfilePage;
