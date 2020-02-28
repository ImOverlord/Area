import React, { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Provider } from "mobx-react";
import AppNavigation from "./src/navigation/navigation";
import store from "./src/store";
import * as Font from "expo-font";
import { AppLoading } from "expo";

export default function App() {
  enableScreens();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fontLoading() {
      await Font.loadAsync({
        "Avenir Next": require("./assets/font/AvenirNext-Regular.ttf")
      });
    }
    fontLoading().then(() => setLoading(false));
  }, []);
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        {loading ? <AppLoading /> : <AppNavigation />}
      </SafeAreaProvider>
    </Provider>
  );
}
