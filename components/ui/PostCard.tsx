// components/PostCard.tsx
import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { formatDate } from "@/lib/formatDate";
import React, { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import CommentCard from "./CommentCard";
import Comment from "./Icons/Comment";
import Heart from "./Icons/Heart";
import RHInput from "./RHInput";
import Card from "./Card";
import CardHeader from "./Card/CardHeader";
import CardContent from "./Card/CardContent";
import CardFooter from "./Card/CardFooter";

const Post = ({ post }: any) => {
  const { styles: appStyle } = useStyles();
  const style = appStyle({});
  const [openMessage, setOpenMessage] = useState(false);
  const [newComment, setNewComment] = useState<string>("");

  return (
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
              {post?.book?.bookId?.authors.map((i: any) => i.name).join(" & ")}
            </Text>
          </View>
          <View style={{ marginLeft: 5 }}>
            <Image
              source={{ uri: post?.user?.image }}
              style={style.cardUserAvatar}
            />
          </View>
        </View>
      </CardHeader>
      <CardContent>
        <Text style={style.cardContentText}>{post.content}</Text>
      </CardContent>

      <CardFooter>
        {/* Interaction Buttons */}
        <View style={style.cardFooterInteractionButtons}>
          <View style={style.cardFooterContainer}>
            <Heart
              color={Colors.colors.primary}
              likedColor={post.isLiked ? Colors.colors.primary : "none"}
            />
            <Text style={style.cardFooterInteraction}>{post.likeCount}</Text>
          </View>
          <Pressable
            onPress={() => {
              setOpenMessage(!openMessage);
            }}
            style={style.cardFooterContainer}
          >
            <Comment
              color={Colors.colors.primary}
              messageColor={
                post.commentCount > 0 ? Colors.colors.primary : "none"
              }
            />
            <Text style={style.cardFooterInteraction}>{post.commentCount}</Text>
          </Pressable>
        </View>

        <Text style={appStyle({ fontSize: 12 }).cardFooterDate}>
          {formatDate(post.createdAt)}
        </Text>
      </CardFooter>
      {/* Comments */}
      {openMessage && (
        <View>
          <RHInput value={newComment} setValue={setNewComment} label={""} />
          <FlatList
            style={{ paddingVertical: 30 }}
            data={post.comments}
            keyExtractor={(item: any) =>
              item?._id + Math.floor(Math.random() * 9999999)
            }
            renderItem={({ item }) => <CommentCard comment={item} />}
            onEndReached={() => {}}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isLoading && <View style={styles.loadingIndicator} />}
          />
        </View>
      )}
    </Card>
  );
};

export default Post;
