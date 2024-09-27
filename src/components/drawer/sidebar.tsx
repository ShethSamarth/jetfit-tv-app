import React, {useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, TouchableOpacity, TVFocusGuideView} from 'react-native';

import Drawer from './drawer';

import {COLORS} from '../../constants';

interface SidebarProps {
  active: 'Search' | 'Home' | 'Training' | 'Favourites' | 'Settings';
}

const routes = [
  {id: 0, name: 'Search', icon: 'search', route: 'Search'},
  {id: 1, name: 'Home', icon: 'home', route: 'Home'},
  {id: 2, name: 'Training', icon: 'barbell', route: 'Training'},
  {id: 3, name: 'Favourites', icon: 'heart', route: 'Favourites'},
  {id: 4, name: 'Settings', icon: 'settings-sharp', route: 'Settings'},
];

const Sidebar = ({active}: SidebarProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <TVFocusGuideView autoFocus style={styles.container}>
        {routes.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            onFocus={() => setDrawerOpen(true)}
            style={[styles.icons, active === item.name && styles.activeIcon]}>
            <IonIcons
              size={24}
              name={item.icon}
              color={
                active === item.name ? COLORS.secondary[90] : COLORS.surface[80]
              }
            />
          </TouchableOpacity>
        ))}
      </TVFocusGuideView>
      <Drawer
        active={active}
        routes={routes}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />
    </>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  icons: {
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderColor: 'rgba(0,0,0,0)',
  },
  activeIcon: {
    backgroundColor: COLORS.secondary[30],
  },
});
