import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { GetUserBooks } from "@/services/book/getUserBooks";
import {
  selectProfileUserName,
  selectProfileWishlist,
  setProfileLibrary,
} from "@/store/features/profileLibrarySlice";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookItem from "./BookItem";

type Props = {};

const WhisList = ({}: Props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectProfileUserName);
  const wishlistData = useSelector(selectProfileWishlist);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { profileStyle } = useStyles();
  const style = profileStyle({});

  const getWishListBooks = async (page: number, userName: string) => {
    if (!hasMore || loading) return;
    try {
      setLoading(true);
      const response = await GetUserBooks(page, userName, "2");

      if (response?.data?.length === 0) {
        setHasMore(false);
      } else {
        dispatch(setProfileLibrary({ key: "wishlist", data: response }));
        setPage(page);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userName) {
      getWishListBooks(1, userName);
    }
  }, [userName]);

  const handLoadMore = () => {
    if (hasMore && !loading) {
      // getWishListBooks(page + 1, userName);
      // setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    setData(wishlistData?.data ?? []);
  }, [wishlistData]);

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
