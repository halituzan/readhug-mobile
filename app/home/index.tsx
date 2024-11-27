import Post from "@/components/ui/PostCard";
import { GetAllBooks } from "@/services/book/getAllBook";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css"
export default function Index() {
  const [posts, setPosts] = useState<any>([

  ]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const fetchMorePosts = async () => {
    const newPosts = await GetAllBooks(page);

    setPosts((prevPosts: any) => [...prevPosts, ...newPosts.data]);
    if (newPosts.data.length > 0) {
      setPage((prev) => prev + 1)
    }

  };
  useEffect(() => {
    fetchMorePosts();
  }, []);
  return (
    <SafeAreaView style={styles.container} className="bg-red-400">
      <FlatList
        style={{ paddingVertical: 30 }}
        data={posts}
        keyExtractor={(item: any) => item?.id}
        renderItem={({ item }: any) => <Post post={item} />}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
      // ListFooterComponent={isLoading && <View style={styles.loadingIndicator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25292e",
  },
  loadingIndicator: {
    padding: 16,
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});

const generateRandomPosts = (count: number) => {
  const bookTitles = [
    "The Alchemist",
    "To Kill a Mockingbird",
    "1984",
    "The Great Gatsby",
    "Pride and Prejudice",
    "Harry Potter and the Sorcerer's Stone",
    "The Kite Runner",
    "Gone with the Wind",
    "The Catcher in the Rye",
    "The Lord of the Rings",
  ];

  const authors = [
    "Paulo Coelho",
    "Harper Lee",
    "George Orwell",
    "F. Scott Fitzgerald",
    "Jane Austen",
    "J.K. Rowling",
    "Khaled Hosseini",
    "Margaret Mitchell",
    "J.D. Salinger",
    "J.R.R. Tolkien",
  ];

  const posts = [];

  for (let i = 0; i < count; i++) {
    const randomBookIndex = Math.floor(Math.random() * bookTitles.length);
    const randomAuthorIndex = Math.floor(Math.random() * authors.length);

    posts.push({
      id: `post-${Math.floor(Math.random() * 9999999)}-${i}`,
      bookTitle: bookTitles[randomBookIndex],
      author: authors[randomAuthorIndex],
      content:
        "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      timestamp: new Date().toLocaleString(),
    });
  }

  return posts;
};
