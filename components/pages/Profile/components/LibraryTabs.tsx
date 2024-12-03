import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import ReadBooks from "./ReadBooks";
import {
  BookMarked,
  BookOpen,
  BookPlus,
  MessageCircle,
} from "lucide-react-native";

type Props = {};

const routes = [
  { key: "reading", title: "Okunuyor", icon: "📖" },
  { key: "read", title: "Okunan", icon: "✔️" },
  { key: "wishlist", title: "İstek Listesi", icon: "⭐" },
  { key: "posts", title: "Gönderiler", icon: "✏️" },
];
const LibraryTabs = (props: Props) => {
  const { themeModeColor } = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const SecondRoute = () => (
    <View style={[styles.container, { backgroundColor: "#673ab7" }]} />
  );
  const renderScene = SceneMap({
    reading: ReadBooks,
    read: ReadBooks,
    wishlist: ReadBooks,
    posts: SecondRoute,
  });
  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i);

    return (
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: themeModeColor(800),
          },
        ]}
      >
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
              style={[
                styles.tabItem,
                {
                  borderBottomColor: isActive
                    ? Colors.colors.primary
                    : themeModeColor(500),
                  borderBottomWidth: 2,
                //   borderTopColor: isActive
                //     ? Colors.colors.primary
                //     : themeModeColor(500),
                //   borderTopWidth: 2,
                },
              ]}
              onPress={() => setIndex(i)}
            >
              <View style={{ marginBottom: 2 }}>
                {route.key === "reading" && (
                  <BookOpen
                    size={16}
                    color={
                      isActive ? Colors.colors.primary : themeModeColor(50)
                    }
                  />
                )}
                {route.key === "read" && (
                  <BookMarked
                    size={16}
                    color={
                      isActive ? Colors.colors.primary : themeModeColor(50)
                    }
                  />
                )}
                {route.key === "wishlist" && (
                  <BookPlus
                    size={16}
                    color={
                      isActive ? Colors.colors.primary : themeModeColor(50)
                    }
                  />
                )}
                {route.key === "posts" && (
                  <MessageCircle
                    size={16}
                    color={
                      isActive ? Colors.colors.primary : themeModeColor(50)
                    }
                  />
                )}
              </View>
              <Animated.Text
                style={{
                  opacity,
                  color: isActive ? Colors.colors.primary : themeModeColor(50),
                  fontSize: 10,
                }}
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
    <View
      style={{
        flex: 1,
        minHeight: Dimensions.get("window").height,
        paddingBottom: 30,
      }}
    >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "red",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
});
