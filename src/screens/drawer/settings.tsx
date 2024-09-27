import React, {useState} from 'react';
import {StyleSheet, TVFocusGuideView, View} from 'react-native';

import Sidebar from '../../components/drawer/sidebar';
import Options from '../../components/settings/options';
import MainMenu from '../../components/settings/main-menu';

import {COLORS} from '../../constants';

const menus = [
  {
    id: 1,
    label: 'Units preference',
    options: [
      {id: 1, label: 'Imperial'},
      {id: 2, label: 'Metric'},
    ],
  },
  {
    id: 2,
    label: 'Language',
    options: [
      {id: 1, label: 'English (US)'},
      {id: 2, label: 'English (UK)'},
      {id: 3, label: 'Français'},
      {id: 4, label: 'Española'},
      {id: 5, label: 'Deutsch'},
    ],
  },
  {
    id: 3,
    label: 'Video resolution',
    options: [
      {id: 1, label: 'Auto'},
      {id: 2, label: '2160p 4K'},
      {id: 3, label: '1440p HD'},
      {id: 4, label: '1080p HD'},
      {id: 5, label: '720p'},
      {id: 6, label: '480p'},
    ],
  },
  {
    id: 4,
    label: 'Subtitles',
    options: [
      {id: 1, label: 'None'},
      {id: 2, label: 'English (US)'},
      {id: 3, label: 'English (UK)'},
      {id: 4, label: 'Français'},
      {id: 5, label: 'Española'},
      {id: 6, label: 'Deutsch'},
    ],
  },
];

const Settings = () => {
  const [menu, setMenu] = useState<number>(1);
  const [units, setUnits] = useState<number | null>(1);
  const [language, setLanguage] = useState<number | null>(1);
  const [resolution, setResolution] = useState<number | null>(1);
  const [subtitles, setSubtitles] = useState<number | null>(1);

  const setOption = (menuId: number) => {
    let func;

    switch (menuId) {
      case 1:
        func = setUnits;
        break;
      case 2:
        func = setLanguage;
        break;
      case 3:
        func = setResolution;
        break;
      case 4:
        func = setSubtitles;
        break;
    }

    return func;
  };

  const selectedOption = (menuId: number) => {
    let id;

    switch (menuId) {
      case 1:
        id = units;
        break;
      case 2:
        id = language;
        break;
      case 3:
        id = resolution;
        break;
      case 4:
        id = subtitles;
        break;
    }

    return id;
  };

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <View style={styles.innerContainer}>
        <TVFocusGuideView autoFocus style={styles.section}>
          <MainMenu
            menus={menus}
            menu={menu}
            setMenu={setMenu}
            units={units}
            language={language}
            resolution={resolution}
            subtitles={subtitles}
          />
        </TVFocusGuideView>
        <TVFocusGuideView
          autoFocus
          style={[styles.section, {backgroundColor: COLORS.neutral[20]}]}>
          <Options
            key={menu}
            label={menus[menu - 1].label}
            options={menus[menu - 1].options}
            selectedOption={selectedOption(menu)!}
            setOption={setOption(menu)!}
          />
        </TVFocusGuideView>
      </View>

      <Sidebar active="Settings" />
    </TVFocusGuideView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.background[30],
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});
