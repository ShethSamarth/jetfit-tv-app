import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';

import MainButton from './main-button';

import {COLORS, FONTS} from '../../constants';

interface MainMenuProps {
  menus: {
    id: number;
    label: string;
    options: {
      id: number;
      label: string;
    }[];
  }[];
  menu: number;
  setMenu: (menuId: number) => void;
  units: number | null;
  language: number | null;
  resolution: number | null;
  subtitles: number | null;
}

const MainMenu = ({
  menus,
  menu,
  setMenu,
  units,
  language,
  resolution,
  subtitles,
}: MainMenuProps) => {
  const selectedOptions = (
    id: number,
    options: {
      id: number;
      label: string;
    }[],
  ) => {
    let selectedId;

    switch (id) {
      case 1:
        selectedId = units;
        break;
      case 2:
        selectedId = language;
        break;
      case 3:
        selectedId = resolution;
        break;
      case 4:
        selectedId = subtitles;
        break;
    }

    return options.filter(option => option.id === selectedId!)[0].label;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.subHeader}>App settings</Text>

        <FlatList
          data={menus}
          scrollEnabled={false}
          contentContainerStyle={styles.list}
          renderItem={({item}) => (
            <MainButton
              id={item.id}
              label={item.label}
              menu={menu}
              setMenu={setMenu}
              selected={selectedOptions(item.id, item.options)}
              hasTVPreferredFocus={item.id === menu}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
    paddingBottom: 16,
  },
  subHeader: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[90],
  },
  section: {
    rowGap: 12,
    paddingTop: 16,
  },
  list: {
    rowGap: 12,
  },
});
