import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TVFocusGuideView,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import React, {useEffect, useRef, useState} from 'react';
import RadialGradient from 'react-native-radial-gradient';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {COLORS, FONTS} from '../constants';

interface DialogProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

const zoomIn = {
  0: {transform: [{scale: 1}]},
  1: {transform: [{scale: 1.05}]},
};

const zoomOut = {
  0: {transform: [{scale: 1.05}]},
  1: {transform: [{scale: 1}]},
};

const Dialog = ({modalOpen, setModalOpen}: DialogProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const btn1 = useRef<Animatable.View>(null);
  const btn2 = useRef<Animatable.View>(null);

  const [focused1, setFocused1] = useState<boolean>(false);
  const [focused2, setFocused2] = useState<boolean>(false);

  useEffect(() => {
    if (focused1) {
      btn1.current?.animate(zoomIn);
    } else {
      btn1.current?.animate(zoomOut);
    }
  }, [focused1]);

  useEffect(() => {
    if (focused2) {
      btn2.current?.animate(zoomIn);
    } else {
      btn2.current?.animate(zoomOut);
    }
  }, [focused2]);

  return (
    <Modal
      transparent
      visible={modalOpen}
      animationType="slide"
      onRequestClose={() => setModalOpen(!modalOpen)}>
      <TVFocusGuideView autoFocus style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/list/1.png')}
            />
            <RadialGradient
              radius={350}
              stops={[0.3, 0.75]}
              colors={['rgba(0,0,0,0)', '#272B29']}
              style={[StyleSheet.absoluteFill, styles.filter]}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>Total-body balance pilates</Text>
            <Text style={styles.subTitle}>34 Min | Intensity ••••</Text>
            <Text style={styles.description}>
              Andrea's signature low-impact, total-body class in just 30
              minutes. Hit every muscle group with barre and pilates moves that
              leave you feeling strong, refreshed, and energized
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              activeOpacity={1}
              hasTVPreferredFocus
              onFocus={() => setFocused1(true)}
              onBlur={() => setFocused1(false)}
              onPress={() => {
                setModalOpen(!modalOpen);
                navigation.push('MoreOptions');
              }}>
              <Animatable.View
                ref={btn1}
                duration={300}
                style={[styles.btnDefault, focused1 && styles.btnFocused]}>
                <Feather size={18} name="play" color={COLORS.background[30]} />
                <Text style={styles.btnDefaultText}>Start workout</Text>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              onFocus={() => setFocused2(true)}
              onBlur={() => setFocused2(false)}
              onPress={() => setModalOpen(false)}>
              <Animatable.View
                ref={btn2}
                duration={300}
                style={[styles.btnOutline, focused2 && styles.btnFocused]}>
                <Feather
                  size={18}
                  name="minus-circle"
                  color={COLORS.neutral[80]}
                />
                <Text style={styles.btnOutlineText}>Remove from favorites</Text>
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </View>
      </TVFocusGuideView>
    </Modal>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 360,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#272B29',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  filter: {
    position: 'absolute',
    top: -290,
  },
  details: {
    rowGap: 8,
    marginTop: -40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    color: COLORS.neutral[80],
    fontFamily: FONTS.semibold,
  },
  subTitle: {
    fontSize: 12,
    opacity: 0.6,
    color: COLORS.neutral[80],
    fontFamily: FONTS.regular,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
    color: COLORS.surface[80],
    fontFamily: FONTS.regular,
  },
  btnContainer: {
    rowGap: 12,
    padding: 24,
  },
  btnDefault: {
    flexDirection: 'row',
    columnGap: 7,
    borderWidth: 2,
    borderRadius: 90,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.neutral[80],
    backgroundColor: COLORS.neutral[80],
  },
  btnOutline: {
    flexDirection: 'row',
    columnGap: 7,
    borderWidth: 2,
    borderRadius: 90,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.neutral[80],
  },
  btnDefaultText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.neutral[30],
  },
  btnOutlineText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.neutral[80],
  },
  btnFocused: {
    transform: [{scale: 1.05}],
  },
});
