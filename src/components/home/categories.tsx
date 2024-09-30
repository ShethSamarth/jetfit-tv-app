import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text, TVFocusGuideView} from 'react-native';

import CategoryCard from './category-card';

import {COLORS, FONTS} from '../../constants';

const categories = [
  {
    id: 1,
    title: 'Aerobic & Cardio',
    description: 'Get your blood pumping and build up your endurance with some',
    image: require('../../../assets/images/home/categories/1.png'),
  },
  {
    id: 2,
    title: 'Strength training',
    description: 'Strength training makes you stronger, helps you control your',
    image: require('../../../assets/images/home/categories/2.png'),
  },
  {
    id: 3,
    title: 'Yoga & Pilates',
    description:
      'There are many benefits to yoga and Pilates, including increased',
    image: require('../../../assets/images/home/categories/3.png'),
  },
];

const Categories = () => {
  const scrollRef = useRef<FlatList>(null);

  return (
    <TVFocusGuideView autoFocus>
      <Text style={styles.header}>Categories</Text>

      <FlatList
        horizontal
        ref={scrollRef}
        data={categories}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.conatiner}
        renderItem={({item, index}) => (
          <CategoryCard
            {...item}
            key={item.id}
            index={index}
            scrollRef={scrollRef}
            first={index === 0}
            last={index === categories.length - 1}
          />
        )}
      />
    </TVFocusGuideView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    lineHeight: 28,
    paddingLeft: 30,
    fontFamily: FONTS.semibold,
    color: COLORS.neutral[80],
  },
  conatiner: {
    columnGap: 24,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
