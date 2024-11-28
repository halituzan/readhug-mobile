import Post from "@/components/ui/PostCard";
import Colors from "@/constants/Colors";
import { GlobalStyles } from "@/constants/Theme";
import { useTheme } from "@/hooks/useTheme";
import { GetAllBooks } from "@/services/book/getAllBook";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function Index() {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState(1);

  const fetchMorePosts = async () => {
    const newPosts = await GetAllBooks(page);
    setPosts((prevPosts: any) => [...prevPosts, ...newPosts.data]);
    if (newPosts.data.length > 0) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchMorePosts();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[theme.mode].background }]}>
      <FlatList
        contentContainerStyle={{ paddingTop: 80 }} // Tab bar yüksekliğine göre padding
        data={posts}
        keyExtractor={(item: any) => item?._id}
        renderItem={({ item }: any) => <Post post={item} />}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
