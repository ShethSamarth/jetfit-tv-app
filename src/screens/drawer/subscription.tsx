import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TVFocusGuideView,
  View,
} from 'react-native';
import React from 'react';

import Plans from '../../components/home/plans';
import Buttons from '../../components/home/buttons';
import Sidebar from '../../components/drawer/sidebar';

import {COLORS, FONTS} from '../../constants';

const Subscription = () => {
  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/home/subscription/1.png')}
        />

        <View style={styles.rightContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Subscribe to Premium</Text>
            <Text style={styles.description}>
              Subscribe to our services to start your fitness journey
            </Text>
          </View>

          <View>
            <Text style={styles.plan}>Our Plans</Text>

            <Plans />
          </View>

          <Buttons />
        </View>
      </ScrollView>

      <Sidebar active="Home" />
    </TVFocusGuideView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.background[30],
  },
  scrollContainer: {
    minHeight: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    columnGap: 32,
  },
  image: {
    width: '40%',
    height: '100%',
    borderRadius: 20,
  },
  rightContainer: {
    flex: 1,
    rowGap: 32,
  },
  header: {
    rowGap: 10,
  },
  title: {
    fontSize: 24,
    color: COLORS.neutral[80],
    fontFamily: FONTS.semibold,
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.neutral[80],
  },
  plan: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
  },
});
