import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, {useEffect, useRef, useState} from 'react';

import {COLORS, FONTS} from '../../constants';

interface SortByDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const buttons = [
  {id: 1, label: 'Newest'},
  {id: 2, label: 'Easiest'},
  {id: 3, label: 'Hardest'},
  {id: 4, label: 'Shortest'},
  {id: 5, label: 'Longest'},
];

const SortByDrawer = ({
  open,
  setOpen,
  sortBy,
  setSortBy,
}: SortByDrawerProps) => {
  const drawerRef = useRef<Animatable.View>(null);

  const [focused, setFocused] = useState<number | null>(null);

  useEffect(() => {
    const drawerOpen = {
      0: {width: '0%'},
      1: {width: '35%'},
    };

    if (open) {
      drawerRef.current?.animate(drawerOpen);
    }
  }, [open]);

  return (
    <Modal
      transparent
      visible={open}
      animationType="none"
      onRequestClose={() => setOpen(!open)}>
      <TVFocusGuideView autoFocus style={styles.container}>
        <Animatable.View ref={drawerRef} style={styles.drawer}>
          <Text style={styles.header}>Sort by</Text>

          <View>
            {buttons.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={1}
                onBlur={() => setFocused(null)}
                hasTVPreferredFocus={item.id === 1}
                onFocus={() => setFocused(item.id)}
                onPress={() => setSortBy(item.label)}
                style={[styles.btn, focused === item.id && styles.btnFocused]}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.btnText,
                    focused === item.id && styles.btnFocusedText,
                  ]}>
                  {item.label}
                </Text>

                <View style={styles.radio}>
                  {sortBy === item.label && <View style={styles.active} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>
      </TVFocusGuideView>
    </Modal>
  );
};

export default SortByDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: COLORS.background[90],
  },
  drawer: {
    flex: 1,
    rowGap: 32,
    padding: 32,
    backgroundColor: '#272B29',
  },
  header: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
  },
  btnFocused: {
    backgroundColor: COLORS.neutral[90],
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
  },
  btnFocusedText: {
    color: COLORS.neutral[20],
  },
  radio: {
    position: 'relative',
    width: 24,
    height: 24,
    opacity: 0.5,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: COLORS.secondary[30],
  },
  active: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 12,
    backgroundColor: COLORS.secondary[20],
    margin: 2.5,
  },
});
