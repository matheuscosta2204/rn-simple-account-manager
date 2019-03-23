import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

import LoginScreen from '../Container/Login/Login';
import NewUserScreen from '../Container/NewUser/NewUser';
import ProfileScreen from '../Container/Profile/Profile';
import AuthScreen from '../Container/Auth/Auth';

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    }
  },
}, {
  initialRouteName: 'Profile',
});

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    }
  },
  NewUser: {
    screen: NewUserScreen,
    navigationOptions: {
      header: null,
    }
  }
}, {
  initialRouteName: 'Login',
});

const AppNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Login: LoginStack,
  Profile: ProfileStack
}, {
  initialRouteName: 'Auth',
});

export default createAppContainer(AppNavigator);