import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeartAnimationProps {
  visible: boolean;
  onComplete: () => void;
}

export default function HeartAnimation({ visible, onComplete }: HeartAnimationProps) {
  const hearts = useRef([...Array(6)].map(() => ({
    translateY: useRef(new Animated.Value(0)).current,
    translateX: useRef(new Animated.Value(0)).current,
    opacity: useRef(new Animated.Value(1)).current,
    scale: useRef(new Animated.Value(0.5)).current,
  }))).current;

  const { width } = Dimensions.get('window');

  useEffect(() => {
    if (visible) {
      const animations = hearts.map((heart, index) => {
        // Reset values
        heart.translateY.setValue(0);
        heart.translateX.setValue(0);
        heart.opacity.setValue(1);
        heart.scale.setValue(0.5);

        const randomX = (Math.random() - 0.5) * 200; // -100 to 100
        const randomDelay = index * 100; // Stagger animations

        return Animated.parallel([
          Animated.sequence([
            Animated.delay(randomDelay),
            Animated.parallel([
              // Move up and fade out
              Animated.timing(heart.translateY, {
                toValue: -150,
                duration: 1500,
                useNativeDriver: true,
              }),
              // Move sideways randomly
              Animated.timing(heart.translateX, {
                toValue: randomX,
                duration: 1500,
                useNativeDriver: true,
              }),
              // Scale up then down
              Animated.sequence([
                Animated.timing(heart.scale, {
                  toValue: 1.2,
                  duration: 300,
                  useNativeDriver: true,
                }),
                Animated.timing(heart.scale, {
                  toValue: 0.8,
                  duration: 1200,
                  useNativeDriver: true,
                }),
              ]),
              // Fade out at the end
              Animated.sequence([
                Animated.delay(800),
                Animated.timing(heart.opacity, {
                  toValue: 0,
                  duration: 700,
                  useNativeDriver: true,
                }),
              ]),
            ]),
          ]),
        ]);
      });

      Animated.parallel(animations).start(() => {
        onComplete();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {hearts.map((heart, index) => (
        <Animated.View
          key={index}
          style={[
            styles.heart,
            {
              left: width / 2 - 15,
              transform: [
                { translateX: heart.translateX },
                { translateY: heart.translateY },
                { scale: heart.scale },
              ],
              opacity: heart.opacity,
            },
          ]}
        >
          <Icon
            name="heart"
            size={30}
            color="#E74C3C"
          />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1000,
  },
  heart: {
    position: 'absolute',
    top: 0,
  },
});