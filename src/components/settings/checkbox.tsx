import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {COLORS, FONTS} from '../../constants';

interface CheckboxProps {
  id: number;
  label: string;
  selectedOption: number;
  setOption: (id: number | null) => void;
}

const Checkbox = ({id, label, selectedOption, setOption}: CheckboxProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setOption(id)}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      style={[
        styles.btn,
        // eslint-disable-next-line react-native/no-inline-styles
        {backgroundColor: focused ? COLORS.neutral[80] : '#1D201F'},
      ]}>
      <Text
        style={[
          styles.btnText,
          {color: focused ? COLORS.neutral[20] : COLORS.neutral[80]},
        ]}>
        {label}
      </Text>
      {selectedOption === id && (
        <Ionicons
          size={20}
          name="checkmark"
          color={focused ? '#006B56' : COLORS.secondary[80]}
        />
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

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
});
