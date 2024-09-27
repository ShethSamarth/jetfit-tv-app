import * as Animatable from 'react-native-animatable';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {COLORS, FONTS} from '../../constants';

interface TabButtonProps {
  label: string;
  onPress: () => void;
  isSelected: boolean;
  hasTVPreferredFocus?: boolean;
}

const TabButton = ({
  label,
  onPress,
  isSelected,
  hasTVPreferredFocus = false,
}: TabButtonProps) => {
  const tabRef = useRef<Animatable.View>(null);

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const focus = {
      0: {borderColor: 'rgba(0,0,0,0)'},
      1: {borderColor: COLORS.neutral[90]},
    };

    const blur = {
      0: {borderColor: COLORS.neutral[90]},
      1: {borderColor: 'rgba(0,0,0,0)'},
    };

    if (focused) {
      tabRef.current?.animate(focus);
    } else {
      tabRef.current?.animate(blur);
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      hasTVPreferredFocus={hasTVPreferredFocus}>
      <Animatable.View
        ref={tabRef}
        duration={300}
        style={[
          styles.container,
          isSelected && {backgroundColor: COLORS.neutral[90]},
          isSelected && focused && {transform: [{scale: 1.08}]},
        ]}>
        <Text
          style={[
            styles.text,
            {color: isSelected ? COLORS.neutral[30] : COLORS.neutral[90]},
          ]}>
          {label}
        </Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.medium,
  },
});
