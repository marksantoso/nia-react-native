import { ThemedText } from "@/components/ThemedText";
import { HealthRecommendations } from "./HealthRecommendations";
import { PollenCard } from "./PollenCard";
import { Pollutant, Pollutants } from "./Pollutants";

type HealthRecommendationType = {
  all: string;
  cardiovascular: string;
  elderly: string;
  family: string;
  pregnancy: string;
  respiratory: string;
  sport: string;
};

type PollenIndex = {
  color: string;
  value: number | string;
  qualification: string;
  description: string;
};

type PollenType = {
  name: string;
  value: number;
  unit: string;
  risk: string;
};

type PollenData = {
  index: PollenIndex;
  types: PollenType;
  health_recommendations: HealthRecommendationType;
  pollutants: Pollutant[];
};

export function Pollen({ pollen }: { pollen: string | null }) {
  if (!pollen) return null;

  let pollenData: PollenData;
  try {
    pollenData = JSON.parse(pollen);
  } catch (e: any) {
    console.error(e);
    return <ThemedText>Invalid pollen data</ThemedText>;
  }

  return (
    <>
      <PollenCard pollen={pollenData.index} />
      <Pollutants pollutants={pollenData.pollutants} />
      <HealthRecommendations
        recommendations={pollenData.health_recommendations}
      />
    </>
  );
}
