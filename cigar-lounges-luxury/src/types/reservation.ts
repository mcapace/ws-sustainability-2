export interface ReservationFormData {
  // Step 1: Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Reservation Details
  date: Date | null;
  time: string;
  partySize: number;
  duration: number; // hours
  
  // Step 3: Preferences
  lounge: 'manhattan' | 'hamptons' | 'both';
  seatingPreference: 'window' | 'fireplace' | 'private' | 'bar' | 'no-preference';
  occasion: 'business' | 'celebration' | 'date' | 'relaxation' | 'other';
  
  // Step 4: Special Requests
  specialRequests: string;
  dietaryRestrictions: string;
  accessibilityNeeds: string;
  
  // Step 5: Contact Preferences
  preferredContact: 'email' | 'phone' | 'text';
  newsletterSignup: boolean;
  specialOffers: boolean;
}

export interface ReservationStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
  currency: string;
}

export interface AvailabilityDate {
  date: string;
  available: boolean;
  fullyBooked: boolean;
  timeSlots: TimeSlot[];
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ReservationConfirmation {
  id: string;
  confirmationNumber: string;
  date: Date;
  time: string;
  partySize: number;
  lounge: string;
  estimatedTotal: number;
  currency: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface MapLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'radio' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: unknown) => string | null;
  };
}
