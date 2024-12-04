//app/_layout.tsx
import AppNavigation from "@/navigations/AppNavigation";
import Store from "@/store";
import { Provider } from "react-redux";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {
  return (
    <Provider store={Store}>
      <GestureHandlerRootView>
        <AppNavigation />
      </GestureHandlerRootView>
    </Provider>
  );
}
