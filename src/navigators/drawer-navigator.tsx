import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/drawer/home';
import Search from '../screens/drawer/search';
import Settings from '../screens/drawer/settings';
import Training from '../screens/drawer/training';
import Favourites from '../screens/drawer/favourites';
import Subscription from '../screens/drawer/subscription';

const Stack = createNativeStackNavigator();

const DrawerNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{animation: 'none', headerShown: false}}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Training" component={Training} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="Subscription" component={Subscription} />
    </Stack.Navigator>
  );
};

export default DrawerNavigator;
