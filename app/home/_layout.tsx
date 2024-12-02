import { View } from "@/components/Themed";
import BookIcon from "@/components/ui/Icons/BookIcon";
import NotificationIcon from "@/components/ui/Icons/NotificationIcon";
import Settings from "@/components/ui/Icons/Settings";
import TimeLine from "@/components/ui/Icons/TimeLine";
import Colors from "@/constants/Colors";
import { GlobalStyles } from "@/constants/Theme";
import { useTheme } from "@/hooks/useTheme";
import { selectUser } from "@/store/features/userSlice";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

export default function TabLayout(props: any) {
  const { theme } = useTheme();
  const user = useSelector(selectUser);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          tabStyles,
          {
            backgroundColor: Colors[theme.mode][900],
            // shadowColor: Colors[theme.mode].contrastText,
            // shadowOffset: { width: 0, height: 0 } as ViewStyle,
            // shadowOpacity: 0.1,
            // shadowRadius: 4,
          } as ViewStyle,
        ],
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Timeline",
          tabBarShowLabel: false,
          tabBarItemStyle: {
            marginBottom: Platform.OS === "android" ? 30 : 0,
          },
          tabBarIcon: ({ focused }) => (
            <TimeLine
              width={32}
              height={32}
              color={focused ? Colors.colors.primary : Colors.colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='books'
        options={{
          title: "Books",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <BookIcon
              width={32}
              height={32}
              color={focused ? Colors.colors.primary : Colors.colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarButton: ({ onPress, focused }: any) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                position: "relative",
              }}
            >
              <ProfileBarButton onPress={onPress} Colors={Colors} theme={theme}>
                <Image
                  source={
                    user.image
                      ? { uri: user.image }
                      : require("../../assets/placeholder/books/book1.jpg")
                  }
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    objectFit: "cover",
                    position: "absolute",
                  }}
                />
              </ProfileBarButton>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          title: "Notifications",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <NotificationIcon
              width={32}
              height={32}
              color={focused ? Colors.colors.primary : Colors.colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Settings
              width={32}
              height={32}
              color={focused ? Colors.colors.primary : Colors.colors.secondary}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const ProfileBarButton = ({ children, onPress, tab, Colors, theme }: any) => (
  <Pressable
    onPress={onPress}
    style={{
      top: Platform.OS == "ios" ? -8 : -22,
      left: "auto",
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: 64,
      backgroundColor: Colors?.colors.primary,
      borderRadius: 100,
      // shadowColor: "#fff",
      // shadowOffset: { width: 0, height: 0 },
      // shadowOpacity: 0.5,
      // shadowRadius: 3,
    }}
  >
    {children}
  </Pressable>
);

const tabStyles = {
  // ...GlobalStyles.Shadow,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: 20,
  borderWidth: 0,
  borderColor: "transparent",
  padding: 0,
  marginHorizontal: 15,
  position: "absolute",
  bottom: Platform.OS == "ios" ? 40 : 30,
  zIndex: 10,
  elevation: 5,
  flex: 1,
  height: 50,
} as ViewStyle;
