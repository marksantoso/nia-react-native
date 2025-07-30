
import { SPACING } from '@/constants/Dimensions';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../ui/Card';

type WeatherParameter = {
  value: number;
  unit: string;
};

type WeatherParametersProps = {
  parameters: {
    apparent_temperature: WeatherParameter;
    humidity: WeatherParameter;
    cloud_cover: WeatherParameter;
    precipitations: WeatherParameter;
    pressure: WeatherParameter;
    wind_speed: WeatherParameter;
    wind_direction: WeatherParameter;
    [key: string]: WeatherParameter;
  };
};

type ParameterRowProps = {
  label: string;
  value: number;
  unit: string;
};

const ParameterRow: React.FC<ParameterRowProps> = ({ label, value, unit }) => (
  <View style={styles.parameterRow}>
    <Text style={styles.parameterLabel}>{label}</Text>
    <Text style={styles.parameterValue}>
      {typeof value === 'number' ? value.toFixed(1) : value} {unit}
    </Text>
  </View>
);

export const WeatherParameters: React.FC<WeatherParametersProps> = ({ parameters }) => {
  return (
    <Card style={styles.parameters}>
      <ParameterRow label="Apparent Temp" value={parameters.apparent_temperature.value} unit={parameters.apparent_temperature.unit} />
      <ParameterRow label="Humidity" value={parameters.humidity.value} unit={parameters.humidity.unit} />
      <ParameterRow label="Cloud Cover" value={parameters.cloud_cover.value} unit={parameters.cloud_cover.unit} />
      <ParameterRow label="Precipitations" value={parameters.precipitations.value} unit={parameters.precipitations.unit} />
      <ParameterRow label="Pressure" value={parameters.pressure.value} unit={parameters.pressure.unit} />
      <ParameterRow label="Wind Speed" value={parameters.wind_speed.value} unit={parameters.wind_speed.unit} />
      <ParameterRow label="Wind Direction" value={parameters.wind_direction.value} unit={parameters.wind_direction.unit} />
    </Card>
  );
};

const styles = StyleSheet.create({
  parameters: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  parameterLabel: {
    fontSize: 16,
    color: '#333',
  },
  parameterValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
});
