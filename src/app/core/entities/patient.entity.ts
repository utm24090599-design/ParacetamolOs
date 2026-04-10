export type Gender = 'female' | 'male';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  email: string;
}

export function createPatient(partial: Omit<Patient, 'id'>): Patient {
  return { id: crypto.randomUUID(), ...partial };
}
