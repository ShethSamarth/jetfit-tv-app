import React from 'react';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS, FONTS} from '../../constants';

interface MainButtonProps {
  id: number;
  label: string;
  menu: number;
  setMenu: (menu: number) => void;
  selected: string;
  hasTVPreferredFocus?: boolean;
}

const MainButton = ({
  id,
  label,
  menu,
  setMenu,
  selected,
  hasTVPreferredFocus = false,
}: MainButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      hasTVPreferredFocus={hasTVPreferredFocus && id === menu}
      onFocus={() => setMenu(id)}>
      <Animatable.View
        style={[
          styles.btn,
          // eslint-disable-next-line react-native/no-inline-styles
          {backgroundColor: menu === id ? COLORS.neutral[80] : '#1D201F'},
        ]}>
        <Text
          style={[
            styles.btnText,
            {color: menu === id ? COLORS.neutral[20] : COLORS.neutral[80]},
          ]}>
          {label}
        </Text>
        <View style={styles.right}>
          <Text
            style={[
              styles.btnText,
              // eslint-disable-next-line react-native/no-inline-styles
              {color: menu === id ? '#1D352D' : COLORS.secondary[80]},
            ]}>
            {selected}
          </Text>
          <Ionicons
            size={20}
            name="chevron-forward"
            color={menu === id ? '#006B56' : COLORS.secondary[80]}
          />
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
  },
  right: {
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
