# Health Environment Tracker

A React Native mobile application that helps users track environmental conditions and their impact on health activities. Features user authentication, weather data integration, and personalized activity recommendations.

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Expo CLI (`yarn global add @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo Go app on your mobile device (optional, for testing on physical device)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rn-senior-dev-challenge
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
MEERSONS_API_URL=your_weather_api_url
MEERSONS_API_KEY=your_weather_api_key
```

## Running the Project

### Start the development server:

```bash
yarn start
# or
expo start
```

### Run on specific platforms:

```bash
# iOS Simulator
yarn ios

# Android Emulator
yarn android

# Web Browser
yarn web
```

### Scan QR Code

After running `yarn start`, scan the QR code with:

- **iOS**: Camera app or Expo Go app
- **Android**: Expo Go app

## Available Scripts

- `yarn start` - Start the Expo development server
- `yarn ios` - Run on iOS simulator
- `yarn android` - Run on Android emulator
- `yarn web` - Run in web browser
- `yarn lint` - Run ESLint
- `yarn test` - Run tests
- `yarn format` - Format code with Prettier

**How It's Applied Here:**

- API logic is encapsulated in service and hook files (e.g., `hooks/api/weather/useWeather.ts`).
- State management is handled with stores (e.g., Zustand) and React Query, keeping UI and data logic separate.
- UI components are focused on rendering and user interaction, delegating data fetching and business logic to hooks and services.

This structure helps keep the project organized and maintainable as it grows.

## Tech Stack

- React Native with Expo
- TypeScript
- Expo Router for navigation
- Firebase Authentication
- React Query for API state management
- Zustand for state management
- React Native Reanimated for animations
- Clean architecture

## Features

- User authentication (login/register)
- Weather data integration
- Location-based environmental tracking
- Sortable and filterable weather cards
- Responsive design for multiple screen sizes
