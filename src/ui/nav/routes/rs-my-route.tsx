import {
  // StackNavigator,
  createStackNavigator
} from 'react-navigation';
import { AddRouteScreen, MyRouteScreen } from '@src/ui/my-route';
import * as NS from '@src/ui/nav/constant';

export const MyRouteNavigator = createStackNavigator(
  {
    [NS.ROUTE_MY_ROUTE]: {
      screen: MyRouteScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: true,
      },
    },
    [NS.ROUTE_ADD_ROUTE]: {
      screen: AddRouteScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: true,
      },
    },
  },
  {
    initialRouteName: NS.ROUTE_MY_ROUTE,
    navigationOptions: {
      gesturesEnabled: false,
    },
    headerMode: 'none',
    cardStyle: { shadowColor: 'transparent' },
  }
);
