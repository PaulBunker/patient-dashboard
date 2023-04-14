import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import styles from "./PatientTable.module.scss";

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
  const [orderBy, setOrderBy] = useState("date_of_birth");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [limit, setLimit] = useState(10);
  const { loading, error, data, refetch } = useQuery(GET_PATIENTS, {
    variables: {
      clinicId,
      orderBy,
      orderDirection,
      offset: 0,
      limit,
    },
    skip: !clinicId,
  });

  useEffect(() => {
    if (clinicId !== null) {
      refetch();
    }
  }, [clinicId, refetch]);

  const handleHeaderClick = (field: string) => {
    setOrderBy(field);
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    refetch();
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value));
    refetch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.limitSelect}>
        <label htmlFor="limit">Rows per page:</label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                onClick={() => handleHeaderClick("id")}
                className={orderBy === "id" ? styles.active : ""}
              >
                ID
              </th>
              <th
                onClick={() => handleHeaderClick("first_name")}
                className={orderBy === "first_name" ? styles.active : ""}
              >
                First Name
              </th>
              <th
                onClick={() => handleHeaderClick("last_name")}
                className={orderBy === "last_name" ? styles.active : ""}
              >
                Last Name
              </th>
              <th
                onClick={() => handleHeaderClick("date_of_birth")}
                className={orderBy === "date_of_birth" ? styles.active : ""}
              >
                Date of Birth
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.patients.map((patient: any) => (
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

};

export default PatientTable;
