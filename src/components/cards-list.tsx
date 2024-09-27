import React from 'react';
import {FlatList, StyleSheet, TVFocusGuideView} from 'react-native';

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
  hasTVPreferredFocus?: boolean;
}

const CardsList = ({hasTVPreferredFocus = false}: CardsListProps) => {
  return (
    <TVFocusGuideView autoFocus>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <Card
            {...item}
            key={item.id}
            hasTVPreferredFocus={hasTVPreferredFocus && item.id === 1}
          />
        )}
      />
    </TVFocusGuideView>
  );
};

export default CardsList;

const styles = StyleSheet.create({
  container: {
    columnGap: 24,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
