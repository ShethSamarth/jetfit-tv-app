import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS, FONTS} from '../../constants';

const Buttons = () => {
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onFocus={() => setFocused(1)}
        onBlur={() => setFocused(null)}
        style={[
          styles.btn,
          styles.btnDefault,
          focused === 1 && styles.focused,
        ]}>
        <Text style={[styles.btnText, styles.btnTextDefault]}>
          Subscribe now
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onFocus={() => setFocused(2)}
        onBlur={() => setFocused(null)}
        style={[
          styles.btn,
          styles.btnOutline,
          focused === 2 && styles.focused,
        ]}>
        <Text style={[styles.btnText, styles.btnTextOutline]}>
          Restore purchases
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 90,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnDefault: {
    borderColor: COLORS.neutral[80],
    backgroundColor: COLORS.neutral[80],
  },
  btnOutline: {
    borderColor: COLORS.neutral[80],
  },
  btnText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },
  btnTextDefault: {
    color: COLORS.neutral[30],
  },
  btnTextOutline: {
    color: COLORS.neutral[80],
  },
  focused: {
    transform: [{scale: 1.05}],
  },
});
