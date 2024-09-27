import React, {useState} from 'react';
import {ScrollView, StyleSheet, TVFocusGuideView} from 'react-native';

import CardsList from '../../components/cards-list';
import Sidebar from '../../components/drawer/sidebar';
import Header from '../../components/training/header';

import {COLORS} from '../../constants';

const Training = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Workout');
  const [sortBy, setSortBy] = useState<string>('Newest');

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Header
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <CardsList />
        <CardsList />
        <CardsList />
      </ScrollView>

      <Sidebar active="Training" />
    </TVFocusGuideView>
  );
};

export default Training;

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
