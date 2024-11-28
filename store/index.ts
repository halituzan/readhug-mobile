import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import themeSlice from "./features/themeSlice";

const Store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
  },
});

export default Store;

// RootState ve AppDispatch türlerini oluştur ve ihraç et
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
