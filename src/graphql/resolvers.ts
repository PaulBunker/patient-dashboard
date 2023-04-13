import { readCSV } from "../utils/csvUtils";

interface Clinic {
  id: number;
  name: string;
}

interface Patient {
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

const comparePatients = (
  a: Patient,
  b: Patient,
  orderBy: string,
  order: "asc" | "desc"
) => {
  const fieldA = a[orderBy as keyof Patient];
  const fieldB = b[orderBy as keyof Patient];

  if (fieldA < fieldB) {
    return order === "asc" ? -1 : 1;
  }
  if (fieldA > fieldB) {
    return order === "asc" ? 1 : -1;
  }
  return 0;
};

export const resolvers = {
  Query: {
    clinics: () => clinics,
    patients: (
      _: any,
      {
        clinicId,
        orderBy,
        order,
      }: { clinicId: number; orderBy: string; order: "asc" | "desc" }
    ) => {
      const filteredPatients = allPatients.filter(
        (patient) => Number(patient.clinic_id) === Number(clinicId)
      );
      return filteredPatients.sort((a, b) =>
        comparePatients(a, b, orderBy, order)
      );
    },
  },
};
