import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, {useEffect, useMemo, useRef, useState} from 'react';

import {type TextTrackType} from '../../screens/video-player';

import {COLORS, FONTS} from '../../constants';

interface SubtitleDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  textTracks: TextTrackType[];
  selectedTextTrack: TextTrackType | null;
  setSelectedTextTrack: (text: TextTrackType) => void;
}

const SubtitleDrawer = ({
  open,
  setOpen,
  textTracks,
  selectedTextTrack,
  setSelectedTextTrack,
}: SubtitleDrawerProps) => {
  const drawerRef = useRef<Animatable.View>(null);

  const [focused, setFocused] = useState<number | null>(null);

  const data = useMemo(() => textTracks, [textTracks]);

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
          <Text style={styles.header}>Select Subtitle</Text>

          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={1}
                key={item.index}
                onBlur={() => setFocused(null)}
                onFocus={() => setFocused(item.index)}
                hasTVPreferredFocus={item.index === 0}
                onPress={() => {
                  setSelectedTextTrack(item);
                  setOpen(false);
                }}
                style={[
                  styles.btn,
                  focused === item.index && styles.btnFocused,
                ]}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.btnText,
                    focused === item.index && styles.btnFocusedText,
                  ]}>
                  {item.title}
                </Text>

                <View style={styles.radio}>
                  {selectedTextTrack?.index === item.index && (
                    <View style={styles.active} />
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </Animatable.View>
      </TVFocusGuideView>
    </Modal>
  );
};

export default SubtitleDrawer;

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
