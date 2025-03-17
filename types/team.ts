export interface Team {
  _id: string;
  name: string;
  city?: string;
  country?: string;
  foundedYear?: number;
  arena?: string;
  division?: string;
  conference?: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  abbreviation: string;
  createdAt: string;
  updatedAt: string;
}
