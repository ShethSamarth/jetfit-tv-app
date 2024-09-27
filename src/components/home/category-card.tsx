import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import RadialGradient from 'react-native-radial-gradient';

import {COLORS, FONTS} from '../../constants';

interface CategoryCardProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const CategoryCard = ({title, description, image}: CategoryCardProps) => {
  const categoryRef = useRef<Animatable.View>(null);

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const focus = {
      0: {
        borderWidth: 2,
        transform: [{scale: 1}],
        borderColor: 'rgba(0,0,0,0)',
      },
      1: {
        borderWidth: 2,
        transform: [{scale: 1.05}],
        borderColor: COLORS.neutral[80],
      },
    };

    const blur = {
      0: {
        borderWidth: 2,
        transform: [{scale: 1.05}],
        borderColor: COLORS.neutral[80],
      },
      1: {
        borderWidth: 2,
        transform: [{scale: 1}],
        borderColor: 'rgba(0,0,0,0)',
      },
    };

    if (focused) {
      categoryRef.current?.animate(focus);
    } else {
      categoryRef.current?.animate(blur);
    }
  }, [focused]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}>
      <Animatable.View
        duration={200}
        ref={categoryRef}
        style={styles.container}>
        <View style={styles.background}>
          <Image source={image} style={styles.image} />
          <View style={styles.gradient}>
            <RadialGradient
              radius={100}
              stops={[0.3, 0.75]}
              style={StyleSheet.absoluteFill}
              colors={['rgba(36, 40, 38, 0.17)', COLORS.surface[30]]}
            />
          </View>
          <View style={styles.filter} />
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 280,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.surface[30],
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
  },
  image: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
  },
  filter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background[90],
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: -70,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    margin: 14,
    paddingRight: 48,
  },
  title: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
  },
  description: {
    fontSize: 13,
    lineHeight: 17,
    opacity: 0.8,
    fontFamily: FONTS.regular,
    color: COLORS.neutral[80],
  },
});
