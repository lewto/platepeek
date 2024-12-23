import { UtensilsCrossed, CalendarClock } from 'lucide-react';

export interface Platform {
  id: string;
  name: string;
  logo: string;
  icon: typeof UtensilsCrossed;
  website: string;
  color: string;
}

export const BOOKING_PLATFORMS: Platform[] = [
  {
    id: 'opentable',
    name: 'OpenTable',
    logo: 'https://cdn.otstatic.com/widget/images/logo-fb47a0.png',
    icon: CalendarClock,
    website: 'https://www.opentable.com',
    color: '#DA3743'
  },
  {
    id: 'sevenrooms',
    name: 'SevenRooms',
    logo: 'https://global-uploads.webflow.com/5ea9069132b0ed5c5b833559/5eaa41a1f9cd032e7d4df20e_sevenrooms.png',
    icon: CalendarClock,
    website: 'https://www.sevenrooms.com',
    color: '#1B1B1B'
  },
  {
    id: 'resy',
    name: 'Resy',
    logo: 'https://assets.resy.com/1.141.25/images/resy-logo-primary.svg',
    icon: CalendarClock,
    website: 'https://resy.com',
    color: '#9B1B1F'
  }
];

export const ORDERING_PLATFORMS: Platform[] = [
  {
    id: 'ubereats',
    name: 'Uber Eats',
    logo: 'https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/97c43f8974e6c876.svg',
    icon: UtensilsCrossed,
    website: 'https://www.ubereats.com',
    color: '#000000'
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    logo: 'https://cdn.doordash.com/static/img/doordash-logo-red.svg',
    icon: UtensilsCrossed,
    website: 'https://www.doordash.com',
    color: '#FF3008'
  },
  {
    id: 'grubhub',
    name: 'Grubhub',
    logo: 'https://res.cloudinary.com/grubhub/image/upload/v1677685921/grubhub_logo_2023.svg',
    icon: UtensilsCrossed,
    website: 'https://www.grubhub.com',
    color: '#FF8000'
  }
];