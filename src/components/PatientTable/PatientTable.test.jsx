import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import PatientTable from "./PatientTable";
import { GET_PATIENTS } from "./PatientTable"; // You need to export the GET_PATIENTS constant from the PatientTable.tsx file

const mocks = [
  {
    request: {
      query: GET_PATIENTS,
      variables: {
        clinicId: 1,
        orderBy: "date_of_birth",
        orderDirection: "asc",
        offset: 0,
        limit: 10,
      },
    },
    result: {
      data: {
        patients: [
          {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            date_of_birth: new Date("1990-01-01"),
          },
          {
            id: 2,
            first_name: "Jane",
            last_name: "Doe",
            date_of_birth: new Date("1995-01-01"),
          },
        ],
      },
    },
  },
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
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });
});
