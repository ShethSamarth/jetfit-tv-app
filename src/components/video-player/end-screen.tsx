import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TVFocusGuideView, View} from 'react-native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import Buttons from './buttons';

import {COLORS, FONTS} from '../../constants';

interface EndScreenProps {
  onRepeat: () => void;
}

const EndScreen = ({onRepeat}: EndScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        onNext();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const onNext = () =>
    navigation.replace('VideoPlayer', {
      url: 'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
    });

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <Text style={styles.timer}>Up next in {timeLeft}</Text>

      <View style={styles.details}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/list/1.png')}
        />
        <View style={styles.right}>
          <Text style={styles.title}>Full body strength</Text>
          <Text style={styles.author}>Author name</Text>
        </View>
      </View>

      <Buttons onNext={onNext} onRepeat={onRepeat} />
    </TVFocusGuideView>
  );
};

export default EndScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    rowGap: 30,
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  timer: {
    fontSize: 24,
    color: COLORS.neutral[80],
    fontFamily: FONTS.regular,
  },
  details: {
    columnGap: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    borderRadius: 14,
    aspectRatio: 16 / 9,
  },
  right: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: COLORS.neutral[80],
    fontFamily: FONTS.semibold,
  },
  author: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.surface[80],
  },
});
