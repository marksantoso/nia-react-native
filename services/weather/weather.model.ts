// Base parameter type used across all endpoints
export interface MeersensParameter {
  value: number;
  unit: string;
}

// Weather-specific parameter with additional fields
export interface IWeatherParameter extends MeersensParameter {
  qualification?: string;
  description?: string;
  icon?: string;
}

// Common structure for all Meersens API responses
interface IMeersensBase {
  datetime: string;
  index: {
    value: number;
    color: string;
    qualification?: string;
  };
  health_recommendations: string[];
}

// Weather endpoint response
export interface IWeather extends IMeersensBase {
  parameters: {
    temperature: MeersensParameter;
    apparent_temperature: MeersensParameter;
    humidity: MeersensParameter;
    cloud_cover: MeersensParameter;
    precipitations: MeersensParameter;
    pressure: MeersensParameter;
    wind_speed: MeersensParameter;
    wind_direction: MeersensParameter;
    ww?: IWeatherParameter; // Weather conditions
  };
}

// Air Quality endpoint response
export interface IAirQuality extends IMeersensBase {
  parameters: {
    pm25: MeersensParameter;
    pm10: MeersensParameter;
    no2: MeersensParameter;
    o3: MeersensParameter;
    so2: MeersensParameter;
    co: MeersensParameter;
  };
}

// Pollen endpoint response
export interface IPollen extends IMeersensBase {
  parameters: {
    grass_pollen: MeersensParameter;
    tree_pollen: MeersensParameter;
    weed_pollen: MeersensParameter;
  };
}
