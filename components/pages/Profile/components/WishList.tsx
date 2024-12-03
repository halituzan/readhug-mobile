import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { GetUserBooks } from "@/services/book/getUserBooks";
import { selectUser } from "@/store/features/userSlice";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import BookItem from "./BookItem";

type Props = {};

const WhisList = (props: Props) => {
  const [data, setData] = useState<any[]>([]); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 
  const user = useSelector(selectUser);
  const { profileStyle } = useStyles();
  const style = profileStyle({});

  const getWishListBooks = async (page: number) => {
    if (!hasMore || loading) return;
    try {
      setLoading(true);
      const response = await GetUserBooks(page, user.userName, "2");
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...response.data]);
        setPage(page);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishListBooks(1);
  }, []);

  const handLoadMore = () => {
    if (hasMore && !loading) {
      getWishListBooks(page + 1);
    }
  };

  return (
    <View style={style.bookContainer}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({ item }) => (
          <BookItem item={item} type='wishlist' mount={getWishListBooks} />
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

export default WhisList;
