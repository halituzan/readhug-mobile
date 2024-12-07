// components/PostCard.tsx
import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { formatDate } from "@/lib/formatDate";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, Text, View, ViewStyle } from "react-native";
import Card from "./Card";
import CardContent from "./Card/CardContent";
import CardFooter from "./Card/CardFooter";
import CardHeader from "./Card/CardHeader";
import Comment from "./Icons/Comment";
import Heart from "./Icons/Heart";
import { useTheme } from "@/hooks/useTheme";

const Post = ({ post, isFull = false }: any) => {
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  const [showPostMore, seShowPostMore] = useState<boolean>(false);
  const { themeModeColor } = useTheme();
  return (
    <View>
      <Card>
        <CardHeader>
          <Image
            source={
              post?.book?.bookId?.images?.thumbnail
                ? { uri: post?.book?.bookId?.images?.thumbnail }
                : require("../../assets/placeholder/books/book-placeholder.png")
            }
            style={style.cardBookImage}
          />
          <View style={style.cardEmptyBlock}></View>
          <View style={style.cardBook}>
            <View style={{ flex: 1 }}>
              <Text style={style.cardBookText}>{post?.book?.bookName}</Text>
              <Text style={appStyle({ fontSize: 14 }).cardBookAuthor}>
                {post?.book?.bookId?.authors
                  .map((i: any) => i.name)
                  .join(" & ")}
              </Text>
            </View>
            <Link
              href={{
                pathname: "/profile/[userName]",
                params: { userName: post?.user?.userName as string },
              }}
              style={{ marginLeft: 5 }}
            >
              <Image
                source={{ uri: post?.user?.image }}
                style={style.cardUserAvatar}
              />
            </Link>
          </View>
        </CardHeader>
        <CardContent>
          <View style={{ position: "relative" }}>
            <Link
              style={[style.cardContentText]}
              
              href={{
                pathname: "/post/[id]",
                params: { id: post?._id, userName: post?.user?.userName },
              }}
            >
              {post?.content?.length > 500 && !showPostMore
                ? post.content.slice(0, 497) + "..."
                : post?.content}
            </Link>
            <Pressable
              onPress={() => seShowPostMore(!showPostMore)}
              style={{ position: "absolute", bottom: -12, right: 0 }}
            >
              {post?.content?.length > 500 &&
                (showPostMore ? (
                  <Text style={{ color: themeModeColor(300) }}>Daralt</Text>
                ) : (
                  <Text style={{ color: themeModeColor(300) }}>Tümünü gör</Text>
                ))}
            </Pressable>
          </View>
        </CardContent>
        <CardFooter>
          {/* Interaction Buttons */}
          <View style={style.cardFooterInteractionButtons}>
            <View style={style.cardFooterContainer}>
              <Heart
                color={Colors.colors.primary}
                likedColor={post?.isLiked ? Colors.colors.primary : "none"}
                width={16}
                height={16}
              />

              <Text style={style.cardFooterInteraction}>{post?.likeCount}</Text>
            </View>
            <View style={[style.cardFooterContainer]}>
              <Link
                href={{
                  pathname: "/post/[id]",
                  params: { id: post?._id, userName: post?.user?.userName },
                }}
              >
                <Comment
                  color={Colors.colors.primary}
                  messageColor={
                    post?.commentCount > 0 ? Colors.colors.primary : "none"
                  }
                  width={16}
                  height={16}
                />
              </Link>

              <Link
                href={{
                  pathname: "/post/[id]",
                  params: { id: post?._id, userName: post?.user?.userName },
                }}
                style={style.cardFooterInteraction}
              >
                {post?.commentCount}
              </Link>
            </View>
          </View>

          <Link
            href={{
              pathname: "/post/[id]",
              params: { id: post?._id, userName: post?.user?.userName },
            }}
            style={appStyle({ fontSize: 12 }).cardFooterDate}
          >
            {formatDate(post?.createdAt, "dateTime")}
          </Link>
        </CardFooter>
      </Card>
    </View>
  );
};

export default Post;
