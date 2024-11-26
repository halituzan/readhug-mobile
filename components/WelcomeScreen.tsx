import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { changeThemeSlice } from "@/store/features/userSlice";
import Colors from "@/constants/Colors";
import LocalStorage from "@/connections/LocalStorage";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [themeMode, setThemeMode] = useState("light");
    const [language, setLanguage] = useState("en");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleContinue = () => {
        LocalStorage.set("theme", JSON.stringify({ mode: themeMode, language, isWelcomeScreen: true }))
        dispatch(changeThemeSlice({ mode: themeMode, language, isWelcomeScreen: true }));
        router.push("/auth/login")
    };

    const slides = [
        {
            id: "1",
            content: (
                <View style={styles.slide}>
                    <Text style={styles.title}>Welcome to the Book App!</Text>
                    <Text style={styles.subtitle}>Discover, read, and track your favorite books.</Text>
                </View>
            ),
        },
        {
            id: "2",
            content: (
                <View style={styles.slide}>
                    <Text style={styles.title}>Customize Your Experience</Text>
                    <Text style={styles.subtitle}>Select your preferred theme and language.</Text>
                    {/* Theme Selection */}
                    <View style={styles.options}>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                themeMode === "light" ? styles.selected : null,
                            ]}
                            onPress={() => setThemeMode("light")}
                        >
                            <Text style={styles.optionText}>Light Theme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                themeMode === "dark" ? styles.selected : null,
                            ]}
                            onPress={() => setThemeMode("dark")}
                        >
                            <Text style={styles.optionText}>Dark Theme</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Language Selection */}
                    <View style={styles.options}>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                language === "en" ? styles.selected : null,
                            ]}
                            onPress={() => setLanguage("en")}
                        >
                            <Text style={styles.optionText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                language === "tr" ? styles.selected : null,
                            ]}
                            onPress={() => setLanguage("tr")}
                        >
                            <Text style={styles.optionText}>Türkçe</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ),
        },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
                    setCurrentSlide(index);
                }}
                renderItem={({ item }) => item.content}
                keyExtractor={(item) => item.id}
            />
            {/* Pagination Bar */}
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            currentSlide === index ? styles.paginationDotActive : null,
                        ]}
                    />
                ))}
            </View>
            {currentSlide === slides.length - 1 ? (
                <View >
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            ) : <View style={styles.hideContinueButton}>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",

    },
    slide: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.light.tint,
        textAlign: "center",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: "#aaa",
        textAlign: "center",
    },
    options: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    optionButton: {
        backgroundColor: "#1f242b",
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    optionText: {
        color: "#fff",
    },
    selected: {
        backgroundColor: Colors.light.tint,
    },
    continueButton: {
        backgroundColor: Colors.light.tint,
        padding: 15,
        borderRadius: 8,
        alignSelf: "center",
        marginBottom: 20,
        width: "90%"
    },
    hideContinueButton: {
        backgroundColor: "transparent",
        padding: 15,
        borderRadius: 8,
        alignSelf: "center",
        marginBottom: 20,
        width: "90%",
        height: 50
    },
    continueText: {
        color: "#25292e",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#444",
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: Colors.light.tint,
        width: 12,
        height: 12,
    },
});
