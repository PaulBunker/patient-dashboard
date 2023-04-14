import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import styles from "./ClinicSelect.module.css";

interface ClinicSelectProps {
  setClinicId: React.Dispatch<React.SetStateAction<number | null>>;
}

const GET_CLINICS = gql`
  query GetClinics {
    clinics {
      id
      name
    }
  }
`;

const ClinicSelect: React.FC<ClinicSelectProps> = ({ setClinicId }) => {
  const { loading, error, data } = useQuery(GET_CLINICS);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setClinicId(selectedValue === 0 ? null : selectedValue);
  };

  return (
    <div className={styles.selectContainer}>
      <select className={styles.select} onChange={handleChange}>
        <option value="0">Select a clinic</option>
        {loading ? (
          <option>Loading...</option>
        ) : error ? (
          <option>Error</option>
        ) : (
          data.clinics.map((clinic: { id: number; name: string }) => (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default ClinicSelect;
