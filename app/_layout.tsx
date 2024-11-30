//app/_layout.tsx
import AppNavigation from "@/navigations/AppNavigation";
import Store from "@/store";
import {
  StyleSheet
} from "react-native";
import { Provider } from "react-redux";
import "../global.css";
export default function RootLayout() {
  return (
    <Provider store={Store}>
      <AppNavigation />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    marginBottom: 8,
  },
});
