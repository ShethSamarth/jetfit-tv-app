import React from 'react';
import {StyleSheet, TVFocusGuideView, View} from 'react-native';

import Card from './card';

const data = [
  {
    id: 1,
    image: require('../../assets/images/list/1.png'),
    title: 'Full body strength',
    duration: 26,
    intensity: 3,
  },
  {
    id: 2,
    image: require('../../assets/images/list/2.png'),
    title: 'Total-body balance pilates',
    duration: 24,
    intensity: 5,
  },
  {
    id: 3,
    image: require('../../assets/images/list/3.png'),
    title: 'Circuit training',
    duration: 13,
    intensity: 1,
  },
  {
    id: 4,
    image: require('../../assets/images/list/4.png'),
    title: 'Morning stretch',
    duration: 15,
    intensity: 4,
  },
  {
    id: 5,
    image: require('../../assets/images/list/5.png'),
    title: 'Wind down',
    duration: 16,
    intensity: 2,
  },
];

interface CardsListProps {
  variant?: number;
  hasTVPreferredFocus?: boolean;
}

const CardsGrid = ({
  variant = 16 / 9,
  hasTVPreferredFocus = false,
}: CardsListProps) => {
  return (
    <TVFocusGuideView autoFocus>
      <View style={styles.container}>
        {data.map(item => {
          return (
            <Card
              {...item}
              key={item.id}
              variant={variant}
              hasTVPreferredFocus={hasTVPreferredFocus && item.id === 1}
            />
          );
        })}
      </View>
    </TVFocusGuideView>
  );
};

export default CardsGrid;

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
