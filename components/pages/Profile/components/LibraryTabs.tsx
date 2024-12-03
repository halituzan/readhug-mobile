import Colors from "@/constants/Colors";
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

type Props = {};

const routes = [
  { key: "reading", title: "Okunuyor" },
  { key: "read", title: "Okunan" },
  { key: "wishlist", title: "İstek Listesi" },
  { key: "posts", title: "Gönderiler" },
];
const LibraryTabs = (props: Props) => {
  const { themeModeColor } = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderScene = SceneMap({
    reading: ReadBooks,
    read: ReadBooks,
    wishlist: ReadBooks,
    posts: ReadBooks,
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <BookOpen
                      size={16}
                      color={
                        isActive ? Colors.colors.primary : themeModeColor(50)
                      }
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        color: isActive
                          ? Colors.colors.primary
                          : themeModeColor(50),
                      }}
                    >
                      127
                    </Text>
                  </View>
                )}
                {route.key === "read" && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <BookMarked
                      size={16}
                      color={
                        isActive ? Colors.colors.primary : themeModeColor(50)
                      }
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        color: isActive
                          ? Colors.colors.primary
                          : themeModeColor(50),
                      }}
                    >
                      25
                    </Text>
                  </View>
                )}
                {route.key === "wishlist" && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <BookPlus
                      size={16}
                      color={
                        isActive ? Colors.colors.primary : themeModeColor(50)
                      }
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        color: isActive
                          ? Colors.colors.primary
                          : themeModeColor(50),
                      }}
                    >
                      39
                    </Text>
                  </View>
                )}
                {route.key === "posts" && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MessageCircle
                      size={16}
                      color={
                        isActive ? Colors.colors.primary : themeModeColor(50)
                      }
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        color: isActive
                          ? Colors.colors.primary
                          : themeModeColor(50),
                      }}
                    >
                      10258
                    </Text>
                  </View>
                )}
              </View>
              <Animated.Text
                style={{
                  opacity,
                  color: isActive ? Colors.colors.primary : themeModeColor(50),
                  fontSize: 11,
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
