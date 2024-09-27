import {
  Image,
  StyleSheet,
  Text,
  useTVEventHandler,
  View,
  type HWEvent,
  type ImageSourcePropType,
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import RadialGradient from 'react-native-radial-gradient';

import {COLORS, FONTS} from '../../constants';

interface CarouselItemProps {
  data: {
    id: number;
    author: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
  };
  focused: boolean;
}

const CarouselItem = ({data, focused}: CarouselItemProps) => {
  const [animation, setAnimation] = useState<
    'bounceInLeft' | 'bounceInRight' | undefined
  >('bounceInRight');

  const handleAnimation = (event: HWEvent) => {
    if (!focused || event.eventType === 'down') {
      setAnimation(undefined);
      return;
    }

    setAnimation(
      event.eventType === 'right' ? 'bounceInRight' : 'bounceInLeft',
    );
  };

  useTVEventHandler(handleAnimation);

  return (
    <Animatable.View animation={animation} style={styles.container}>
      <View style={styles.bgImg}>
        <Image style={styles.image} source={data.image} />
        <RadialGradient
          radius={350}
          stops={[0.3, 0.75]}
          style={[StyleSheet.absoluteFill, styles.filter]}
          colors={[COLORS.background[90], COLORS.neutral[30]]}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.author}>{data.author}</Text>

        <Text style={styles.title}>{data.title}</Text>

        <Text numberOfLines={2} style={styles.description}>
          {data.description}
        </Text>

        <View style={styles.btn}>
          <Text style={styles.btnText}>
            <Feather size={20} name="play" />
          </Text>
          <Text style={styles.btnText}>Start Session</Text>
        </View>
      </View>
    </Animatable.View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 30,
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 350,
    aspectRatio: 1.5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  filter: {
    position: 'absolute',
    top: -100,
  },
  details: {
    maxWidth: '50%',
    alignItems: 'baseline',
  },
  author: {
    fontSize: 10,
    fontFamily: FONTS.regular,
    color: COLORS.surface[80],
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    color: COLORS.neutral[80],
  },
  description: {
    fontSize: 12,
    paddingVertical: 15,
    fontFamily: FONTS.regular,
    color: COLORS.surface[80],
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    backgroundColor: COLORS.neutral[90],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 90,
  },
  btnText: {
    fontSize: 12,
    color: COLORS.neutral[30],
    fontFamily: FONTS.semibold,
  },
});
