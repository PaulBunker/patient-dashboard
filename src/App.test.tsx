import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { GetClinicsDocument } from "./generated/graphql";

const mocks = [
  {
    request: {
      query: GetClinicsDocument,
    },
    result: {
      data: {
        clinics: [
          {
            id: "1",
            name: "Clinic 1",
          },
          {
            id: "2",
            name: "Clinic 2",
          },
        ],
      },
    },
  },
];

describe("App", () => {
  it("renders the ClinicSelect component", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const clinicSelectElement = await screen.findByRole("combobox", {
      name: /select a clinic/i,
    });

    expect(clinicSelectElement).toBeInTheDocument();
  });

  it("renders the PatientTable component when a clinic is selected", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const clinicSelectElement = await screen.findByRole("combobox", {
      name: /select a clinic/i,
    });

    userEvent.selectOptions(clinicSelectElement, "2");

    const patientTableElement = await screen.findByRole("table", {
      name: /patient list/i,
    });

    expect(patientTableElement).toBeInTheDocument();
  });
});
