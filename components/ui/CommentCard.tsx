import React from "react";
import { View } from "../Themed";
import UIText from "./UIText";
import { Image, StyleSheet, Text } from "react-native";
import { formatDate } from "@/lib/formatDate";

type Props = { comment: any };

const CommentCard = ({ comment }: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Image
            source={{ uri: comment?.user?.image }}
            style={styles.authorImage}
          />
          <View style={{ backgroundColor: "#fff" }}>
            <Text style={styles.author}>
              {comment?.user?.firstName + " " + comment?.user?.lastName}
            </Text>
          </View>
        </View>
        <View style={styles.date}>
          <Text>{formatDate(comment.createdAt)}</Text>
        </View>
      </View>
      <Text style={styles.content}>{comment.content}</Text>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    minHeight: 100,
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    borderBlockColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  headerInfo: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    backgroundColor: "#fff",
  },
  author: {
    backgroundColor: "#fff",
    fontSize: 14,
    marginLeft: 8,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: "100%",
    backgroundColor: "#fff",
  },

  content: {
    backgroundColor: "#fff",
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
