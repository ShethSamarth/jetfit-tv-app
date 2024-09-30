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
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS} from '../../constants';
import SubFiltersDrawer from './sub-filters-drawer';

interface FiltersDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const menus = [
  {
    id: 1,
    title: 'Length',
    subtitle: '15-30 mins',
    icon: 'time-outline',
    isExpandable: false,
  },
  {
    id: 2,
    title: 'Instructor',
    subtitle: 'Charlotte Aldridge',
    icon: 'person-outline',
    isExpandable: true,
  },
  {
    id: 3,
    title: 'Class type',
    subtitle: 'Strength',
    icon: 'barbell-sharp',
    isExpandable: true,
  },
  {
    id: 4,
    title: 'Class language',
    subtitle: 'English',
    icon: 'language-outline',
    isExpandable: true,
  },
  {
    id: 5,
    title: 'Difficulty',
    subtitle: 'Medium',
    icon: 'speedometer-outline',
    isExpandable: true,
  },
  {
    id: 6,
    title: 'Subtitles',
    subtitle: 'Available',
    icon: 'reader-outline',
    isExpandable: true,
  },
];

const FiltersDrawer = ({open, setOpen}: FiltersDrawerProps) => {
  const drawerRef = useRef<Animatable.View>(null);

  const [focused, setFocused] = useState<number | null>(null);
  const [subDrawer, setSubDrawer] = useState<boolean>(false);

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
    <>
      <Modal
        transparent
        visible={open}
        animationType="none"
        onRequestClose={() => setOpen(!open)}>
        <TVFocusGuideView autoFocus style={styles.container}>
          <Animatable.View ref={drawerRef} style={styles.drawer}>
            <Text style={styles.header}>Filters</Text>

            <View>
              {menus.map(item => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={1}
                  onBlur={() => setFocused(null)}
                  onPress={() => setSubDrawer(true)}
                  onFocus={() => setFocused(item.id)}
                  hasTVPreferredFocus={item.id === 1}
                  style={[
                    styles.btn,
                    focused === item.id && styles.btnFocused,
                  ]}>
                  <View style={styles.left}>
                    <Ionicons
                      size={20}
                      name={item.icon}
                      color={
                        focused === item.id
                          ? COLORS.surface[30]
                          : COLORS.neutral[80]
                      }
                    />
                    <View>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.title,
                          focused === item.id && styles.textFocused,
                        ]}>
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.subtitle,
                          focused === item.id && styles.textFocused,
                        ]}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>

                  {item.isExpandable && (
                    <Ionicons
                      size={20}
                      name="chevron-forward"
                      color={
                        focused === item.id
                          ? COLORS.surface[30]
                          : COLORS.neutral[80]
                      }
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Animatable.View>
        </TVFocusGuideView>
      </Modal>
      <SubFiltersDrawer open={subDrawer} setOpen={setSubDrawer} />
    </>
  );
};

export default FiltersDrawer;

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
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.regular,
    color: COLORS.neutral[80],
  },
  textFocused: {
    color: COLORS.neutral[20],
  },
});
