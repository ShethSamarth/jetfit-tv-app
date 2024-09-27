import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useTVEventHandler,
  View,
  type HWEvent,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video, {type OnLoadData} from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Overlay from '../components/video-player/overlay';
import AudioDrawer from '../components/video-player/audio-drawer';
import QualityDrawer from '../components/video-player/quality-drawer';
import SubtitleDrawer from '../components/video-player/subtitle-drawer';

import {COLORS, FONTS} from '../constants';

export type AudioTrackType = {
  index: number;
  title: string;
  language: string;
  type: string;
};

export type TextTrackType = {
  index: number;
  title: string;
  language: string;
  type: string;
};

export type VideoTrackType = {
  bitrate: number;
  codecs: string;
  width: number;
  height: number;
  trackId: string;
};

interface Data extends OnLoadData {
  trackId: string;
}

const VideoPlayer = () => {
  const videoRef = useRef<any>(null);

  const [error, setError] = useState(null);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [changingProgress, setChangingProgress] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [textTracks, setTextTracks] = useState<TextTrackType[]>([]);
  const [audioTracks, setAudioTracks] = useState<AudioTrackType[]>([]);
  const [videoTracks, setVideoTracks] = useState<VideoTrackType[]>([]);
  const [selectedTextTrack, setSelectedTextTrack] =
    useState<TextTrackType | null>(null);
  const [selectedAudioTrack, setSelectedAudioTrack] =
    useState<AudioTrackType | null>(null);
  const [selectedVideoTrack, setSelectedVideoTrack] =
    useState<VideoTrackType | null>(null);

  const [qualityDrawerOpen, setQualityDrawerOpen] = useState<boolean>(false);
  const [subtitleDrawerOpen, setSubtitleDrawerOpen] = useState<boolean>(false);
  const [audioDrawerOpen, setAudioDrawerOpen] = useState<boolean>(false);

  const [showOverlay, setShowOverlay] = useState(false);
  const [mouseEvent, setMouseEvent] = useState<number>(0);

  useEffect(() => {
    const overlay = setTimeout(() => {
      if (mouseEvent) {
        setShowOverlay(false);
      }
    }, 5000);

    return () => clearTimeout(overlay);
  }, [mouseEvent]);

  const handleTvEvent = (event: HWEvent) => {
    if (isBuffering || error) {
      return;
    }

    if (event.eventType !== 'focus' && event.eventType !== 'blur') {
      setMouseEvent(prev => prev + 1);
      if (!showOverlay) {
        setShowOverlay(true);
      }
    }
  };

  useTVEventHandler(handleTvEvent);

  const onLoad = (data: Data) => {
    setTextTracks(data.textTracks);
    setAudioTracks(data.audioTracks);
    setVideoTracks(data.videoTracks);
    setSelectedVideoTrack(
      data.videoTracks.find(item => item.trackId === data.trackId) ?? null,
    );
    setDuration(data.duration);
    setSelectedAudioTrack(data.audioTracks[0]);
    setSelectedTextTrack(data.textTracks[0]);
    setIsPlaying(true);
  };

  const onSliderValueChange = (value: number) => {
    setIsPlaying(false);
    setProgress(value);
    setChangingProgress(true);
  };

  useEffect(() => {
    if (changingProgress) {
      const seeking = setTimeout(() => {
        videoRef.current?.seek(progress);
        setChangingProgress(false);
        setIsPlaying(true);
      }, 2000);

      return () => clearTimeout(seeking);
    }
  }, [changingProgress, progress]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        maxBitRate={0}
        onLoad={onLoad}
        resizeMode="contain"
        posterResizeMode="cover"
        style={styles.container}
        ignoreSilentSwitch="ignore"
        onError={(e: any) => setError(e.error)}
        onProgress={e => setProgress(e.currentTime)}
        paused={!isPlaying && selectedVideoTrack !== null}
        onBuffer={(e: any) => setIsBuffering(e.isBuffering)}
        source={{
          uri: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8',
        }}
        poster="https://www.clarin.com/img/2024/08/29/Vdz5baoA-_1256x620__1.jpg"
        selectedTextTrack={{
          type: 'index',
          value: selectedTextTrack?.index ?? 0,
        }}
        selectedAudioTrack={{
          type: 'index',
          value: selectedAudioTrack?.index ?? 0,
        }}
        selectedVideoTrack={
          selectedVideoTrack?.height
            ? {
                type: 'resolution',
                value: selectedVideoTrack.height,
              }
            : {type: 'auto'}
        }
      />

      {error && (
        <View style={styles.center}>
          <MaterialIcons
            size={30}
            name="error-outline"
            color={COLORS.neutral[90]}
          />
          <Text style={styles.error}>Error playing video</Text>
        </View>
      )}

      {isBuffering && !error && (
        <ActivityIndicator
          size={40}
          style={styles.center}
          color={COLORS.neutral[90]}
        />
      )}

      {!isBuffering && !error && showOverlay && (
        <Overlay
          progress={progress}
          duration={duration}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setShowOverlay={setShowOverlay}
          showOptions={
            selectedTextTrack !== null &&
            selectedAudioTrack !== null &&
            selectedVideoTrack !== null
          }
          setQualityDrawerOpen={setQualityDrawerOpen}
          setSubtitleDrawerOpen={setSubtitleDrawerOpen}
          setAudioDrawerOpen={setAudioDrawerOpen}
          onSliderValueChange={onSliderValueChange}
        />
      )}

      <QualityDrawer
        open={qualityDrawerOpen}
        setOpen={setQualityDrawerOpen}
        videoTracks={videoTracks}
        selectedVideoTrack={selectedVideoTrack}
        setSelectedVideoTrack={setSelectedVideoTrack}
      />

      <SubtitleDrawer
        open={subtitleDrawerOpen}
        setOpen={setSubtitleDrawerOpen}
        textTracks={textTracks}
        selectedTextTrack={selectedTextTrack}
        setSelectedTextTrack={setSelectedTextTrack}
      />

      <AudioDrawer
        open={audioDrawerOpen}
        setOpen={setAudioDrawerOpen}
        audioTracks={audioTracks}
        selectedAudioTrack={selectedAudioTrack}
        setSelectedAudioTrack={setSelectedAudioTrack}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLORS.background[30],
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    padding: 5,
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
  },
});
