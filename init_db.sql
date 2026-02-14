-- Create the database (run as superuser)
-- CREATE DATABASE decava;

-- Connect to decava database before running the rest
-- \c decava

CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    jurisdiction VARCHAR(255),
    program_name VARCHAR(255),
    beneficiary VARCHAR(255),
    phone VARCHAR(50),
    link TEXT,
    eligibility_requirements TEXT,
    minimum_age VARCHAR(50),
    disability VARCHAR(255),
    insurance VARCHAR(255),
    caregiver_requirement TEXT,
    income_amount VARCHAR(255),
    income_sources VARCHAR(255),
    residency VARCHAR(255),
    medical_status TEXT,
    program_enrollment_dependencies TEXT,
    citizenship VARCHAR(255),
    criminal_records VARCHAR(255)
);

-- Seed data
INSERT INTO resources (jurisdiction, program_name, beneficiary, phone, link, eligibility_requirements, minimum_age, disability, insurance, caregiver_requirement, income_amount, income_sources, residency, medical_status, program_enrollment_dependencies, citizenship, criminal_records)
VALUES
('Federal', 'Supplemental Nutrition Assistance Program (SNAP)', 'Low-income individuals and families', '1-800-221-5689', 'https://www.fns.usda.gov/snap', 'Income below 130% of federal poverty level', '0', 'Not required', 'Not required', 'None', '$2,313/month (individual)', 'Earned and unearned income', 'US resident', 'Not required', 'None', 'US Citizen or qualified non-citizen', 'No restrictions'),
('Federal', 'Medicaid', 'Low-income adults, children, pregnant women, elderly, disabled', '1-800-633-4227', 'https://www.medicaid.gov', 'Income-based eligibility varies by state', '0', 'Eligible if disabled', 'Primary insurance program', 'None', 'Varies by state', 'All sources considered', 'State resident', 'Varies by category', 'None', 'US Citizen or qualified non-citizen', 'No restrictions'),
('State - California', 'CalWORKs', 'Families with dependent children', '1-877-847-3663', 'https://www.cdss.ca.gov/calworks', 'Income and asset limits apply', '0', 'Accommodations available', 'Not required', 'None', '$1,130/month (family of 3)', 'Earned and unearned income', 'California resident', 'Not required', 'None', 'US Citizen or qualified non-citizen', 'No restrictions'),
('Federal', 'Social Security Disability Insurance (SSDI)', 'Disabled workers with sufficient work history', '1-800-772-1213', 'https://www.ssa.gov/disability', 'Unable to engage in substantial gainful activity', '18', 'Required - must meet SSA definition', 'Medicare after 24 months', 'None', 'Below SGA ($1,470/month)', 'Work credits required', 'US resident', 'Documented disability', 'Sufficient work credits', 'US Citizen or permanent resident', 'No restrictions'),
('Federal', 'Supplemental Security Income (SSI)', 'Aged, blind, or disabled individuals with limited income', '1-800-772-1213', 'https://www.ssa.gov/ssi', 'Age 65+, blind, or disabled with limited income/resources', '0', 'Required for under 65', 'Medicaid in most states', 'None', '$943/month (individual)', 'All sources considered', 'US resident', 'May be required', 'None', 'US Citizen or certain non-citizens', 'No restrictions');
