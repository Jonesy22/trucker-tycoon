import { v4 as uuid } from "uuid";
import cityMetadata from "../../config/cityMetadata.json";

interface CityMeta {
  name: string;
  loadCountBias: number[];
  distance: { [destination: string]: number };
}

interface CityMetaMap {
  [cityName: string]: CityMeta;
}

interface Load {
  id: string;
  origin: string;
  destination: string;
  rate: number;
  distance: number;
  deadhead: number;
  is_factorable: boolean;
}

const DESERT_CITIES = ["Denver, CO"];

const LOWEST_RATE_PER_MILE = 0.5;
const HIGHEST_RATE_PER_MILE = 3.0;
const MIN_DEADHEAD = 10;
const MAX_DEADHEAD = 550;
const CITY_METADATA = cityMetadata as CityMetaMap;

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getDistance(city: string, desintation: string): number {
  return CITY_METADATA[city].distance[desintation];
}

function getRate(distance: number): number {
  const ratePerMile = getRandomFloat(
    LOWEST_RATE_PER_MILE,
    HIGHEST_RATE_PER_MILE
  );
  return Math.floor(ratePerMile * distance);
}

function createLoad(origin: string, destination: string): Load {
  const distance = getDistance(origin, destination);
  const rate = getRate(distance);
  const deadhead = getRandomNumber(MIN_DEADHEAD, MAX_DEADHEAD);
  const is_factorable = getRandomNumber(1, 100) % 4 === 0;

  return {
    id: uuid(),
    origin: origin,
    destination: destination,
    rate: rate,
    distance: distance,
    deadhead: deadhead,
    is_factorable: is_factorable,
  };
}

function getRandomDestinationsAndDistancesFromDesertCity(
  desertCityMetadata: CityMeta
) {
  const destinations = Object.keys(desertCityMetadata.distance);
  const randomIndex = Math.floor(Math.random() * destinations.length);
  const randomDestination = destinations[randomIndex];
  return {
    destination: randomDestination,
    distance: desertCityMetadata.distance[randomDestination],
  };
}

function getLoadsFromDesertCity(desertCity: string) {
  const desertCityMetadata: CityMeta = CITY_METADATA[desertCity];
  if (Math.random() <= desertCityMetadata.loadCountBias[0]) {
    const destinationMetadata =
      getRandomDestinationsAndDistancesFromDesertCity(desertCityMetadata);
    return {
      id: uuid(),
      origin: desertCity,
      destination: destinationMetadata.destination,
      distance: destinationMetadata.distance,
      rate: getRate(destinationMetadata.distance),
      deadhead: getRandomNumber(MIN_DEADHEAD, MAX_DEADHEAD),
      is_factorable: false,
    };
  } else {
    return null;
  }
}

export function getCityNames(): string[] {
  return Object.keys(CITY_METADATA);
}

export function getLoadsFromOriginCityState(origin: string): Load[] {
  let loads = [];
  if (DESERT_CITIES.includes(origin)) {
    const loadFromDesertCity = getLoadsFromDesertCity(origin);
    if (loadFromDesertCity) {
      loads = [];
      loads.push(loadFromDesertCity);
    }
  } else {
    for (const destination of getCityNames()) {
      if (origin !== destination) {
        loads.push(createLoad(origin, destination));
      }
    }
  }

  return loads;
}
