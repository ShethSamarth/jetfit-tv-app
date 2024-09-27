import React from 'react';
import {StyleSheet, Text, TVFocusGuideView} from 'react-native';

import CardsList from '../cards-list';

import {COLORS, FONTS} from '../../constants';

const FavouritesList = () => {
  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <Text style={styles.header}>Favourites</Text>

      <CardsList hasTVPreferredFocus />
      <CardsList />
    </TVFocusGuideView>
  );
};

export default FavouritesList;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    lineHeight: 28,
    paddingLeft: 30,
    fontFamily: FONTS.semibold,
    color: COLORS.neutral[80],
  },
  container: {
    paddingTop: 30,
  },
});
