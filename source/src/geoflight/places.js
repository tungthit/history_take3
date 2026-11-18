// Scenic places for the autopilot (the "Fly to…" list and random flight).
// This is an English-learning app, so the speaker reads the English name.
export const PLACES = [
  { id: 'halong', e: '🏝️', en: 'Ha Long Bay', lat: 20.9, lon: 107.1, region: 'Asia' },
  { id: 'hanoi', e: '🏯', en: 'Hanoi', lat: 21.03, lon: 105.85, region: 'Asia' },
  { id: 'saigon', e: '🌆', en: 'Ho Chi Minh City', lat: 10.78, lon: 106.7, region: 'Asia' },
  { id: 'fuji', e: '🗻', en: 'Mount Fuji', lat: 35.36, lon: 138.73, region: 'Asia' },
  { id: 'wall', e: '🧱', en: 'The Great Wall', lat: 40.43, lon: 116.57, region: 'Asia' },
  { id: 'everest', e: '🏔️', en: 'Mount Everest', lat: 27.99, lon: 86.93, region: 'Asia' },
  { id: 'taj', e: '🕌', en: 'Taj Mahal', lat: 27.17, lon: 78.04, region: 'Asia' },
  { id: 'bali', e: '🌺', en: 'Bali', lat: -8.4, lon: 115.19, region: 'Asia' },
  { id: 'maldives', e: '🐠', en: 'The Maldives', lat: 3.2, lon: 73.22, region: 'Asia' },
  { id: 'dubai', e: '🏙️', en: 'Dubai', lat: 25.2, lon: 55.27, region: 'Asia' },
  { id: 'giza', e: '🔺', en: 'Pyramids of Giza', lat: 29.98, lon: 31.13, region: 'Africa' },
  { id: 'sahara', e: '🐪', en: 'Sahara Desert', lat: 23.4, lon: 12.0, region: 'Africa' },
  { id: 'kilimanjaro', e: '🦒', en: 'Mount Kilimanjaro', lat: -3.07, lon: 37.35, region: 'Africa' },
  { id: 'capetown', e: '🌊', en: 'Cape of Good Hope', lat: -34.36, lon: 18.47, region: 'Africa' },
  { id: 'madagascar', e: '🐒', en: 'Madagascar', lat: -19.0, lon: 46.7, region: 'Africa' },
  { id: 'paris', e: '🗼', en: 'Eiffel Tower, Paris', lat: 48.86, lon: 2.29, region: 'Europe' },
  { id: 'london', e: '🎡', en: 'London', lat: 51.5, lon: -0.12, region: 'Europe' },
  { id: 'rome', e: '🏛️', en: 'Rome', lat: 41.9, lon: 12.49, region: 'Europe' },
  { id: 'santorini', e: '⛪', en: 'Santorini', lat: 36.4, lon: 25.43, region: 'Europe' },
  { id: 'alps', e: '🏔️', en: 'The Alps', lat: 46.5, lon: 9.8, region: 'Europe' },
  { id: 'iceland', e: '🌋', en: 'Iceland', lat: 64.9, lon: -18.6, region: 'Europe' },
  { id: 'fjords', e: '⛵', en: 'Norwegian Fjords', lat: 61.1, lon: 6.8, region: 'Europe' },
  { id: 'newyork', e: '🗽', en: 'New York', lat: 40.71, lon: -74.0, region: 'Americas' },
  { id: 'canyon', e: '🏜️', en: 'Grand Canyon', lat: 36.1, lon: -112.1, region: 'Americas' },
  { id: 'niagara', e: '💦', en: 'Niagara Falls', lat: 43.08, lon: -79.07, region: 'Americas' },
  { id: 'hawaii', e: '🌴', en: 'Hawaii', lat: 19.9, lon: -155.6, region: 'Americas' },
  { id: 'rio', e: '🎉', en: 'Rio de Janeiro', lat: -22.95, lon: -43.21, region: 'Americas' },
  { id: 'machu', e: '🦙', en: 'Machu Picchu', lat: -13.16, lon: -72.55, region: 'Americas' },
  { id: 'amazon', e: '🌳', en: 'Amazon Rainforest', lat: -3.4, lon: -62.2, region: 'Americas' },
  { id: 'patagonia', e: '🧊', en: 'Patagonia', lat: -50.5, lon: -73.0, region: 'Americas' },
  { id: 'sydney', e: '🎭', en: 'Sydney Opera House', lat: -33.86, lon: 151.21, region: 'Oceania' },
  { id: 'reef', e: '🐢', en: 'Great Barrier Reef', lat: -18.3, lon: 147.7, region: 'Oceania' },
  { id: 'uluru', e: '🪨', en: 'Uluru', lat: -25.34, lon: 131.04, region: 'Oceania' },
  { id: 'nz', e: '🥝', en: 'New Zealand', lat: -43.5, lon: 170.5, region: 'Oceania' }
];
export const REGIONS = { Asia: 'Asia', Africa: 'Africa', Europe: 'Europe', Americas: 'Americas', Oceania: 'Oceania' };

// Rough names for the open sea, so the card is never empty over water.
export function oceanName(lat, lon) {
  if (lat > 66) return { en: 'Arctic Ocean' };
  if (lat < -60) return { en: 'Southern Ocean' };
  if (lat > 30 && lat < 46 && lon > -6 && lon < 36) return { en: 'Mediterranean Sea' };
  if (lat > 0 && lat < 24 && lon > 99 && lon < 121) return { en: 'East Sea' };
  if (lat > 12 && lat < 30 && lon > 32 && lon < 44) return { en: 'Red Sea' };
  if (lat > 8 && lat < 30 && lon > -98 && lon < -60) return { en: 'Caribbean Sea' };
  if (lat > -60 && lat < 30 && lon > 20 && lon < 120 && !(lat > 0 && lon > 100)) return { en: 'Indian Ocean' };
  if (lon > -70 && lon < 20) return { en: 'Atlantic Ocean' };
  if (lon >= -100 && lon <= -70 && lat > 8) return { en: 'Atlantic Ocean' };
  return { en: 'Pacific Ocean' };
}
