import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { formatDate } from "@/lib/formatDate";
import { useTheme } from "@/hooks/useTheme";
import Colors from "@/constants/Colors";

type Props = { comment: any };

const CommentCard = ({ comment }: Props) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme.mode][900],
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Image
            source={{ uri: comment?.user?.image }}
            style={styles.authorImage}
          />

          <Text
            style={[
              styles.author,
              {
                color: Colors[theme.mode][50],
              },
            ]}
          >
            {comment?.user?.firstName + " " + comment?.user?.lastName}
          </Text>
        </View>

        <Text
          style={{
            color: Colors[theme.mode][50],
          }}
        >
          {formatDate(comment.createdAt)}
        </Text>
      </View>
      <Text
        style={[
          styles.content,
          {
            color: Colors[theme.mode][50],
          },
        ]}
      >
        {comment.content}
      </Text>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 2,
    width: "100%",
    minHeight: 100,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    borderBlockColor: "gray",
    borderBottomWidth: 1,
    padding: 8,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  date: {},
  author: {
    fontSize: 14,
    marginLeft: 8,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  content: {
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
    paddingVertical: 12,
    flexWrap: "wrap",
    flex: 1,
    flexDirection: "row",
  },
});
