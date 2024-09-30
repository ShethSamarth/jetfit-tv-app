import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import CardsList from '../cards-list';

import {COLORS, FONTS} from '../../constants';
import CardsGrid from '../cards-grid';

const Recommended = () => {
  return (
    <View>
      <Text style={styles.header}>Recommended for you</Text>

      <CardsList />
      <CardsList variant={3 / 4} />
      <CardsList />
      <CardsGrid variant={3 / 4} />
    </View>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    lineHeight: 28,
    paddingLeft: 30,
    fontFamily: FONTS.semibold,
    color: COLORS.neutral[80],
  },
});
