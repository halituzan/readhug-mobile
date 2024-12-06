import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  CreateBookFromList,
  CreateBookFromThirdParty,
  GetThirdPartyBookSearch,
} from "@/services/book/bookSearch";
import { debounce } from "lodash";
import { BookmarkPlus, Search } from "lucide-react-native";
import RHButton from "@/components/ui/RHButton";
import RHInput from "@/components/ui/RHInput";
import { RefreshControl } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import LoaderSpin from "@/components/ui/Icons/AnimatedIcons/LoaderSpin";
import { useTheme } from "@/hooks/useTheme";
type Props = {};

const CreateBookSheet = (props: Props) => {
  const { themeModeColor } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  console.log("searchResults", searchResults);

  const [selectedBooks, setSelectedBooks] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchResults = async (query: any) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const data = await GetThirdPartyBookSearch(query);
      setSearchResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  //! Callbacks

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchSearchResults(query);
    }, 500), // 500ms gecikme
    []
  );
  //! Callbacks

  useEffect(() => {
    // Component unmount olduğunda debounce'u temizle
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (value: any) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };
  const handleBookSelect = (book: any) => {
    if (!selectedBooks.some((b: any) => b?.name === book?.name)) {
      setSelectedBooks([...selectedBooks, { ...book, type: "0" }]);
    }
    setSearchQuery("");
    setShowDropdown(false);
  };
  const handleStatusChange = (bookName: any, status: any) => {
    const updatedBooks: any = selectedBooks.map((book: any) =>
      book?.name === bookName ? { ...book, type: status } : book
    );
    setSelectedBooks(updatedBooks);
  };
  const handleReadCountChange = (bookName: any, readCount: any) => {
    const updatedBooks: any = selectedBooks.map((book: any) =>
      book?.name === bookName ? { ...book, readCount } : book
    );
    setSelectedBooks(updatedBooks);
  };
  const removeBook = (bookName: any) => {
    setSelectedBooks(
      selectedBooks.filter((book: any) => book.name !== bookName)
    );
  };
  const handleSave = async () => {
    // onSave(selectedBooks);
    setLoadingData(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      for (const book of selectedBooks) {
        if (book._id) {
          await CreateBookFromList(book._id, book.type);
        } else {
          await CreateBookFromThirdParty({ book });
        }
      }
      setLoadingData(false);
      setSelectedBooks([]);
    } catch (error: any) {
      setLoadingData(false);

      console.log("error", error);
    }
  };
  return (
    <View style={{ flex: 1, width: "100%" }}>
      {loadingData && <ActivityIndicator />}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          paddingBottom: 8,
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ paddingHorizontal: 8 }}>Kitap Ara</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ marginRight: 8 }}>Kitap Ekleme Talebi Oluştur.</Text>
          <View
            style={{
              height: 30,
              width: 30,
            }}
          >
            <RHButton
              text={<BookmarkPlus size={16} color='white' />}
              onPress={() => {}}
              height={30}
              width={30}
            />
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 8, paddingHorizontal: 8 }}>
        <View style={{ width: "100%", position: "relative" }}>
          <View style={{ height: 50 }}>
            <RHInput
              value={searchQuery}
              setValue={handleSearch}
              placeholder='Kitap Ara'
            />
          </View>
          {loading ? (
            <View style={{ position: "absolute", right: 2, top: 6 }}>
              <LoaderSpin />
            </View>
          ) : (
            <View
              style={{
                width: 42,
                height: 42,
                position: "absolute",
                right: 4,
                top: 4,
              }}
            >
              <RHButton
                text={<Search color='white' />}
                onPress={() => {}}
                width={42}
                height={42}
                buttonStyles={{ padding: 6 }}
              />
            </View>
          )}
        </View>
        <View style={{ position: "relative" }}>
          {showDropdown && searchResults?.length > 0 && (
            <View style={{ position: "absolute", flex: 1 }}>
              {
                <FlatList
                  data={searchResults}
                  refreshing
                  refreshControl={
                    <RefreshControl
                      tintColor={Colors.colors.primary}
                      refreshing={isLoading}
                      //   onRefresh={fetchPosts}
                    />
                  }
                  contentContainerStyle={{
                    paddingBottom: 80,
                    paddingTop: 20,
                  }}
                  keyExtractor={(item: any, index: number) =>
                    item?.gId + index + Math.floor(Math.random() * 9999999)
                  }
                  renderItem={({ item }: any) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: themeModeColor(800),
                        marginBottom: 8,
                        borderRadius: 8,
                      }}
                    >
                      <Image
                        style={{ width: 75, height: 90, marginBottom: 10 }}
                        source={
                          item?.images?.thumbnail
                            ? { uri: item?.images?.thumbnail }
                            : require("@/assets/placeholder/books/book-placeholder.png")
                        }
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text>{item.name}</Text>
                        <Text>
                          {item._id
                            ? item.authors
                                .map((i: any) => i.name)
                                .join(" & ") || ""
                            : item.authors.join(" & ")}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              }
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateBookSheet;

const styles = StyleSheet.create({});
