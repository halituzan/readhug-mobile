import { useTheme } from "@/hooks/useTheme";
import { GetUserBooks } from "@/services/book/getUserBooks";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BookItem from "./BookItem";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";

type Props = {};

const WhisList = (props: Props) => {
  const { themeModeColor } = useTheme();
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState(0);
  const user = useSelector(selectUser);
  const getReadBooks = async () => {
    try {
      const data = await GetUserBooks(page, user.userName, "2");
      console.log("data", data);
      setData(data);
    } catch (error) {}
  };
  useEffect(() => {
    getReadBooks();
  }, []);

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
        data={data.data}
        keyExtractor={(item) => item._id.toString()}
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

export default WhisList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },
});
