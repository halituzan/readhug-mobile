import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { GetUserBooks } from "@/services/book/getUserBooks";
import { selectUser } from "@/store/features/userSlice";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "./BookItem";
import { selectReading, setLibrary } from "@/store/features/librarySlice";

type Props = {
  setCount: any;
  count: any;
};

const ReadingBooks = ({ setCount, count }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const readingData = useSelector(selectReading);
  const { profileStyle } = useStyles();
  const style = profileStyle({});

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getReadBooks = async () => {
    if (!hasMore) return;
    try {
      setLoading(true);
      const response = await GetUserBooks(page, user.userName, "1");
      const payload = {
        ...response,
        data: [...readingData.data, ...response.data],
      };
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        dispatch(setLibrary({ key: "reading", data: payload }));
        setPage(page);
      }
      setLoading(false);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReadBooks();
  }, []);
  useEffect(() => {
    setData(readingData?.data ?? []);
  }, [readingData]);

  const handLoadMore = async () => {
    if (!loading && hasMore) {
      await getReadBooks();
      setPage((prev) => prev + 1);
    }
  };

  return (
    <View style={style.bookContainer}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({ item }) => (
          <BookItem item={item} type='reading' mount={getReadBooks} />
        )}
        onEndReached={handLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && hasMore ? (
            <ActivityIndicator size='large' color={Colors.colors.primary} />
          ) : null
        }
        contentContainerStyle={{
          paddingBottom: 300,
        }}
      />
    </View>
  );
};

export default ReadingBooks;
