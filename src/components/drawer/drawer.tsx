import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {COLORS, FONTS} from '../../constants';

interface DrawerProps {
  routes: {
    id: number;
    name: string;
    icon: string;
    route: string;
  }[];
  open: boolean;
  setOpen: (open: boolean) => void;
  active: 'Search' | 'Home' | 'Training' | 'Favourites' | 'Settings';
}

const Drawer = ({routes, open, setOpen, active}: DrawerProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const drawerRef = useRef<Animatable.View>(null);

  const [focused, setFocused] = useState<number | null>(null);

  useEffect(() => {
    const drawerOpen = {
      0: {width: '10%'},
      1: {width: '25%'},
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
      onRequestClose={() => {
        setOpen(!open);
        navigation.replace(active);
      }}>
      <View style={styles.container}>
        <Animatable.View ref={drawerRef} style={styles.drawer}>
          {routes.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={1}
              onBlur={() => setFocused(null)}
              onFocus={() => setFocused(item.id)}
              hasTVPreferredFocus={active === item.name}
              onPress={() => {
                setOpen(false);
                navigation.replace(item.route);
              }}
              style={[
                styles.btn,
                focused === item.id && styles.focusedBtn,
                active === item.name && styles.activeBtn,
              ]}>
              <IonIcons
                size={24}
                name={item.icon}
                color={
                  active === item.name ? COLORS.neutral[30] : COLORS.surface[80]
                }
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  active === item.name && styles.activeText,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background[90],
  },
  drawer: {
    flex: 1,
    rowGap: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  btn: {
    columnGap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderColor: 'rgba(0,0,0,0)',
  },
  activeBtn: {
    backgroundColor: COLORS.neutral[90],
  },
  focusedBtn: {
    borderColor: COLORS.neutral[90],
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
    color: COLORS.surface[80],
  },
  activeText: {
    color: COLORS.neutral[30],
  },
});
