import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import BookItem from "./BookItem";
import { useTheme } from "@/hooks/useTheme";

type Props = {};

const ReadBooks = (props: Props) => {
  const { themeModeColor } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeModeColor(800),
        },
      ]}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookItem item={item} />}
        // numColumns={1}
        // columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{
          paddingBottom: 300,
        }}
      />
    </View>
  );
};

export default ReadBooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },
});

const data = [
  {
    id: 1,
    title: "Communication System Security",
    author: "Lidong Chen & Guang Gong",
    addedDate: "11/21/2024",
    imageUri: require("../../../../assets/placeholder/books/book1.jpg"),
  },
  {
    id: 2,
    title: "Android Forensics",
    author: "Andrew Hoog",
    addedDate: "11/19/2024",
    imageUri: require("../../../../assets/placeholder/books/book2.jpg"),
  },
  {
    id: 3,
    title: "Gamzelim: YasakIımsin",
    author: "Mujde Aklanoglu",
    addedDate: "11/19/2024",
    imageUri: require("../../../../assets/placeholder/books/book3.jpg"),
  },
  {
    id: 4,
    title: "Communication System Security",
    author: "Lidong Chen & Guang Gong",
    addedDate: "11/21/2024",
    imageUri: require("../../../../assets/placeholder/books/book1.jpg"),
  },
  {
    id: 5,
    title: "Android Forensics",
    author: "Andrew Hoog",
    addedDate: "11/19/2024",
    imageUri: require("../../../../assets/placeholder/books/book2.jpg"),
  },
  {
    id: 6,
    title: "Gamzelim: YasakIımsin",
    author: "Mujde Aklanoglu",
    addedDate: "11/19/2024",
    imageUri: require("../../../../assets/placeholder/books/book3.jpg"),
  },
  {
    id: 7,
    title: "Communication System Security",
    author: "Lidong Chen & Guang Gong",
    addedDate: "11/21/2024",
    imageUri: require("../../../../assets/placeholder/books/book1.jpg"),
  },
  {
    id: 8,
    title: "Android Forensics",
    author: "Andrew Hoog",
    addedDate: "11/19/2024",
    imageUri: require("../../../../assets/placeholder/books/book2.jpg"),
  },
  {
    id: 9,
    title: "Gamzelim: YasakIımsin",
    author: "Mujde Aklanoglu",
    addedDate: "11/19/2024",
    imageUri: require("../../../../assets/placeholder/books/book3.jpg"),
  },
];
