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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("date_of_birth");

  const { loading, error, data, refetch } = useQuery(GET_PATIENTS, {
    variables: {
      clinicId,
      orderBy,
      orderDirection: "asc",
      offset: 0,
      limit: itemsPerPage,
    },
    skip: !clinicId,
  });

  useEffect(() => {
    if (clinicId !== null) {
      refetch();
    }
  }, [clinicId, refetch, itemsPerPage, orderBy]);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value));
  };

  const handleHeaderClick = (field: string) => {
    setOrderBy(field);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <label htmlFor="itemsPerPage">Items per page:</label>
        <select
          name="itemsPerPage"
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
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
              <th onClick={() => handleHeaderClick("first_name")}>
                First Name
              </th>
              <th onClick={() => handleHeaderClick("last_name")}>Last Name</th>
              <th onClick={() => handleHeaderClick("date_of_birth")}>
                Date of Birth
              </th>
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
