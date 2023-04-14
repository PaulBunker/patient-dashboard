import { comparePatients } from "./comparePatients";

describe("comparePatients", () => {
  const patientA = {
    id: 1,
    clinic_id: 2,
    first_name: "Alfred",
    last_name: "Allen",
    date_of_birth: new Date("1980-01-01"),
  };

  const patientB = {
    id: 2,
    clinic_id: 1,
    first_name: "Zoe",
    last_name: "Zebra",
    date_of_birth: new Date("1990-01-01"),
  };

  it("should return -1 if fieldA < fieldB and order is 'asc'", () => {
    expect(comparePatients(patientA, patientB, "id", "asc")).toBe(-1);
  });

  it("should return 1 if fieldA < fieldB and order is 'desc'", () => {
    expect(comparePatients(patientA, patientB, "id", "desc")).toBe(1);
  });

  it("should return 1 if fieldA > fieldB and order is 'asc'", () => {
    expect(comparePatients(patientB, patientA, "date_of_birth", "asc")).toBe(1);
  });

  it("should return -1 if fieldA > fieldB and order is 'desc'", () => {
    expect(comparePatients(patientB, patientA, "date_of_birth", "desc")).toBe(
      -1
    );
  });

  it("should return 0 if fieldA === fieldB", () => {
    expect(comparePatients(patientA, patientA, "id", "asc")).toBe(0);
  });

  it("should sort patients in the correct last name order asc", () => {
    const patients = [patientB, patientA];
    const sortedPatients = patients.sort((a, b) =>
      comparePatients(a, b, "last_name", "asc")
    );
    expect(sortedPatients[0]).toBe(patientA);
  });

  it("should sort patients in the correct last name order desc", () => {
    const patients = [patientB, patientA];
    const sortedPatients = patients.sort((a, b) =>
      comparePatients(a, b, "last_name", "desc")
    );
    expect(sortedPatients[0]).toBe(patientB);
  });

  it("should sort patients in the correct date_of_birth order asc", () => {
    const patients = [patientA, patientB];
    const sortedPatients = patients.sort((a, b) =>
      comparePatients(a, b, "date_of_birth", "asc")
    );
    expect(sortedPatients[0]).toBe(patientA);
  });

  it("should sort patients in the correct date_of_birth order desc", () => {
    const patients = [patientB, patientA];
    const sortedPatients = patients.sort((a, b) =>
      comparePatients(a, b, "date_of_birth", "desc")
    );
    expect(sortedPatients[0]).toBe(patientB);
  });
});
