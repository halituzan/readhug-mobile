import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import themeSlice from "./features/themeSlice";
import librarySlice from "./features/librarySlice";
import profileLibrarySlice from "./features/profileLibrarySlice";

const Store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
    library: librarySlice,
    profilelibrary: profileLibrarySlice,
  },
});

export default Store;

// RootState ve AppDispatch türlerini oluştur ve ihraç et
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
