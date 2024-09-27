import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {COLORS, FONTS} from '../constants';

const MoreOptions = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [isFocused, setIsFocused] = useState<number | null>(null);

  const buttons = [
    {
      id: 1,
      icon: 'play-circle',
      label: 'Start workout',
      onPress: () => navigation.push('VideoPlayer'),
    },
    {id: 2, icon: 'heart', label: 'Add to favorites', onPress: () => {}},
    {id: 3, icon: 'info', label: 'More info', onPress: () => {}},
    {id: 4, icon: 'user', label: 'View instructor', onPress: () => {}},
    {id: 5, icon: 'share-2', label: 'Share', onPress: () => {}},
  ];

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <View style={styles.section}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/list/1.png')}
          />
        </View>
        <Text numberOfLines={1} style={styles.title}>
          Total-body balance pilates
        </Text>
        <Text style={styles.other}>34 Min | Intensity ••••</Text>
        <Text style={styles.other}>
          Andrea's signature low-impact, total-body class in just 30 minutes.
          Hit every muscle group with barre and Pilates moves that leave you
          feeling strong, refreshed, and energized
        </Text>

        <Text style={styles.info}>
          Press{' '}
          <Feather
            size={14}
            name="arrow-left-circle"
            color={COLORS.surface[80]}
          />{' '}
          to go back
        </Text>
      </View>

      <View style={styles.section}>
        {buttons.map(btn => (
          <TouchableOpacity
            key={btn.id}
            activeOpacity={1}
            onPress={btn.onPress}
            onBlur={() => setIsFocused(null)}
            hasTVPreferredFocus={btn.id === 1}
            onFocus={() => setIsFocused(btn.id)}
            style={[styles.btn, isFocused === btn.id && styles.focused]}>
            <Feather
              size={18}
              name={btn.icon}
              color={
                isFocused === btn.id
                  ? COLORS.background[30]
                  : COLORS.neutral[80]
              }
            />
            <Text
              style={[
                styles.btnText,
                isFocused === btn.id && styles.focusedText,
              ]}>
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </TVFocusGuideView>
  );
};

export default MoreOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    columnGap: 24,
    flexDirection: 'row',
    backgroundColor: COLORS.background[30],
    padding: 30,
  },
  section: {
    flex: 1,
    rowGap: 10,
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 14,
    overflow: 'hidden',
    borderColor: COLORS.neutral[80],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 16,
    paddingTop: 10,
    color: COLORS.neutral[80],
    fontFamily: FONTS.semibold,
  },
  other: {
    fontSize: 12,
    opacity: 0.6,
    color: COLORS.neutral[80],
    fontFamily: FONTS.regular,
  },
  info: {
    fontSize: 12,
    paddingTop: 20,
    color: COLORS.surface[80],
    fontFamily: FONTS.regular,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    backgroundColor: COLORS.surface[30],
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.neutral[80],
  },
  focused: {
    backgroundColor: COLORS.neutral[80],
    transform: [{scale: 1.05}],
  },
  focusedText: {
    color: COLORS.background[30],
  },
});
