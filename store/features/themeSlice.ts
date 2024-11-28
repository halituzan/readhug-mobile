import LocalStorage from "@/connections/LocalStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
  language: "en" | "tr";
  isWelcomeScreen: boolean;
}

const initialState: ThemeState = {
  mode: "light",
  language: "en",
  isWelcomeScreen: true,
};

// AsyncStorage'a verileri kaydetme
const saveThemeToStorage = async (theme: ThemeState) => {
  await LocalStorage.set("theme", JSON.stringify(theme));
};

// Theme Slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
      saveThemeToStorage(state); // AsyncStorage'a güncel temayı kaydet
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      saveThemeToStorage(state); // AsyncStorage'a güncel temayı kaydet
    },
    setLanguage: (state, action: PayloadAction<"en" | "tr">) => {
      state.language = action.payload;
      saveThemeToStorage(state); // AsyncStorage'a güncel temayı kaydet
    },
    loadThemeFromStorage: (state, action: PayloadAction<ThemeState>) => {
      state.mode = action.payload.mode;
      state.language = action.payload.language;
    },
    setWelcomeScreen: (state, action: PayloadAction<boolean>) => {
      state.isWelcomeScreen = action.payload;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setLanguage,
  loadThemeFromStorage,
  setWelcomeScreen,
} = themeSlice.actions;
export const selectTheme = (state: any) => state.theme;
export const selectWelcomeScreen = (state: any) => state.theme.isWelcomeScreen;

export default themeSlice.reducer;
