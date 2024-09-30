import {
  ScrollView,
  StyleSheet,
  TextInput,
  TVFocusGuideView,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Sidebar from '../../components/drawer/sidebar';
import Keyboard from '../../components/search/keyboard';

import {COLORS} from '../../constants';

const Search = () => {
  const [value, setValue] = useState<string>('');

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.search}>
          <TextInput
            value={value}
            placeholder="Search"
            style={styles.input}
            placeholderTextColor={COLORS.neutral[20]}
          />

          <Keyboard value={value} setValue={setValue} />
        </View>
      </ScrollView>

      <Sidebar active="Search" />
    </TVFocusGuideView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.background[30],
  },
  scrollContainer: {
    padding: 30,
    minHeight: '100%',
  },
  search: {
    columnGap: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  input: {
    width: '30%',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 14,
    color: COLORS.neutral[30],
    backgroundColor: COLORS.neutral[80],
  },
});
