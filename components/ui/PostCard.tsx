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

const Post = ({ post }: any) => {
  const { styles } = useStyles();
  const [openMessage, setOpenMessage] = useState(false);
  const [newComment, setNewComment] = useState<string>("");
  const style = styles({});
  return (
    <View style={style.card}>
      <View style={style.cardHeader}>
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
          <View>
            <Text style={style.cardBookText}>{post?.book?.bookName}</Text>
            <Text style={style.cardBookAuthor}>
              {post?.book?.bookId?.authors.map((i: any) => i.name).join(" & ")}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: post?.user?.image }}
              style={style.cardUserAvatar}
            />
          </View>
        </View>
      </View>
      <View style={style.cardContent}>
        <Text style={style.cardContentText}>{post.content}</Text>
      </View>
      <View style={style.cardFooter}>
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
        <Text style={style.cardFooterDate}>{formatDate(post.createdAt)}</Text>
      </View>
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
    </View>
  );
};

export default Post;
