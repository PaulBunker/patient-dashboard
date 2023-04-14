import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";

const GET_CLINICS = gql`
  query GetClinics {
    clinics {
      id
      name
    }
  }
`;

const GET_PATIENTS = gql`
  query GetPatients(
    $clinicId: Int!
    $orderBy: String!
    $orderDirection: String!
    $offset: Int!
    $limit: Int!
  ) {
    patients(
      clinicId: $clinicId
      orderBy: $orderBy
      orderDirection: $orderDirection
      offset: $offset
      limit: $limit
    ) {
      id
      first_name
      last_name
      date_of_birth
    }
  }
`;

function App() {
  const [clinicId, setClinicId] = React.useState<number | null>(null);

  const {
    loading: loadingClinics,
    error: errorClinics,
    data: dataClinics,
  } = useQuery(GET_CLINICS);

  const {
    loading: loadingPatients,
    error: errorPatients,
    data: dataPatients,
  } = useQuery(GET_PATIENTS, {
    variables: {
      clinicId,
      orderBy: "date_of_birth",
      orderDirection: "asc",
      offset: 0,
      limit: 10,
    },
    skip: !clinicId,
  });

  const handleClinicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClinicId(Number(event.target.value));
  };

  if (loadingClinics) return <p>Loading clinics...</p>;
  if (errorClinics) return <p>Error loading clinics: {errorClinics.message}</p>;

  return (
    <div className="App">
      <h1>Patient Dashboard</h1>
      <label htmlFor="clinic-select">Select a clinic:</label>
      <select id="clinic-select" onChange={handleClinicChange}>
        <option value="">-- Select a clinic --</option>
        {dataClinics.clinics.map((clinic: any) => (
          <option key={clinic.id} value={clinic.id}>
            {clinic.name}
          </option>
        ))}
      </select>
      {loadingPatients ? (
        <p>Loading patients...</p>
      ) : errorPatients ? (
        <p>Error loading patients: {errorPatients.message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {dataPatients &&
              dataPatients.patients.map((patient: any) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.date_of_birth}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
