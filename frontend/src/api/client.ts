const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export interface Resource {
  id: number;
  jurisdiction: string | null;
  program_name: string | null;
  beneficiary: string | null;
  phone: string | null;
  link: string | null;
  eligibility_requirements: string | null;
  minimum_age: string | null;
  disability: string | null;
  insurance: string | null;
  caregiver_requirement: string | null;
  income_amount: string | null;
  income_sources: string | null;
  residency: string | null;
  medical_status: string | null;
  program_enrollment_dependencies: string | null;
  citizenship: string | null;
  criminal_records: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  success: boolean;
}

export async function fetchResources(): Promise<Resource[]> {
  const response = await fetch(`${API_BASE_URL}/api/resources`);
  if (!response.ok) {
    throw new Error(`Failed to fetch resources: ${response.statusText}`);
  }
  return response.json();
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }
  return response.json();
}
