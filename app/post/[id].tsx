import CommentCard from "@/components/ui/CommentCard";
import ProfileCard from "@/components/ui/ProfileCard";
import RHButton from "@/components/ui/RHButton";
import RHInput from "@/components/ui/RHInput";
import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { CreateComments, GetComments } from "@/services/post/comments";
import { GetUserSinglePosts } from "@/services/post/getUserPosts";
import { selectUser } from "@/store/features/userSlice";
import { useLocalSearchParams } from "expo-router";
import { Send } from "lucide-react-native";
import { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function PostScreen() {
  const { pageStyle } = useStyles();
  const user = useSelector(selectUser);
  const style = pageStyle({});
  const { id, userName } = useLocalSearchParams();
  const [post, setPost] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<any>({});

  const [newComment, setNewComment] = useState<string>("");
  const getSinglePost = async () => {
    try {
      const { data } = await GetUserSinglePosts(id as string);
      setPost(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      getSinglePost();
    }
  }, [id]);
  const CommentItem = memo(({ comment }: { comment: any }) => {
    return <CommentCard comment={comment} />;
  });
  const handleGetComment = async () => {
    try {
      const data = await GetComments(1, 10, post?._id);

      setComments(data ?? {});
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleComment = async () => {
    setIsLoading(true);
    if (!user.isActive) {
      // toast.error("Beğenebilmeniz için giriş yapmalısınız.");
      return;
    }

    try {
      await CreateComments(newComment, post?._id);
      setNewComment("");
      await handleGetComment();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetComment();
  }, [post]);

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={{ flex: 1, width: "100%" }}>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <ProfileCard userName={userName as string} post={post} />
        </View>
        <View style={{ paddingHorizontal: 8 }}>
          <View style={{ position: "relative", height: 50 }}>
            <RHInput
              value={newComment}
              setValue={setNewComment}
              placeholder='Comment'
            />
            <View
              style={{
                position: "absolute",
                right: 0,
                top: 3,
                bottom: 0,
                padding: 1,
                width: 44,
                height: 44,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RHButton
                text={
                  isLoading ? (
                    <ActivityIndicator color={"white"} />
                  ) : (
                    <Send color={"white"} size={16} />
                  )
                }
                onPress={handleComment}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {comments?.total > 0 && (
            <FlatList
              refreshing
              refreshControl={
                <RefreshControl
                  tintColor={Colors.colors.primary}
                  refreshing={isLoading}
                  onRefresh={handleGetComment}
                />
              }
              contentContainerStyle={{ paddingBottom: 20 }}
              data={comments?.data ?? []}
              keyExtractor={(item: any) =>
                item?._id + Math.floor(Math.random() * 9999999)
              }
              ListHeaderComponent={() =>
                isLoading ? (
                  <ActivityIndicator color={Colors.colors.primary} />
                ) : (
                  ""
                )
              }
              renderItem={({ item }) => <CommentItem comment={item} />}
              //   onEndReached={fetchMorePosts}
              //   onEndReachedThreshold={0.1}
              // ListFooterComponent={isLoading && <View style={styles.loadingIndicator} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
