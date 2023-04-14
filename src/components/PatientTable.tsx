// src/components/PatientTable.tsx
import React from 'react';

interface Patient {
  id: number;
  clinic_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

interface PatientTableProps {
  patients: Patient[];
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  return (
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
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.first_name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.date_of_birth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
