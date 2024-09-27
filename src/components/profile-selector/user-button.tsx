import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type ImageSourcePropType,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {COLORS, FONTS} from '../../constants';

interface UserProps {
  name: string;
  image: ImageSourcePropType;
  initialFocus?: boolean;
}

const UserButton = ({name, image, initialFocus = false}: UserProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const userRef = useRef<Animatable.View>(null);
  const imageRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const zoomIn = {
      0: {
        transform: [{scale: 1}],
        paddingHorizontal: 0,
      },
      1: {
        transform: [{scale: 1.2}],
        paddingHorizontal: 16,
      },
    };

    const zoomOut = {
      0: {
        transform: [{scale: 1.2}],
        paddingHorizontal: 16,
      },
      1: {
        transform: [{scale: 1}],
        paddingHorizontal: 0,
      },
    };

    const focus = {
      0: {borderWidth: 0},
      1: {borderWidth: 2},
    };

    const blur = {
      0: {borderWidth: 2},
      1: {borderWidth: 0},
    };

    if (isFocused) {
      userRef.current?.animate(zoomIn);
      imageRef.current?.animate(focus);
    } else {
      userRef.current?.animate(zoomOut);
      imageRef.current?.animate(blur);
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      hasTVPreferredFocus={initialFocus}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onPress={() => navigation.push('DrawerNavigator')}>
      <Animatable.View ref={userRef} style={styles.user}>
        <Animatable.Image ref={imageRef} style={styles.image} source={image} />
        <Text style={styles.name}>{name}</Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default UserButton;

const styles = StyleSheet.create({
  user: {
    rowGap: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 90,
    borderColor: COLORS.neutral[90],
  },
  name: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    color: COLORS.neutral[80],
  },
});
