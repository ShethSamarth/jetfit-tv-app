import React, {useState} from 'react';
import {StyleSheet, TVFocusGuideView, View} from 'react-native';

import TabButton from './tab-button';
import MenuButton from './menu-button';
import SortByDrawer from './sort-by-drawer';
import FiltersDrawer from './filters-drawer';

const tabs = [
  {id: 1, label: 'Workout', route: 'Workout'},
  {id: 2, label: 'Series', route: 'Series'},
  {id: 3, label: 'Challenges', route: 'Challenges'},
  {id: 4, label: 'Routines', route: 'Routines'},
];

interface HeaderProps {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const Header = ({
  selectedTab,
  setSelectedTab,
  sortBy,
  setSortBy,
}: HeaderProps) => {
  const [sortByDrawerOpen, setSortByDrawerOpen] = useState<boolean>(false);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState<boolean>(false);

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <View style={styles.nav}>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            label={tab.label}
            hasTVPreferredFocus={tab.id === 1}
            isSelected={tab.route === selectedTab}
            onPress={() => setSelectedTab(tab.route)}
          />
        ))}
      </View>

      <View style={styles.nav}>
        <MenuButton
          label={`Sort by: ${sortBy}`}
          onPress={() => setSortByDrawerOpen(true)}
          drawer={
            <SortByDrawer
              open={sortByDrawerOpen}
              setOpen={setSortByDrawerOpen}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          }
        />
        <MenuButton
          label="Filters"
          onPress={() => setFiltersDrawerOpen(true)}
          drawer={
            <FiltersDrawer
              open={filtersDrawerOpen}
              setOpen={setFiltersDrawerOpen}
            />
          }
        />
      </View>
    </TVFocusGuideView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  nav: {
    flexDirection: 'row',
    columnGap: 10,
  },
});
