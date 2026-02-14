import React, { useEffect, useState } from "react";
import { fetchResources, Resource } from "../api/client";
import "./SampleTable.css";

const COLUMN_LABELS: { key: keyof Resource; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "jurisdiction", label: "Jurisdiction" },
  { key: "program_name", label: "Program Name" },
  { key: "beneficiary", label: "Beneficiary" },
  { key: "phone", label: "Phone" },
  { key: "link", label: "Link" },
  { key: "eligibility_requirements", label: "Eligibility Requirements" },
  { key: "minimum_age", label: "Minimum Age" },
  { key: "disability", label: "Disability" },
  { key: "insurance", label: "Insurance" },
  { key: "caregiver_requirement", label: "Caregiver Requirement" },
  { key: "income_amount", label: "Income Amount" },
  { key: "income_sources", label: "Income Sources" },
  { key: "residency", label: "Residency" },
  { key: "medical_status", label: "Medical Status" },
  { key: "program_enrollment_dependencies", label: "Program Enrollment Dependencies" },
  { key: "citizenship", label: "Citizenship" },
  { key: "criminal_records", label: "Criminal Records" },
];

const SampleTable: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResources()
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="sample-table-status">Loading...</div>;
  if (error) return <div className="sample-table-status error">Error: {error}</div>;

  return (
    <div className="sample-table-container">
      <h1>Resources</h1>
      <div className="table-wrapper">
        <table className="resources-table">
          <thead>
            <tr>
              {COLUMN_LABELS.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resources.length === 0 ? (
              <tr>
                <td colSpan={COLUMN_LABELS.length} className="no-data">
                  No resources found
                </td>
              </tr>
            ) : (
              resources.map((resource) => (
                <tr key={resource.id}>
                  {COLUMN_LABELS.map((col) => (
                    <td key={col.key}>
                      {col.key === "link" && resource.link ? (
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                          {resource.link}
                        </a>
                      ) : (
                        resource[col.key] ?? ""
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SampleTable;
