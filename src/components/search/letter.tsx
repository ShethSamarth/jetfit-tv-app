import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {COLORS} from '../../constants';

interface LetterProps {
  row: string;
  letter: string;
  index: number;
  value: string;
  setValue: (value: string) => void;
}

const Letter = ({row, letter, index, value, setValue}: LetterProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <TouchableOpacity
      key={letter}
      activeOpacity={1}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onPress={() => setValue(value + letter)}
      hasTVPreferredFocus={row === '1' && index === 0}
      style={[styles.letter, focused && styles.letterFocused]}>
      <Text style={[styles.text, focused && styles.textFocused]}>{letter}</Text>
    </TouchableOpacity>
  );
};

export default Letter;

const styles = StyleSheet.create({
  letter: {
    width: 25,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.neutral[30],
  },
  letterFocused: {
    backgroundColor: COLORS.neutral[80],
  },
  text: {
    fontSize: 14,
    color: COLORS.neutral[80],
    textTransform: 'uppercase',
  },
  textFocused: {
    color: COLORS.neutral[30],
  },
});
