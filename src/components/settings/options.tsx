import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text} from 'react-native';

import Checkbox from './checkbox';

import {COLORS, FONTS} from '../../constants';

interface OptionsProps {
  label: string;
  options: {
    id: number;
    label: string;
  }[];
  selectedOption: number;
  setOption: (id: number | null) => void;
}

const Options = ({label, options, selectedOption, setOption}: OptionsProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>{label}</Text>

      <FlatList
        data={options}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <Checkbox
            id={item.id}
            label={item.label}
            selectedOption={selectedOption}
            setOption={setOption}
          />
        )}
      />
    </ScrollView>
  );
};

export default Options;

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
    paddingBottom: 16,
  },
  list: {
    rowGap: 12,
  },
});
