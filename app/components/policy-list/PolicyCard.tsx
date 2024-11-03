import StatusIndicator from "./StatusIndicator";

export interface Policy {
  id: string;
  title: string;
  description: string;
  topic: string;
  location: string;
  dateIntroduced: string;
  status: string;
}

interface PolicyCardProps {
  policy: Policy;
}

interface PolicyFieldProps {
  label: string;
  value: string;
}

const PolicyField = ({ label, value }: PolicyFieldProps) => (
  <p className="text-sm text-gray-600 dark:text-gray-200">
    <strong>{label}:</strong> {value}
  </p>
);

export const PolicyCard = ({ policy }: PolicyCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg dark:hover:shadow-grey-900">
    <h3 className=" font-semibold text-gray-700 dark:text-white">
      {policy.title}
      <br />
      <StatusIndicator status={policy.status} />
    </h3>
    <p className="text-gray-700 dark:text-gray-300 mt-2">
      {policy.description}
    </p>
    <PolicyField label="Topic" value={policy.topic} />
    <PolicyField label="Location" value={policy.location} />
    <PolicyField label="Date Introduced" value={policy.dateIntroduced} />
  </div>
);
