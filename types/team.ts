// Base interface for common form fields
export interface BaseTeamFormData {
  name: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
}

// Interface for location-specific fields
export interface TeamLocationFormData {
  city: string;
  country: string;
}

// Interface for details-specific fields
export interface TeamDetailsFormData {
  foundedYear: string; // Keep as string for form handling
  arena: string;
  division: string;
  conference: string;
}

// Specific interface for the colors section
export interface TeamColorFields {
  primaryColor: string;
  secondaryColor: string;
}

// Combined form data interface
export interface TeamFormData {
  name: string;
  abbreviation: string;
  city?: string;
  country?: string;
  foundedYear?: string; // Changed to string to match TeamDetailsFormData
  arena?: string;
  division?: string;
  conference?: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
}

// Final team interface with database fields
export interface Team extends TeamFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
