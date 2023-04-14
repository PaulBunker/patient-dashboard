import { comparePatients } from "../utils/comparePatients/comparePatients";
import { readCSV } from "../utils/csvUtils";

export interface Clinic {
  id: number;
  name: string;
}

export interface Patient {
  id: number;
  clinic_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

let clinics: Clinic[] = [];
let patients1: Patient[] = [];
let patients2: Patient[] = [];
let allPatients: Patient[] = [];

(async () => {
  clinics = await readCSV("clinics.csv");
  patients1 = await readCSV("patients-1.csv");
  patients2 = await readCSV("patients-2.csv");
  allPatients = [...patients1, ...patients2];
})();

export const resolvers = {
  Query: {
    clinics: () => clinics,
    patients: (
      _: any,
      {
        clinicId,
        orderBy,
        orderDirection,
        offset,
        limit,
      }: {
        clinicId: number;
        orderBy: string;
        orderDirection: "asc" | "desc";
        offset: number;
        limit: number;
      }
    ) => {
      const filteredPatients = allPatients
        .filter((patient) => Number(patient.clinic_id) === Number(clinicId))
        .sort((a, b) => comparePatients(a, b, orderBy, orderDirection));

      // Apply pagination by slicing the array with the provided offset and limit.
      return filteredPatients.slice(offset, offset + limit);
    },
  },
};
