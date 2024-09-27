import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS, FONTS} from '../../constants';

const plans = [
  {
    id: 1,
    title: '1 Month Subscription',
    description:
      'Start your 7-day free trial then $7.99 / month. Subscription continues until cancelled',
    price: '$7.99',
  },
  {
    id: 2,
    title: '3 Month Subscription',
    description:
      'Start your 7-day free trial then $19.99 / 3 months. Subscription continues until cancelled',
    price: '$19.99',
  },
  {
    id: 3,
    title: '12 Month Subscription',
    description:
      'Start your 7-day free trial then $79.99 / 12 months. Subscription continues until cancelled',
    price: '$79.99',
  },
];

const Plans = () => {
  const [selected, setSelected] = useState<number | null>(1);
  const [isFocused, setIsFocused] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {plans.map(plan => (
        <View key={plan.id} style={styles.innerContainer}>
          <View style={styles.details}>
            <Text style={styles.title}>{plan.title}</Text>
            <Text style={styles.description}>{plan.description}</Text>
          </View>
          <Text style={styles.price}>{plan.price}</Text>
          <TouchableOpacity
            activeOpacity={1}
            onBlur={() => setIsFocused(null)}
            hasTVPreferredFocus={plan.id === 1}
            onPress={() => setSelected(plan.id)}
            onFocus={() => setIsFocused(plan.id)}
            style={[styles.radio, isFocused === plan.id && styles.focused]}>
            {selected === plan.id && <View style={styles.active} />}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Plans;

const styles = StyleSheet.create({
  container: {
    maxWidth: '75%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 24,
    paddingVertical: 12,
  },
  details: {
    width: '75%',
  },
  title: {
    fontSize: 16,
    color: COLORS.neutral[80],
    fontFamily: FONTS.semibold,
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.neutral[80],
  },
  price: {
    width: '14%',
    fontSize: 14,
    textAlign: 'right',
    color: COLORS.neutral[80],
    fontFamily: FONTS.medium,
  },
  radio: {
    position: 'relative',
    width: 24,
    height: 24,
    opacity: 0.5,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: COLORS.surface[60],
  },
  focused: {
    transform: [{scale: 1.1}],
  },
  active: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 12,
    backgroundColor: COLORS.surface[60],
    margin: 2.5,
  },
});
