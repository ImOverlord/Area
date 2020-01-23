import React from "react";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import AppNavigation from "./src/navigation/navigation";

export default function App() {
  enableScreens();
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AppNavigation />
    </SafeAreaProvider>
  );
}
