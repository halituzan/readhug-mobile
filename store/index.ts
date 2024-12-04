import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import themeSlice from "./features/themeSlice";
import librarySlice from "./features/librarySlice";

const Store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
    library: librarySlice,
  },
});

export default Store;

// RootState ve AppDispatch türlerini oluştur ve ihraç et
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
