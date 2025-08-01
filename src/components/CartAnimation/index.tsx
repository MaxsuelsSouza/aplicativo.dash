import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CartAnimationProps {
  visible: boolean;
  onComplete: () => void;
}

export default function CartAnimation({ visible, onComplete }: CartAnimationProps) {
  const productFall = useRef(new Animated.Value(0)).current;
  const productOpacity = useRef(new Animated.Value(1)).current;
  const productScale = useRef(new Animated.Value(0.8)).current;
  const productRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset values
      productFall.setValue(0);
      productOpacity.setValue(1);
      productScale.setValue(0.8);
      productRotation.setValue(0);

      // Animation sequence - product falls to cart icon
      Animated.parallel([
        // Fall down animation
        Animated.timing(productFall, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        // Scale up and then shrink as it gets absorbed
        Animated.sequence([
          Animated.timing(productScale, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(productScale, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        // Rotation while falling
        Animated.timing(productRotation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        // Fade out at the end
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(productOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Trigger soft vibration when product is absorbed
        Vibration.vibrate(30);
        onComplete();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const productTranslateY = productFall.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 50], // Fall from above to cart icon
  });

  const productRotate = productRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Falling Product - positioned over cart icon */}
      <Animated.View
        style={[
          styles.product,
          {
            right: 24, // Position over cart icon (rightmost in ProductActions)
            bottom: 100, // Above ProductActions area
            transform: [
              { translateY: productTranslateY },
              { scale: productScale },
              { rotate: productRotate },
            ],
            opacity: productOpacity,
          },
        ]}
      >
        <Icon
          name="package-variant"
          size={28}
          color="#8B4513"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  product: {
    position: 'absolute',
  },
});