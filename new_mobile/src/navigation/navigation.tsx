import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Welcome from "../screens/Auth/Welcome";
import Email from "../screens/Auth/Email";
import Password from "../screens/Auth/Password";
import Home from "../screens/Home";
import AppLoading from "../screens/AppLoading";
const AuthStack = createStackNavigator(
  {
    Welcome,
    Email,
    Password
  },
  {
    headerMode: "none"
  }
);

const AppStack = createStackNavigator(
  {
    Home
  },
  {
    headerMode: "none"
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AppLoading,
    AuthStack,
    AppStack
  },
  {}
);

export default createAppContainer(AppNavigator);
