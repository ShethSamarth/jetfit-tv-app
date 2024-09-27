import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DrawerNavigator from './drawer-navigator';

import MoreOptions from '../screens/more-options';
import VideoPlayer from '../screens/video-player';
import ProfileSelector from '../screens/profile-selector';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileSelector"
      screenOptions={{animation: 'none', headerShown: false}}>
      <Stack.Screen name="ProfileSelector" component={ProfileSelector} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="MoreOptions" component={MoreOptions} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
