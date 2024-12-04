import { useStyles } from "@/hooks/useStyles";
import { GetUserBooks } from "@/services/book/getUserBooks";
import { selectUser } from "@/store/features/userSlice";
import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "./BookItem";
import Colors from "@/constants/Colors";
import { selectRead, setLibrary } from "@/store/features/librarySlice";

type Props = {};

const ReadBooks = (props: Props) => {
  const dispatch = useDispatch();
  const readData = useSelector(selectRead);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector(selectUser);
  const { profileStyle } = useStyles();
  const style = profileStyle({});

  const getReadBooks = async (page: number) => {
    if (!hasMore || loading) return;
    try {
      setLoading(true);
      const response = await GetUserBooks(page, user.userName, "0");

      const payload = {
        ...response,
        data: [...readData.data, ...response.data],
      };

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        dispatch(setLibrary({ key: "read", data: payload }));
        setPage(page);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReadBooks(1);
  }, []);

  const handLoadMore = () => {
    if (hasMore && !loading) {
      getReadBooks(page + 1);
    }
  };
  useEffect(() => {
    setData(readData.data);
  }, [readData]);

  return (
    <View style={style.bookContainer}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({ item }) => (
          <BookItem item={item} type='read' mount={getReadBooks} />
        )}
        onEndReached={handLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && hasMore ? (
            <ActivityIndicator size='small' color={Colors.colors.primary} />
          ) : null
        }
        contentContainerStyle={{
          paddingBottom: 300,
        }}
      />
    </View>
  );
};

export default ReadBooks;
