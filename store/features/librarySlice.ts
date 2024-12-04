import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface InitialProps {
  reading: Object;
  read: Object;
  wishlist: Object;
  posts: Object;
}
const initialState: InitialProps = {
  reading: {
    total: 0,
    data: [],
  },
  read: {
    total: 0,
    data: [],
  },
  wishlist: {
    total: 0,
    data: [],
  },
  posts: {
    total: 0,
    data: [],
  },
};

const reducers = {
  setLibrary: (
    state: any,
    actions: PayloadAction<{ key: string; data: any }>
  ) => {
    state[actions.payload.key] = actions.payload.data;
  },
};
const slice = createSlice({
  name: "library",
  initialState,
  reducers,
});
export const selectReading = (state: any) => state.library.reading;
export const selectRead = (state: any) => state.library.read;
export const selectWishlist = (state: any) => state.library.wishlist;
export const selectPosts = (state: any) => state.library.posts;

export const { setLibrary } = slice.actions;

export default slice.reducer;
