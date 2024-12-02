import Post from "@/components/ui/PostCard";
import { useStyles } from "@/hooks/useStyles";
import { GetAllBooks } from "@/services/book/getAllBook";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function Index() {
  const { pageStyle } = useStyles();
  const style = pageStyle({});
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
    <SafeAreaView style={style.safeArea}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 80 }} // Tab bar yüksekliğine göre padding
        data={posts}
        keyExtractor={(item: any) =>
          item?._id + Math.floor(Math.random() * 9999999)
        }
        renderItem={({ item }: any) => <Post post={item} />}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

