import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import CardsList from '../cards-list';

import {COLORS, FONTS} from '../../constants';

const Recommended = () => {
  return (
    <View>
      <Text style={styles.header}>Recommended for you</Text>

      <CardsList />
      <CardsList />
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
