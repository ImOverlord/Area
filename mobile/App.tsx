import React from "react";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Provider } from "mobx-react";
import AppNavigation from "./src/navigation/navigation";
import store from "./src/store";

export default function App() {
  enableScreens();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}
