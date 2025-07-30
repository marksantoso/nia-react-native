export interface City {
  id: string;
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  temperature?: number;
  humidity?: number;
  precipitation?: number;
}

export const worldCities: City[] = [
  {
    id: "nyc",
    name: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.0060,
    imageUrl: require("@/assets/images/banners/new-york.jpg")
  },
  {
    id: "ldn",
    name: "London",
    country: "United Kingdom",
    latitude: 51.5074,
    longitude: -0.1278,
    imageUrl: require("@/assets/images/banners/london.jpg")
  },
  {
    id: "tky",
    name: "Tokyo",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    imageUrl: require("@/assets/images/banners/tokyo.jpg")
  },
  {
    id: "prs",
    name: "Paris",
    country: "France",
    latitude: 48.8566,
    longitude: 2.3522,
    imageUrl: require("@/assets/images/banners/paris.jpg")
  },
  {
    id: "syd",
    name: "Sydney",
    country: "Australia",
    latitude: -33,
    longitude: 151,
    imageUrl: require("@/assets/images/banners/sydney.jpg")
  },
  {
    id: "dxb",
    name: "Dubai",
    country: "United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    imageUrl: require("@/assets/images/banners/dubai.jpg")
  },
  {
    id: "sin",
    name: "Singapore",
    country: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    imageUrl: require("@/assets/images/banners/singapore.jpg")
  },
  {
    id: "hkg",
    name: "Hong Kong",
    country: "China",
    latitude: 22.3193,
    longitude: 114.1694,
    imageUrl: require("@/assets/images/banners/hongkong.jpg")
  },
  {
    id: "ber",
    name: "Berlin",
    country: "Germany",
    latitude: 52.5200,
    longitude: 13.4050,
    imageUrl: require("@/assets/images/banners/berlin.jpg")
  },
  {
    id: "mow",
    name: "Moscow",
    country: "Russia",
    latitude: 55.7558,
    longitude: 37.6173,
    imageUrl: require("@/assets/images/banners/moscow.jpg")
  },
  {
    id: "yto",
    name: "Toronto",
    country: "Canada",
    latitude: 43.6532,
    longitude: -79.3832,
    imageUrl: require("@/assets/images/banners/toronto.jpg")
  },
  {
    id: "sao",
    name: "São Paulo",
    country: "Brazil",
    latitude: -23.5505,
    longitude: -46.6333,
    imageUrl: require("@/assets/images/banners/saopaulo.jpg")
  },
  {
    id: "bom",
    name: "Mumbai",
    country: "India",
    latitude: 19.0760,
    longitude: 72.8777,
    imageUrl: require("@/assets/images/banners/mumbai.jpg")
  },
  {
    id: "sha",
    name: "Shanghai",
    country: "China",
    latitude: 31.2304,
    longitude: 121.4737,
    imageUrl: require("@/assets/images/banners/shanghai.jpg")
  },
  {
    id: "mex",
    name: "Mexico City",
    country: "Mexico",
    latitude: 19.4326,
    longitude: -99.1332,
    imageUrl: require("@/assets/images/banners/mexicocity.jpg")
  },
  {
    id: "cai",
    name: "Cairo",
    country: "Egypt",
    latitude: 30.0444,
    longitude: 31.2357,
    imageUrl: require("@/assets/images/banners/cairo.jpg")
  },
  {
    id: "sel",
    name: "Seoul",
    country: "South Korea",
    latitude: 37.5665,
    longitude: 126.9780,
    imageUrl: require("@/assets/images/banners/seoul.jpg")
  },
  {
    id: "rom",
    name: "Rome",
    country: "Italy",
    latitude: 41.9028,
    longitude: 12.4964,
    imageUrl: require("@/assets/images/banners/rome.jpg")
  },
  {
    id: "ist",
    name: "Istanbul",
    country: "Turkey",
    latitude: 41.0082,
    longitude: 28.9784,
    imageUrl: require("@/assets/images/banners/istanbul.jpg")
  },
  {
    id: "bkk",
    name: "Bangkok",
    country: "Thailand",
    latitude: 13.7563,
    longitude: 100.5018,
    imageUrl: require("@/assets/images/banners/bangkok.jpg")
  }
];