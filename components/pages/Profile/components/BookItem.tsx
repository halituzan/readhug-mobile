import { formatDate } from "@/lib/formatDate";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BookItem = ({ item }: any) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onLongPress={() => {
      console.log("first");
    }}
  >
    <Image
      source={
        item?.bookId?.images?.thumbnail
          ? { uri: item?.bookId?.images?.thumbnail }
          : require("@/assets/placeholder/books/book-placeholder.png")
      }
      style={styles.image}
    />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item?.bookName}</Text>
      <Text style={styles.author}>
        {item?.bookId?.authors.map((i: any) => i.name).join(" & ")}
      </Text>
      <View>
        {/* <Slider */}
      </View>
      <Text style={styles.addedDate}>
        Added: {formatDate(item?.bookId?.createdAt)}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginVertical: 8,
    marginHorizontal: 8,
    overflow: "hidden",
    flexDirection: "row",
  },
  image: {
    width: 55,
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    padding: 12,
    flex:1
  },
  title: {
    fontSize: 16,
    paddingRight: 4,
    flexWrap: "wrap",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    paddingRight: 4,
    flexWrap: "wrap",
  },
  addedDate: {
    fontSize: 12,
    color: "#999",
  },
});

export default BookItem;
