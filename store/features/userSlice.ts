import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface InitialProps {
  login: boolean;
  info: Object;
  theme: {
    language: string;
    mode: string;
    isWelcomeScreen: boolean;
  };
}
const initialState: InitialProps = {
  login: false,
  info: {},
  theme: {
    language: "",
    mode: "",
    isWelcomeScreen: false,
  },
};

const reducers = {
  changeUserSlice: (
    state: any,
    actions: PayloadAction<{ state: string; data: any }>
  ) => {
    state[actions.payload.state] = actions.payload.data;
  },
  changeThemeSlice: (state: any, actions: PayloadAction<any>) => {
    state.theme = actions.payload;
  },
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers,
});
export const { changeUserSlice, changeThemeSlice } = slice.actions;
export const selectUserLogin = (state: any) => state.user.login;
export const selectUser = (state: any) => state.user.info;
export const selectTheme = (state: any) => state.user.theme;

export default slice.reducer;
