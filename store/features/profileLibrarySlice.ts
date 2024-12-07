import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface InitialProps {
  reading: Object;
  read: Object;
  wishlist: Object;
  posts: Object;
  userName: string;
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
  userName: "",
};

const reducers = {
  setProfileLibrary: (
    state: any,
    actions: PayloadAction<{ key: string; data: any }>
  ) => {
    state[actions.payload.key] = actions.payload.data;
  },
  clearProfileLibrary: (state: any) => {
    state.reading = { total: 0, data: [] };
    state.read = { total: 0, data: [] };
    state.wishlist = { total: 0, data: [] };
    state.posts = { total: 0, data: [] };
    state.userName = "";
  },
  setUserName: (state: any, actions: PayloadAction<string>) => {
    state.userName = actions.payload;
  },
};
const slice = createSlice({
  name: "profilelibrary",
  initialState,
  reducers,
});
export const selectProfileReading = (state: any) =>
  state.profilelibrary.reading;
export const selectProfileRead = (state: any) => state.profilelibrary.read;
export const selectProfileWishlist = (state: any) =>
  state.profilelibrary.wishlist;
export const selectProfilePosts = (state: any) => state.profilelibrary.posts;
export const selectProfileUserName = (state: any) =>
  state.profilelibrary.userName;

export const { setProfileLibrary, setUserName, clearProfileLibrary } =
  slice.actions;

export default slice.reducer;
