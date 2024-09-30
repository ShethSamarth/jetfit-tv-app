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

interface SubFiltersDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const languages = [
  {id: 1, label: 'English (US)'},
  {id: 2, label: 'English (UK)'},
  {id: 3, label: 'Français'},
  {id: 4, label: 'Española'},
  {id: 5, label: 'Deutsch'},
];

const SubFiltersDrawer = ({open, setOpen}: SubFiltersDrawerProps) => {
  const drawerRef = useRef<Animatable.View>(null);

  const [selected, setSelected] = useState<number>(1);
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
          <Text style={styles.header}>Filters</Text>

          <View>
            {languages.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={1}
                onPress={() => {
                  setSelected(item.id);
                  setOpen(false);
                }}
                onBlur={() => setFocused(null)}
                onFocus={() => setFocused(item.id)}
                hasTVPreferredFocus={item.id === 1}
                style={[styles.btn, focused === item.id && styles.btnFocused]}>
                <View style={styles.left}>
                  <View>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.title,
                        focused === item.id && styles.textFocused,
                      ]}>
                      {item.label}
                    </Text>
                  </View>
                </View>

                <View style={styles.radio}>
                  {selected === item.id && <View style={styles.active} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>
      </TVFocusGuideView>
    </Modal>
  );
};

export default SubFiltersDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: COLORS.background[90],
  },
  drawer: {
    flex: 1,
    rowGap: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
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
  left: {
    columnGap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
  },
  textFocused: {
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
