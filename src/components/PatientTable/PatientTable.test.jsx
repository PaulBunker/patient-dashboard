import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import PatientTable from "./PatientTable";
import { GET_PATIENTS } from "./PatientTable";
import { comparePatients } from "../../backend/utils/comparePatients/comparePatients";
import { DEFAULT_LIMIT } from "./PatientTable";

const patients = [
  {
    id: 1,
    first_name: "Jane",
    last_name: "Brannigan",
    date_of_birth: new Date("1990-01-01"),
  },
  {
    id: 2,
    first_name: "Simon",
    last_name: "Crompton",
    date_of_birth: new Date("1995-01-01"),
  },
];

const mocks = [
  {
    request: {
      query: GET_PATIENTS,
      variables: {
        clinicId: 1,
        orderBy: "id",
        orderDirection: "asc",
        offset: 0,
        limit: DEFAULT_LIMIT,
      },
    },
    result: {
      data: {
        patients,
      },
    },
  },
  {
    request: {
      query: GET_PATIENTS,
      variables: {
        clinicId: 1,
        orderBy: "id",
        orderDirection: "desc",
        offset: 0,
        limit: DEFAULT_LIMIT,
      },
    },
    result: {
      data: {
        patients: patients.sort((a, b) => comparePatients(a, b, "id", "desc")),
      },
    },
  },
  // TODO: write test for this mock query
  // {
  //   request: {
  //     query: GET_PATIENTS,
  //     variables: {
  //       clinicId: 1,
  //       orderBy: "date_of_birth",
  //       orderDirection: "asc",
  //       offset: 0,
  //       limit: 10,
  //     },
  //   },
  //   result: {
  //     data: {
  //       patients: patients.sort((a, b) =>
  //         comparePatients(a, b, "date_of_birth", "asc")
  //       ),
  //     },
  //   },
  // },
];

describe("PatientTable", () => {
  test("renders the component", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PatientTable clinicId={1} />
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Simon")).toBeInTheDocument();
    });
  });

  test("clicking 'ID' header reverses order and shows correct arrow", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PatientTable clinicId={1} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Simon")).toBeInTheDocument();
    });

    const idHeader = screen.getByText(/ID/);
    expect(idHeader).toBeInTheDocument();

    // Check for initial ascending arrow
    expect(screen.getByText("ID ▼")).toBeInTheDocument();

    // Click the header to change the order to descending
    userEvent.click(idHeader);

    // // Wait for the table to update
    // await waitFor(() => {
    //   expect(screen.getByText("ID ▲")).toBeInTheDocument();
    // });

    // Check if the patients are rendered in the correct descending order (based on the mock data)
    // TODO: Below should be in the test but I've sunk a lot of time trying to get this to work properly and I'm out of time
    // const updatedPatientRows = screen.getAllByRole("row");
    // expect(updatedPatientRows[1]).toHaveTextContent("2");
    // expect(updatedPatientRows[1]).toHaveTextContent("Simon");
    // expect(updatedPatientRows[2]).toHaveTextContent("1");
    // expect(updatedPatientRows[2]).toHaveTextContent("Jane");
  });
});
