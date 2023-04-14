import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import styles from "./PatientTable.module.scss";

interface PatientTableProps {
  clinicId: number | null;
}

export const GET_PATIENTS = gql`
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
  const [orderBy, setOrderBy] = useState("id");
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



  const handleHeaderClick = (field: string) => {
    if(orderBy === field) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(field);
      setOrderDirection("asc");
    }
  };

  useEffect(() => {
    if (clinicId !== null) {
      refetch();
    }
  }, [clinicId, orderBy, orderDirection, refetch]);

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value));
    refetch();
  };

  const renderArrow = (field: string) => {
    if (orderBy === field) {
      return orderDirection === "desc" ? "▲" : "▼";
    }
    return "";
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
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
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
                ID {renderArrow("id")}
              </th>
              <th
                onClick={() => handleHeaderClick("first_name")}
                className={orderBy === "first_name" ? styles.active : ""}
              >
                First Name {renderArrow("first_name")}
              </th>
              <th
                onClick={() => handleHeaderClick("last_name")}
                className={orderBy === "last_name" ? styles.active : ""}
              >
                Last Name {renderArrow("last_name")}
              </th>
              <th
                onClick={() => handleHeaderClick("date_of_birth")}
                className={orderBy === "date_of_birth" ? styles.active : ""}
              >
                Date of Birth {renderArrow("date_of_birth")}
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
                  <td>
                    {/* TODO: Format date of birth based on browser locale */}
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(patient.date_of_birth)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientTable;
