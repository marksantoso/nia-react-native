import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const Spinner = ({ size = 50 }: { size?: number }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <AntDesign name="loading1" size={size} color="black" />
    </Animated.View>
  );
};
