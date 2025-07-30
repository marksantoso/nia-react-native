import { SPACING } from '@/constants/Dimensions';
import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

type ContainerProps = PropsWithChildren<{
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  scrollable?: boolean;
}>;

export const Container = ({ 
  children, 
  style,
  contentStyle,
  scrollable = true, // Most screens need scrolling, so default to true
}: ContainerProps) => {
  const Content = scrollable ? ScrollView : View;

  return (
    <View style={[styles.container, style]}>
      <Content style={[styles.content, contentStyle]}>
        {children}
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    elevation: 2,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 100, // Extra padding for tab bar/safe area
  },
});