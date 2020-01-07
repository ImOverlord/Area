import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import Welcome from '../screens/Welcome'
import Email from '../screens/Auth/Email'
import Password from '../screens/Auth/Password'
import AppLoading from '../screens/AppLoading'
import Home from "../screens/Home"

const AuthStack = createStackNavigator(
  {
    Welcome,
    Email,
    Password,
  },
  {
    headerMode: 'none',
    gestureEnabled: true,
  }
);

const AppStack = createStackNavigator(
  {
    Home
  },
  {
    headerMode: 'none',
    gestureEnabled: true,
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AppLoading,
    AuthStack,
    AppStack,
  },
  {
    headerMode: 'none',
    animationEnabled: false,
    swipeEnabled: true,
    lazy: true,
  }
);

export default createAppContainer(AppNavigator);