import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS, FONTS} from '../../constants';

interface ButtonsProps {
  onNext: () => void;
  onRepeat: () => void;
}

const Buttons = ({onNext, onRepeat}: ButtonsProps) => {
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onNext}
        activeOpacity={1}
        hasTVPreferredFocus
        onFocus={() => setFocused(1)}
        onBlur={() => setFocused(null)}
        style={[
          styles.btn,
          styles.btnDefault,
          focused === 1 && styles.focused,
        ]}>
        <Text style={[styles.btnText, styles.btnTextDefault]}>Play Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={onRepeat}
        onFocus={() => setFocused(2)}
        onBlur={() => setFocused(null)}
        style={[
          styles.btn,
          styles.btnOutline,
          focused === 2 && styles.focused,
        ]}>
        <Text style={[styles.btnText, styles.btnTextOutline]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    columnGap: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
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
