import LoaderSpin from "@/components/ui/Icons/AnimatedIcons/LoaderSpin";
import PickerComponent from "@/components/ui/Picker";
import RHButton from "@/components/ui/RHButton";
import RHInput from "@/components/ui/RHInput";
import SliderComponent from "@/components/ui/Slider";
import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import {
  CreateBookFromList,
  CreateBookFromThirdParty,
  GetThirdPartyBookSearch,
} from "@/services/book/bookSearch";
import { GetUserBooks } from "@/services/book/getUserBooks";
import { setLibrary } from "@/store/features/librarySlice";
import { selectUser } from "@/store/features/userSlice";
import { debounce } from "lodash";
import { BadgeMinus, BookmarkPlus, Save, Search } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
type Props = {};

const CreateBookSheet = (props: Props) => {
  const { themeModeColor } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [selectedBooks, setSelectedBooks] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"0" | "1" | "2">("0");

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
    setLoadingData(true);
    try {
      for (const book of selectedBooks) {
        if (book._id) {
          await CreateBookFromList(book._id, book.type);
        } else {
          await CreateBookFromThirdParty({
            ...book,
            type,
          });
        }
      }
      setLoadingData(false);
      setSelectedBooks([]);
      await mountData(type as any);
    } catch (error: any) {
      setLoadingData(false);

      console.log("error", error);
    }
  };

  const mountData = async (type: "0" | "1" | "2") => {
    const data = await GetUserBooks(1, user.userName, type);
    console.log(data);
    // 0-okundu
    // 1-okunuyor
    // 2-istek listesi

    const key = type === "0" ? "read" : type === "1" ? "reading" : "wishlist";

    dispatch(setLibrary({ key, data }));
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
          paddingVertical: 10,
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ paddingHorizontal: 8, color: themeModeColor(200) }}>
          Kitap Ara
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ marginRight: 8, color: themeModeColor(200) }}>
            Kitap Ekleme Talebi Oluştur.
          </Text>
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
        {selectedBooks.length == 0 && (
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
        )}

        <View style={{ position: "relative", flex: 1 }}>
          {showDropdown && searchResults?.length > 0 && (
            <View style={{ position: "absolute", zIndex: 30 }}>
              <FlatList
                data={searchResults.slice(0, 5)}
                refreshing
                refreshControl={
                  <RefreshControl
                    tintColor={Colors.colors.primary}
                    refreshing={isLoading}
                    //   onRefresh={fetchPosts}
                  />
                }
                contentContainerStyle={{
                  paddingTop: 10,
                  maxHeight: Dimensions.get("window").height - 300,
                  backgroundColor: themeModeColor(700),
                }}
                keyExtractor={(item: any, index: number) =>
                  item?.gId + index + Math.floor(Math.random() * 9999999)
                }
                renderItem={({ item }: any) => (
                  <Pressable
                    onPress={() => handleBookSelect(item)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: themeModeColor(800),
                      marginBottom: 8,
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      style={{ width: 75, height: 100, borderRadius: 8 }}
                      source={
                        item?.images?.thumbnail
                          ? { uri: item?.images?.thumbnail }
                          : require("@/assets/placeholder/books/book-placeholder.png")
                      }
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          flexWrap: "wrap",
                          paddingRight: 80,
                          color: themeModeColor(100),
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          flexWrap: "wrap",
                          color: themeModeColor(400),
                        }}
                      >
                        {item._id
                          ? item.authors.map((i: any) => i.name).join(" & ") ||
                            ""
                          : item.authors.join(" & ")}
                      </Text>
                      <Text
                        style={{
                          flexWrap: "wrap",
                          color: themeModeColor(400),
                        }}
                      >
                        {item.pageCount} Sayfa
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          )}
        </View>
        <View>
          {selectedBooks.length > 0 && (
            <View>
              <View>
                <FlatList
                  data={selectedBooks}
                  refreshing
                  refreshControl={
                    <RefreshControl
                      tintColor={Colors.colors.primary}
                      refreshing={isLoading}
                      //   onRefresh={fetchPosts}
                    />
                  }
                  contentContainerStyle={{}}
                  keyExtractor={(item: any, index: number) =>
                    item?.gId + index + Math.floor(Math.random() * 9999999)
                  }
                  renderItem={({ item }: any) => (
                    <View
                      style={{
                        backgroundColor: themeModeColor(800),
                        marginBottom: 8,
                        borderRadius: 8,
                        position: "relative",
                        padding: 8,
                      }}
                    >
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          position: "absolute",
                          right: 4,
                          top: 4,
                        }}
                      >
                        <RHButton
                          width={20}
                          height={20}
                          buttonStyles={{ padding: 3 }}
                          onPress={() => removeBook(item.name)}
                          text={<BadgeMinus color={"white"} />}
                        />
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={{ width: 75, height: 90, marginBottom: 10 }}
                          source={
                            item?.images?.thumbnail
                              ? { uri: item?.images?.thumbnail }
                              : require("@/assets/placeholder/books/book-placeholder.png")
                          }
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              color: themeModeColor(50),
                              flex: 1,
                              flexWrap: "wrap",
                              flexDirection: "row",
                              paddingRight: 90,
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text style={{ color: themeModeColor(400) }}>
                            Yazar:
                            {!item.gId
                              ? item.authors
                                  .map((i: any) => i.name)
                                  ?.join(" & ") || ""
                              : item.authors?.join(" & ")}
                          </Text>
                          <View style={{ width: 250, flex: 1 }}>
                            <PickerComponent
                              value={type}
                              setValue={setType}
                              items={[
                                { value: "0", label: "Okundu" },
                                { value: "1", label: "Okunuyor" },
                                { value: "2", label: "İstek Listesi" },
                              ]}
                            />
                          </View>
                        </View>
                      </View>
                      {type === "1" && (
                        <View
                          style={{
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <SliderComponent
                            pageCount={item.pageCount}
                            bookId={item.gId}
                            bookName={item.name}
                            readCount={item.readCount ?? 0}
                            width={Dimensions.get("window").width - 30}
                            isSave={false}
                            handleReadCountChange={handleReadCountChange}
                          />
                        </View>
                      )}
                    </View>
                  )}
                />
                <View
                  style={{
                    height: 40,
                  }}
                >
                  <RHButton
                    text={
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Save color='white' size={20} />
                        <Text
                          style={{
                            color: "white",
                            fontSize: 18,
                            marginLeft: 8,
                          }}
                        >
                          Kaydet
                        </Text>
                      </View>
                    }
                    onPress={handleSave}
                    width={40}
                    height={40}
                    buttonStyles={{ padding: 6 }}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CreateBookSheet;

const styles = StyleSheet.create({});
