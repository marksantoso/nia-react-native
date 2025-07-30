import "dotenv/config";

export default {
  expo: {
    name: "rn-senior-dev-challenge",
    slug: "rn-senior-dev-challenge",
    version: "1.0.0",
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      WEATHER_API_BASE_URL: process.env.MEERSONS_API_URL,
      WEATHER_API_KEY: process.env.MEERSONS_API_KEY,
    },
  },
};
