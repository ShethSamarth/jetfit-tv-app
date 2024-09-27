import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import UserButton from '../components/profile-selector/user-button';

import {COLORS, FONTS} from '../constants';

const users = [
  {
    id: 0,
    name: 'Liam',
    image: require('../../assets/images/users/1.png'),
  },
  {
    id: 1,
    name: 'Olivia',
    image: require('../../assets/images/users/2.png'),
  },
  {
    id: 2,
    name: 'Noah',
    image: require('../../assets/images/users/3.png'),
  },
];

const ProfileSelector = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const btnRef = useRef<Animatable.View>(null);

  const [btnFocused, setBtnFocused] = useState(false);

  useEffect(() => {
    const zoomIn = {
      0: {transform: [{scale: 1}], borderWidth: 1},
      1: {transform: [{scale: 1.05}], borderWidth: 2},
    };

    const zoomOut = {
      0: {transform: [{scale: 1.05}], borderWidth: 2},
      1: {transform: [{scale: 1}], borderWidth: 1},
    };

    if (btnFocused) {
      btnRef.current?.animate(zoomIn);
    } else {
      btnRef.current?.animate(zoomOut);
    }
  }, [btnFocused]);

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <Text style={styles.title}>Who's working out today?</Text>

      <View style={styles.userContainer}>
        {users.map(user => (
          <UserButton
            key={user.id}
            name={user.name}
            image={user.image}
            initialFocus={user.id === 1}
          />
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onFocus={() => setBtnFocused(true)}
        onBlur={() => setBtnFocused(false)}
        onPress={() => navigation.push('DrawerNavigator')}>
        <Animatable.View ref={btnRef} style={styles.btn}>
          <Text style={styles.btnText}>Sign in with a different user</Text>
        </Animatable.View>
      </TouchableOpacity>
    </TVFocusGuideView>
  );
};

export default ProfileSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background[30],
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
  },
  userContainer: {
    columnGap: 20,
    flexDirection: 'row',
  },
  btn: {
    borderWidth: 1,
    borderColor: COLORS.neutral[80],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 90,
  },
  btnText: {
    fontSize: 12,
    color: COLORS.neutral[80],
    fontFamily: FONTS.semibold,
  },
});
