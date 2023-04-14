import React, { useState } from "react";
import ClinicSelect from "./components/ClinicSelect/ClinicSelect";
import PatientTable from "./components/PatientTable/PatientTable";
import styles from "./App.module.scss";

function App() {
  const [clinicId, setClinicId] = useState<number | null>(null);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1>Patient Dashboard</h1>
        <ClinicSelect setClinicId={setClinicId} />
        {clinicId && <PatientTable clinicId={clinicId} />}
      </div>
    </div>
  );
}

export default App;
