import * as Animatable from 'react-native-animatable';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {COLORS, FONTS} from '../../constants';

interface MenuButtonProps {
  label: string;
  onPress: () => void;
  drawer: React.JSX.Element;
}

const MenuButton = ({label, onPress, drawer}: MenuButtonProps) => {
  const butttonRef = useRef<Animatable.View>(null);

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    const focus = {
      0: {borderWidth: 1},
      1: {borderWidth: 2},
    };

    const blur = {
      0: {borderWidth: 2},
      1: {borderWidth: 1},
    };

    if (focused) {
      butttonRef.current?.animate(focus);
    } else {
      butttonRef.current?.animate(blur);
    }
  }, [focused]);

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}>
        <Animatable.View
          ref={butttonRef}
          duration={300}
          style={styles.container}>
          <Text style={styles.text}>{label}</Text>
        </Animatable.View>
      </TouchableOpacity>
      {drawer}
    </>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderColor: COLORS.surface[80],
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[90],
  },
});
