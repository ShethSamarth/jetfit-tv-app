import {
  StyleSheet,
  TouchableOpacity,
  TVFocusGuideView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import CarouselItem from './carousel-item';

import {COLORS} from '../../constants';

const data = [
  {
    id: 1,
    author: 'Danielle Orlando',
    title: 'Strengthen & lengthen pilates',
    description:
      'This pilates workout is perfect for good balance between your overall strength and flexibility. Use your own body weight to strengthen and sculpt our muscles',
    image: require('../../../assets/images/home/carousel/1.png'),
  },
  {
    id: 2,
    author: 'Lorem, ipsum.',
    title: 'Voluptates assumenda',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odit repudiandae officiis laudantium aspernatur voluptate ducimus alias a similique optio?',
    image: require('../../../assets/images/home/carousel/1.png'),
  },
  {
    id: 3,
    author: 'dolor sit',
    title: 'Voluptates assumenda ad necessitatibus',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quisquam non tenetur nesciunt, recusandae perferendis praesentium accusantium quaerat quod nobis!',
    image: require('../../../assets/images/home/carousel/1.png'),
  },
  {
    id: 4,
    author: 'amet consectetur',
    title: 'mollitia commodi rerum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore dolor non omnis officia itaque, excepturi facilis ratione possimus modi distinctio.',
    image: require('../../../assets/images/home/carousel/1.png'),
  },
  {
    id: 5,
    author: 'adipisicing elit',
    title: 'explicabo eligendi suscipit',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum eum sunt explicabo enim tempore vitae eligendi. Officiis facilis ipsum excepturi.',
    image: require('../../../assets/images/home/carousel/1.png'),
  },
];

interface CarouselProps {
  scrollRef: any;
}

const Carousel = ({scrollRef}: CarouselProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [index, setIndex] = useState<number>(0);
  const [focused, setFocused] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<boolean>(false);

  useEffect(() => {
    const isFocused = () => focused !== null;

    if (isFocused()) {
      scrollRef.current?.scrollTo({y: 0});
    }

    const highlightState = setTimeout(() => {
      if (isFocused()) {
        setHighlight(true);
      } else {
        setHighlight(false);
      }
    }, 300);

    return () => clearTimeout(highlightState);
  }, [focused, scrollRef]);

  return (
    <View style={[styles.container, highlight && styles.focused]}>
      <CarouselItem
        key={index}
        focused={highlight}
        data={data[index ? index - 1 : 0]}
      />
      <TVFocusGuideView autoFocus style={styles.indicatorContainer}>
        {data.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            style={styles.indicator}
            onBlur={() => setFocused(null)}
            onFocus={() => {
              setFocused(item.id);
              setIndex(item.id);
            }}
            hasTVPreferredFocus={item.id === 1}
            onPress={() => navigation.push('Subscription')}
          />
        ))}
      </TVFocusGuideView>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: COLORS.neutral[30],
    height: 350,
    margin: 30,
    borderRadius: 30,
    overflow: 'hidden',
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
  indicatorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    height: 15,
    columnGap: 5,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  indicator: {
    width: 8,
    height: 8,
    opacity: 0.2,
    borderRadius: 100,
    backgroundColor: COLORS.neutral[80],
  },
});
