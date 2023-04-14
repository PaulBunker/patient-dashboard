// src/components/ClinicSelect.tsx
import React from 'react';

interface Clinic {
  id: number;
  name: string;
}

interface ClinicSelectProps {
  clinics: Clinic[];
  selectedClinicId: number | null;
  onChange: (clinicId: number) => void;
}

export const ClinicSelect: React.FC<ClinicSelectProps> = ({ clinics, selectedClinicId, onChange }) => {
  return (
    <select
      value={selectedClinicId || ''}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="">Select a clinic</option>
      {clinics.map((clinic) => (
        <option key={clinic.id} value={clinic.id}>
          {clinic.name}
        </option>
      ))}
    </select>
  );
};
