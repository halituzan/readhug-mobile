//app/_layout.tsx
import AppNavigation from "@/navigations/AppNavigation";
import Store from "@/store";
import { Provider } from "react-redux";
export default function RootLayout() {
  return (
    <Provider store={Store}>
      <AppNavigation />
    </Provider>
  );
}
