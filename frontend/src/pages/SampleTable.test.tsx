import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SampleTable from "./SampleTable";
import * as client from "../api/client";

jest.mock("../api/client");

const mockResources: client.Resource[] = [
  {
    id: 1,
    jurisdiction: "Federal",
    program_name: "SNAP",
    beneficiary: "Low-income individuals",
    phone: "1-800-221-5689",
    link: "https://www.fns.usda.gov/snap",
    eligibility_requirements: "Income below 130% FPL",
    minimum_age: "0",
    disability: "Not required",
    insurance: "Not required",
    caregiver_requirement: "None",
    income_amount: "$2,313/month",
    income_sources: "Earned and unearned",
    residency: "US resident",
    medical_status: "Not required",
    program_enrollment_dependencies: "None",
    citizenship: "US Citizen",
    criminal_records: "No restrictions",
  },
];

test("renders loading state initially", () => {
  (client.fetchResources as jest.Mock).mockReturnValue(new Promise(() => {}));
  render(<SampleTable />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders resources table after fetch", async () => {
  (client.fetchResources as jest.Mock).mockResolvedValue(mockResources);
  render(<SampleTable />);

  await waitFor(() => {
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  expect(screen.getByText("Federal")).toBeInTheDocument();
  expect(screen.getByText("SNAP")).toBeInTheDocument();
  expect(screen.getByText("Low-income individuals")).toBeInTheDocument();
});

test("renders error state on fetch failure", async () => {
  (client.fetchResources as jest.Mock).mockRejectedValue(
    new Error("Network error")
  );
  render(<SampleTable />);

  await waitFor(() => {
    expect(screen.getByText("Error: Network error")).toBeInTheDocument();
  });
});

test("renders no data message for empty results", async () => {
  (client.fetchResources as jest.Mock).mockResolvedValue([]);
  render(<SampleTable />);

  await waitFor(() => {
    expect(screen.getByText("No resources found")).toBeInTheDocument();
  });
});

test("renders all column headers", async () => {
  (client.fetchResources as jest.Mock).mockResolvedValue(mockResources);
  render(<SampleTable />);

  await waitFor(() => {
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  const expectedHeaders = [
    "ID", "Jurisdiction", "Program Name", "Beneficiary", "Phone", "Link",
    "Eligibility Requirements", "Minimum Age", "Disability", "Insurance",
    "Caregiver Requirement", "Income Amount", "Income Sources", "Residency",
    "Medical Status", "Program Enrollment Dependencies", "Citizenship",
    "Criminal Records",
  ];
  for (const header of expectedHeaders) {
    expect(screen.getByText(header)).toBeInTheDocument();
  }
});
