import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../../constants';
import Letter from './letter';

interface KeyboardProps {
  value: string;
  setValue: (value: string) => void;
}

const letterKeys = {
  1: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  2: ['h', 'i', 'j', 'k', 'l', 'm', 'n'],
  3: ['o', 'p', 'q', 'r', 's', 't', 'u'],
  4: ['v', 'w', 'x', 'y', 'z', '-', "'"],
};

const numberKeys = {
  1: ['1', '2', '3', '&', '#', '(', ')'],
  2: ['4', '5', '6', '@', '!', '?', ':'],
  3: ['7', '8', '9', '.', '-', '_', '"'],
  4: ['0', '/', '$', '%', '+', '[', ']'],
};

const Keyboard = ({value, setValue}: KeyboardProps) => {
  const [focused, setFocused] = useState<number | null>(null);
  const [showLetters, setShowLetters] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {showLetters
        ? Object.entries(letterKeys).map(([key, letters]) => (
            <View key={key} style={styles.row}>
              {letters.map((letter, index) => (
                <Letter
                  row={key}
                  key={letter}
                  value={value}
                  index={index}
                  letter={letter}
                  setValue={setValue}
                />
              ))}
              {key === '1' && (
                <TouchableOpacity
                  activeOpacity={1}
                  onFocus={() => setFocused(1)}
                  onBlur={() => setFocused(null)}
                  style={[styles.icon, focused === 1 && styles.iconFocused]}
                  onPress={() => setValue(value.slice(0, -1))}>
                  <Ionicons
                    name="close"
                    color={
                      focused === 1 ? COLORS.neutral[30] : COLORS.neutral[80]
                    }
                  />
                </TouchableOpacity>
              )}
              {key === '2' && (
                <TouchableOpacity
                  activeOpacity={1}
                  onFocus={() => setFocused(2)}
                  onBlur={() => setFocused(null)}
                  onPress={() => setShowLetters(false)}
                  style={[styles.icon, focused === 2 && styles.iconFocused]}>
                  <Text
                    style={[
                      styles.iconText,
                      focused === 2 && styles.iconTextFocused,
                    ]}>
                    &123
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        : Object.entries(numberKeys).map(([key, letters]) => (
            <View key={key} style={styles.row}>
              {letters.map((letter, index) => (
                <Letter
                  row={key}
                  key={letter}
                  value={value}
                  index={index}
                  letter={letter}
                  setValue={setValue}
                />
              ))}
              {key === '1' && (
                <TouchableOpacity
                  activeOpacity={1}
                  onFocus={() => setFocused(1)}
                  onBlur={() => setFocused(null)}
                  style={[styles.icon, focused === 1 && styles.iconFocused]}
                  onPress={() => setValue(value.slice(0, -1))}>
                  <Ionicons
                    name="close"
                    color={
                      focused === 1 ? COLORS.neutral[30] : COLORS.neutral[80]
                    }
                  />
                </TouchableOpacity>
              )}
              {key === '2' && (
                <TouchableOpacity
                  activeOpacity={1}
                  onFocus={() => setFocused(2)}
                  onBlur={() => setFocused(null)}
                  onPress={() => setShowLetters(true)}
                  style={[styles.icon, focused === 2 && styles.iconFocused]}>
                  <Text
                    style={[
                      styles.iconText,
                      focused === 2 && styles.iconTextFocused,
                    ]}>
                    ABC
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  container: {
    rowGap: 7,
  },
  row: {
    columnGap: 7,
    flexDirection: 'row',
  },
  icon: {
    width: 45,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.neutral[30],
  },
  iconFocused: {
    backgroundColor: COLORS.neutral[80],
  },
  iconText: {
    fontSize: 14,
    color: COLORS.neutral[80],
    textTransform: 'uppercase',
  },
  iconTextFocused: {
    color: COLORS.neutral[30],
  },
});
