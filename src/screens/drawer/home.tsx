import React, {useRef} from 'react';
import {ScrollView, StyleSheet, TVFocusGuideView} from 'react-native';

import Carousel from '../../components/home/carousel';
import Sidebar from '../../components/drawer/sidebar';
import Categories from '../../components/home/categories';
import Recommended from '../../components/home/recommended';

import {COLORS} from '../../constants';

const Home = () => {
  const scrollRef = useRef(null);

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Carousel scrollRef={scrollRef} />

        <Categories />

        <Recommended />
      </ScrollView>

      <Sidebar active="Home" />
    </TVFocusGuideView>
  );
};

export default Home;

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
