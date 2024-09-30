import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from 'react-native';
import React, {useState} from 'react';

import Dialog from './dialog';

import {COLORS, FONTS} from '../constants';

interface CardProps {
  id: number;
  image: ImageSourcePropType;
  title: string;
  duration: number;
  intensity: number;
  variant?: number;
  hasTVPreferredFocus?: boolean;
}

const Card = ({
  image,
  title,
  duration,
  intensity,
  variant = 16 / 9,
  hasTVPreferredFocus = false,
}: CardProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.card}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onPress={() => setModalOpen(true)}
        hasTVPreferredFocus={hasTVPreferredFocus}>
        <View
          style={[
            styles.imageContainer,
            focused && styles.focused,
            {aspectRatio: variant},
          ]}>
          <Image source={image} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.other}>
          {duration} Min{'  '}|{'  '}Intensity{' '}
          {[...Array(intensity)].map((_, index) => (
            <Text key={index} style={styles.dot}>
              •
            </Text>
          ))}
        </Text>
      </TouchableOpacity>
      <Dialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: 200,
  },
  imageContainer: {
    width: '100%',
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
  dot: {
    fontSize: 12,
    opacity: 0.6,
    color: COLORS.neutral[80],
    fontFamily: FONTS.semibold,
  },
  focused: {
    borderWidth: 2,
    borderColor: COLORS.neutral[90],
    shadowColor: COLORS.secondary[30],
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
});
