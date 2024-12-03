import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BookItem = ({ item }: any) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onLongPress={() => {
      console.log("first");
    }}
  >
    <Image source={item.imageUri} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.addedDate}>Added: {item.addedDate}</Text>
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
  },
  title: {
    fontSize: 16,
    flexWrap: "wrap",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  addedDate: {
    fontSize: 12,
    color: "#999",
  },
});

export default BookItem;
