import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SortBy } from './types/sort.types';
 

interface RangeSliderProps {
  sortBy: SortBy;
  valueRange: [number, number];
  currentMax: number;
  onMaxValueChange: (value: number) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  sortBy,
  valueRange,
  currentMax,
  onMaxValueChange,
}) => {
  const colorScheme = useColorScheme()

  const dynamicStyles = {
    marker: {
      backgroundColor: Colors[colorScheme ?? 'light'].primary
    },
    selected: {
      backgroundColor: Colors[colorScheme ?? 'light'].primary
    }
  }

  return (
    <View style={styles.container}>
      <MultiSlider
        min={0}
        max={valueRange[1]}
        values={[currentMax]}
        containerStyle={styles.sliderContainer}
        step={0.1}
        sliderLength={Dimensions.get('window').width - 50}
        markerStyle={{...dynamicStyles.marker, ...styles.marker}}
        trackStyle={styles.track}
        onValuesChange={(values) => onMaxValueChange(values[0])}
        selectedStyle={{...dynamicStyles.selected}}
        unselectedStyle={styles.unselected}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          Filter by max {sortBy}: {currentMax.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  sliderContainer: {
    height: 20,
    width: '100%',
  },
  marker: {
    marginTop: 3,
    width: 20,
    height: 20,
    borderRadius: 12,
  },
  track: {
    height: 5,
  },
  unselected: {
    backgroundColor: 'lightgray',
  },
  labelContainer: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});