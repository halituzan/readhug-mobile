import PostCard from "@/components/ui/PostCard";
import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { GetUserPosts } from "@/services/post/getUserPosts";
import {
  selectProfilePosts,
  selectProfileUserName,
  setProfileLibrary,
} from "@/store/features/profileLibrarySlice";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const ProfilePosts = ({}: Props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectProfileUserName);
  const postData = useSelector(selectProfilePosts);
  const { profileStyle } = useStyles();
  const style = profileStyle({});
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async (page: number, userName: string) => {
    if (!hasMore) return;
    try {
      setLoading(true);
      const response = await GetUserPosts(page, userName);

      if (response?.data?.length === 0) {
        setHasMore(false);
      } else {
        dispatch(setProfileLibrary({ key: "posts", data: response }));
        setPage(page);
      }
      setLoading(false);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userName) {
      getPosts(1, userName);
    }
  }, [userName]);
  useEffect(() => {
    setData(postData?.data ?? []);
  }, [postData]);

  const handLoadMore = async () => {
    if (!loading && hasMore) {
      // await getPosts(page, userName);
      // setPage((prev) => prev + 1);
    }
  };

  return (
    <View style={style.bookContainer}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 300, paddingTop: 20 }}
        data={data}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({ item }) => <PostCard post={item} />}
        onEndReached={handLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && hasMore ? (
            <ActivityIndicator size='large' color={Colors.colors.primary} />
          ) : null
        }
      />
    </View>
  );
};

export default ProfilePosts;

const styles = StyleSheet.create({});
