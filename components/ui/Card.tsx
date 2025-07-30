import React from 'react';
import { StyleSheet, TouchableOpacity, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
} & ViewProps;

export function Card({ children, style, onPress, ...rest }: CardProps) {

  if (onPress) {
  return (
      <TouchableOpacity style={[styles.card, style]} onPress={onPress} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
