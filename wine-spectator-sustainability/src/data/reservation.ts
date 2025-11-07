import { ReservationStep, TimeSlot, AvailabilityDate, BusinessHours, MapLocation, WeatherData } from '@/types/reservation';

export const reservationSteps: ReservationStep[] = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Tell us about yourself',
    icon: '👤',
    isCompleted: false,
    isActive: true
  },
  {
    id: 2,
    title: 'Reservation Details',
    description: 'When and where',
    icon: '📅',
    isCompleted: false,
    isActive: false
  },
  {
    id: 3,
    title: 'Preferences',
    description: 'Your preferences',
    icon: '⭐',
    isCompleted: false,
    isActive: false
  },
  {
    id: 4,
    title: 'Special Requests',
    description: 'Any special needs',
    icon: '💬',
    isCompleted: false,
    isActive: false
  },
  {
    id: 5,
    title: 'Contact Preferences',
    description: 'How to reach you',
    icon: '📧',
    isCompleted: false,
    isActive: false
  }
];

export const timeSlots: TimeSlot[] = [
  { time: '11:00 AM', available: true, price: 85, currency: 'USD' },
  { time: '12:00 PM', available: true, price: 85, currency: 'USD' },
  { time: '1:00 PM', available: false, price: 95, currency: 'USD' },
  { time: '2:00 PM', available: true, price: 95, currency: 'USD' },
  { time: '3:00 PM', available: true, price: 95, currency: 'USD' },
  { time: '4:00 PM', available: false, price: 105, currency: 'USD' },
  { time: '5:00 PM', available: true, price: 105, currency: 'USD' },
  { time: '6:00 PM', available: true, price: 115, currency: 'USD' },
  { time: '7:00 PM', available: true, price: 115, currency: 'USD' },
  { time: '8:00 PM', available: false, price: 125, currency: 'USD' },
  { time: '9:00 PM', available: true, price: 125, currency: 'USD' },
  { time: '10:00 PM', available: true, price: 135, currency: 'USD' }
];

export const availabilityDates: AvailabilityDate[] = [
  {
    date: '2024-02-15',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-16',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-17',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-18',
    available: false,
    fullyBooked: true,
    timeSlots: []
  },
  {
    date: '2024-02-19',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-20',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-21',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-22',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-23',
    available: false,
    fullyBooked: true,
    timeSlots: []
  },
  {
    date: '2024-02-24',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-25',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-26',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-27',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  },
  {
    date: '2024-02-28',
    available: true,
    fullyBooked: false,
    timeSlots: timeSlots
  }
];

export const businessHours: BusinessHours[] = [
  { day: 'Monday', open: '11:00 AM', close: '11:00 PM', isOpen: true },
  { day: 'Tuesday', open: '11:00 AM', close: '11:00 PM', isOpen: true },
  { day: 'Wednesday', open: '11:00 AM', close: '11:00 PM', isOpen: true },
  { day: 'Thursday', open: '11:00 AM', close: '12:00 AM', isOpen: true },
  { day: 'Friday', open: '11:00 AM', close: '1:00 AM', isOpen: true },
  { day: 'Saturday', open: '10:00 AM', close: '1:00 AM', isOpen: true },
  { day: 'Sunday', open: '10:00 AM', close: '10:00 PM', isOpen: false }
];

export const manhattanLocation: MapLocation = {
  latitude: 40.7589,
  longitude: -73.9851,
  address: '123 Park Avenue',
  city: 'New York',
  state: 'NY',
  zipCode: '10001'
};

export const hamptonsLocation: MapLocation = {
  latitude: 40.9634,
  longitude: -72.1847,
  address: '456 Ocean Drive',
  city: 'East Hampton',
  state: 'NY',
  zipCode: '11937'
};

export const mockWeatherData: WeatherData = {
  temperature: 72,
  condition: 'Partly Cloudy',
  icon: '⛅',
  humidity: 65,
  windSpeed: 8
};

export const seatingPreferences = [
  { value: 'window', label: 'Window Seating', description: 'City views and natural light', icon: '🏙️' },
  { value: 'fireplace', label: 'Fireplace Lounge', description: 'Cozy atmosphere by the fire', icon: '🔥' },
  { value: 'private', label: 'Private Booth', description: 'Intimate and secluded', icon: '🚪' },
  { value: 'bar', label: 'Bar Seating', description: 'Social atmosphere at the bar', icon: '🍸' },
  { value: 'no-preference', label: 'No Preference', description: 'Best available seating', icon: '✨' }
];

export const occasions = [
  { value: 'business', label: 'Business Meeting', icon: '💼' },
  { value: 'celebration', label: 'Celebration', icon: '🎉' },
  { value: 'date', label: 'Date Night', icon: '💕' },
  { value: 'relaxation', label: 'Relaxation', icon: '🧘' },
  { value: 'other', label: 'Other', icon: '✨' }
];

export const lounges = [
  {
    value: 'manhattan',
    label: 'Manhattan Luxury Lounge',
    description: 'Urban sophistication in the heart of NYC',
    image: '/images/lounges/manhattan-lounge.jpg'
  },
  {
    value: 'hamptons',
    label: 'Hamptons Reserve',
    description: 'Coastal elegance with ocean views',
    image: '/images/lounges/hamptons-lounge.jpg'
  },
  {
    value: 'both',
    label: 'Either Location',
    description: 'Best available at either location',
    image: '/images/lounges/both-lounges.jpg'
  }
];
