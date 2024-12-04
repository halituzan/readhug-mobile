import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/hooks/useTheme";
import {
  BookMarked,
  BookOpen,
  BookPlus,
  MessageCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import ReadBooks from "./ReadBooks";
import ReadingBooks from "./ReadingBooks";
import WhisList from "./WishList";
import { useSelector } from "react-redux";
import {
  selectPosts,
  selectRead,
  selectReading,
  selectWishlist,
} from "@/store/features/librarySlice";

type Props = {};

const routes = [
  { key: "reading", title: "Okunuyor" },
  { key: "read", title: "Okunan" },
  { key: "wishlist", title: "İstek Listesi" },
  { key: "posts", title: "Gönderiler" },
];
const LibraryTabs = (props: Props) => {
  const reading = useSelector(selectReading);
  const read = useSelector(selectRead);
  const wishlist = useSelector(selectWishlist);
  const posts = useSelector(selectPosts);
  const { themeModeColor } = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { profileStyle } = useStyles();

  const style = profileStyle({});

  const renderScene = SceneMap({
    reading: ReadingBooks,
    read: ReadBooks,
    wishlist: WhisList,
    posts: ReadBooks,
  });
  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i);

    return (
      <View style={style.libraryTabBar}>
        {props.navigationState.routes.map((route: any, i: any) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const isActive = i === index;
          return (
            <TouchableOpacity
              key={i}
              style={profileStyle({ isOk: isActive }).libraryTabItemProvider}
              onPress={() => setIndex(i)}
            >
              <View style={{ marginBottom: 2 }}>
                {route.key === "reading" && (
                  <View style={style.libraryTabsProvider}>
                    <BookOpen
                      size={16}
                      color={
                        isActive ? Colors.colors.primary : themeModeColor(50)
                      }
                    />
                    <Text
                      style={
                        profileStyle({ isOk: isActive }).libraryTabItemText
                      }
                    >
                      {reading.total}
                    </Text>
                  </View>
                )}
                {route.key === "read" && (
                  <View style={style.libraryTabsProvider}>
                    <BookMarked
                      size={16}
                      color={
                        isActive ? Colors.colors.primary : themeModeColor(50)
                      }
                    />
                    <Text
                      style={
                        profileStyle({ isOk: isActive }).libraryTabItemText
                      }
                    >
                      {read.total}
                    </Text>
                  </View>
                )}
                {route.key === "wishlist" && (
                  <View style={style.libraryTabsProvider}>
                    <BookPlus
                      size={16}
                      color={
                        isActive ? Colors.colors.primary : themeModeColor(50)
                      }
                    />
                    <Text
                      style={
                        profileStyle({ isOk: isActive }).libraryTabItemText
                      }
                    >
                      {wishlist.total}
                    </Text>
                  </View>
                )}
                {route.key === "posts" && (
                  <View style={style.libraryTabsProvider}>
                    <MessageCircle
                      size={16}
                      color={
                        isActive ? Colors.colors.primary : themeModeColor(50)
                      }
                    />
                    <Text
                      style={
                        profileStyle({ isOk: isActive }).libraryTabItemText
                      }
                    >
                      {posts.total}
                    </Text>
                  </View>
                )}
              </View>
              <Animated.Text
                style={
                  profileStyle({ isOk: isActive, opacity, fontSize: 11 })
                    .libraryTabItemAnimatedText
                }
              >
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={style.libraryTabView}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default LibraryTabs;
