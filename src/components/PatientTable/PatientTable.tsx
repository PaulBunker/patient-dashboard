import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import styles from "./PatientTable.module.css";

interface PatientTableProps {
  clinicId: number | null;
}

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

const PatientTable: React.FC<PatientTableProps> = ({ clinicId }) => {
  const { loading, error, data, refetch } = useQuery(GET_PATIENTS, {
    variables: {
      clinicId,
      orderBy: "date_of_birth",
      orderDirection: "asc",
      offset: 0,
      limit: 10,
    },
    skip: !clinicId,
  });

  useEffect(() => {
    if (clinicId !== null) {
      refetch();
    }
  }, [clinicId, refetch]);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {console.log(data)}
            {data &&
              data.patients.map((patient: any) => (
                <tr key={patient.id}>
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
};

export default PatientTable;
