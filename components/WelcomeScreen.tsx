import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { changeThemeSlice } from "@/store/features/userSlice";
import Colors from "@/constants/Colors";
import LocalStorage from "@/connections/LocalStorage";
import { useRouter } from "expo-router";
import {
  setTheme,
  setLanguage as setterLanguage,
  setWelcomeScreen,
} from "@/store/features/themeSlice";
import { useStyles } from "@/hooks/useStyles";
import RHButton from "./ui/RHButton";
import { StepForward } from "lucide-react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const { styles: appStyle } = useStyles();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [themeMode, setThemeMode] = useState("light");
  console.log("themeMode", themeMode);

  const [language, setLanguage] = useState("en");
  const dispatch = useDispatch();
  const style = appStyle({});
  const handleContinue = async () => {
    await LocalStorage.set(
      "theme",
      JSON.stringify({ mode: themeMode, language, isWelcomeScreen: false })
    );
    dispatch(setTheme(themeMode as "light" | "dark"));
    dispatch(setterLanguage(language as "tr" | "en"));
    dispatch(setWelcomeScreen(false));
    router.push("/auth/login");
  };
  const changeTheme = async (mode: "light" | "dark") => {
    dispatch(setTheme(mode));
  };
  const slides = [
    {
      id: "1",
      content: (
        <View style={style.slide}>
          <Image
            source={require("../assets/images/logo.png")}
            style={style.welcomeLogo}
          />
          <Text style={style.slideSubtitle}>
            Discover, read, and track your favorite books.
          </Text>
        </View>
      ),
    },
    {
      id: "2",
      content: (
        <View style={style.slide}>
          <Text style={style.slideTitle}>Customize Your Experience</Text>
          <Text style={style.slideSubtitle}>
            Select your preferred theme and language.
          </Text>
          {/* Theme Selection */}
          <View style={style.options}>
            <TouchableOpacity
              style={[
                style.optionButton,
                appStyle({ isOk: themeMode === "light" }).optionSelected,
              ]}
              onPress={() => {
                changeTheme("light");
                setThemeMode("light");
              }}
            >
              <Text
                style={appStyle({ isOk: themeMode === "light" }).optionText}
              >
                Light Theme
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                style.optionButton,
                appStyle({ isOk: themeMode === "dark" }).optionSelected,
              ]}
              onPress={() => {
                changeTheme("dark");
                setThemeMode("dark");
              }}
            >
              <Text style={appStyle({ isOk: themeMode === "dark" }).optionText}>
                Dark Theme
              </Text>
            </TouchableOpacity>
          </View>
          {/* Language Selection */}
          <View style={style.options}>
            <TouchableOpacity
              style={[
                style.optionButton,
                appStyle({ isOk: language === "en" }).optionSelected,
              ]}
              onPress={() => setLanguage("en")}
            >
              <Text style={style.optionText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                style.optionButton,
                appStyle({ isOk: language === "tr" }).optionSelected,
              ]}
              onPress={() => setLanguage("tr")}
            >
              <Text style={style.optionText}>Türkçe</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
  ];

  return (
    <View style={style.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
          );
          setCurrentSlide(index);
        }}
        renderItem={({ item }) => item.content}
        keyExtractor={(item) => item.id}
      />
      {/* Pagination Bar */}
      <View style={style.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              currentSlide === index
                ? style.paginationDot
                : style.paginationDotActive,
            ]}
          />
        ))}
      </View>
      {currentSlide === slides.length - 1 ? (
        <View style={styles.continueButton}>
          <RHButton
            text='Devam'
            icon={<StepForward color={"white"} />}
            onPress={handleContinue}
          />
        </View>
      ) : (
        <View style={styles.hideContinueButton}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  continueButton: {
    padding: 15,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
    width: "90%",
    height: 75,
  },
  hideContinueButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 45,
    width: "90%",
    height: 50,
  },
});
