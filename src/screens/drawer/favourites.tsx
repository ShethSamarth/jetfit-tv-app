import React from 'react';
import {ScrollView, StyleSheet, TVFocusGuideView} from 'react-native';

import Sidebar from '../../components/drawer/sidebar';
import FavouritesList from '../../components/favoutites/favourites-list';

import {COLORS} from '../../constants';

const Favourites = () => {
  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <FavouritesList />
      </ScrollView>

      <Sidebar active="Favourites" />
    </TVFocusGuideView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.background[30],
  },
  scrollContainer: {
    minHeight: '100%',
  },
});
