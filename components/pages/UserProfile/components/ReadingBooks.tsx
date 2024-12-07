import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { GetUserBooks } from "@/services/book/getUserBooks";
import {
  selectProfileReading,
  selectProfileUserName,
  setProfileLibrary,
} from "@/store/features/profileLibrarySlice";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "./BookItem";

type Props = {};

const ReadingBooks = ({}: Props) => {
  const dispatch = useDispatch();
  const readingData = useSelector(selectProfileReading);
  const userName = useSelector(selectProfileUserName);

  const { profileStyle } = useStyles();
  const style = profileStyle({});

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getReadBooks = async (page: number, userName: string) => {
    if (!hasMore) return;
    try {
      setLoading(true);
      const response = await GetUserBooks(page, userName, "1");

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        dispatch(setProfileLibrary({ key: "reading", data: response }));
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
    if (userName) {
      getReadBooks(1, userName);
    }
  }, [userName]);
  useEffect(() => {
    setData(readingData?.data ?? []);
  }, [readingData]);

  const handLoadMore = async () => {
    if (!loading && hasMore) {
      // await getReadBooks(page, userName);
      // setPage((prev) => prev + 1);
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
