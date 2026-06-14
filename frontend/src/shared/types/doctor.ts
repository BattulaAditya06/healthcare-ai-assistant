export interface Doctor {
  id: number;
  name: string;
  department: string;
  rating: number;
  experience: number;
  hospital: string;
  availability: boolean;
  availableSlots: string[];
}