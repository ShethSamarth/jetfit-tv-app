import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS, FONTS} from '../../constants';

interface OverlayProps {
  progress: number;
  duration: number;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setShowOverlay: (showOverlay: boolean) => void;
  showOptions: boolean;
  setQualityDrawerOpen: (qualityDrawerOpen: boolean) => void;
  setSubtitleDrawerOpen: (subtitleDrawerOpen: boolean) => void;
  setAudioDrawerOpen: (audioDrawerOpen: boolean) => void;
  onSliderValueChange: (value: number) => void;
}

const Overlay = ({
  progress,
  duration,
  isPlaying,
  setIsPlaying,
  setShowOverlay,
  showOptions,
  setQualityDrawerOpen,
  setSubtitleDrawerOpen,
  setAudioDrawerOpen,
  onSliderValueChange,
}: OverlayProps) => {
  const [focused, setFocused] = useState<string | null>(null);

  const timeInMinutes = Math.floor(progress / 60);
  const timeInSeconds = progress - timeInMinutes * 60;
  const time = `${timeInMinutes} : ${
    timeInSeconds > 9
      ? timeInSeconds.toFixed(0)
      : '0' + timeInSeconds.toFixed(0)
  }`;

  const durationInMinutes = Math.floor(duration / 60);
  const durationInSeconds = duration - durationInMinutes * 60;
  const totalDuration = `${durationInMinutes} : ${
    durationInSeconds > 9
      ? durationInSeconds.toFixed(0)
      : '0' + durationInSeconds.toFixed(0)
  }`;

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        hasTVPreferredFocus
        onBlur={() => setFocused(null)}
        onFocus={() => setFocused('play')}
        onPress={() => setIsPlaying(!isPlaying)}>
        {focused === 'play' ? (
          <Ionicons
            size={60}
            color={COLORS.neutral[80]}
            name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
          />
        ) : (
          <Ionicons
            size={40}
            color={COLORS.neutral[80]}
            name={isPlaying ? 'pause' : 'play'}
          />
        )}
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.tools}>
          <TouchableOpacity
            activeOpacity={1}
            onBlur={() => setFocused(null)}
            onFocus={() => setFocused('subtitles')}
            onPress={() => {
              setSubtitleDrawerOpen(true);
              setShowOverlay(false);
            }}
            style={[
              styles.icon,
              focused === 'subtitles' && {backgroundColor: COLORS.neutral[80]},
            ]}>
            <MaterialCommunityIcons
              size={24}
              name="subtitles"
              color={
                focused === 'subtitles'
                  ? COLORS.surface[30]
                  : COLORS.neutral[80]
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onBlur={() => setFocused(null)}
            onFocus={() => setFocused('quality')}
            onPress={() => {
              setQualityDrawerOpen(true);
              setShowOverlay(false);
            }}
            style={[
              styles.icon,
              focused === 'quality' && {backgroundColor: COLORS.neutral[80]},
            ]}>
            <MaterialCommunityIcons
              size={24}
              name="quality-high"
              color={
                focused === 'quality' ? COLORS.surface[30] : COLORS.neutral[80]
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onBlur={() => setFocused(null)}
            onFocus={() => setFocused('audio')}
            onPress={() => {
              setAudioDrawerOpen(true);
              setShowOverlay(false);
            }}
            style={[
              styles.icon,
              focused === 'audio' && {backgroundColor: COLORS.neutral[80]},
            ]}>
            <MaterialCommunityIcons
              size={24}
              name="music-note-eighth"
              color={
                focused === 'audio' ? COLORS.surface[30] : COLORS.neutral[80]
              }
            />
          </TouchableOpacity>
        </View>
      )}

      <Slider
        step={10}
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={progress}
        onValueChange={onSliderValueChange}
        thumbTintColor={COLORS.neutral[80]}
        maximumTrackTintColor={COLORS.neutral[80]}
        minimumTrackTintColor={COLORS.neutral[100]}
      />

      <View style={styles.time}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.timeText}>{totalDuration}</Text>
      </View>
    </TVFocusGuideView>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tools: {
    position: 'absolute',
    flexDirection: 'row',
    right: 30,
    bottom: 60,
    columnGap: 15,
  },
  icon: {
    padding: 5,
    borderRadius: 50,
  },
  slider: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 30,
    right: 30,
    bottom: 40,
  },
  time: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 30,
    right: 30,
    bottom: 20,
  },
  timeText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.neutral[80],
  },
});
