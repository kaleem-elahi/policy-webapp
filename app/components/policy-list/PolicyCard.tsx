export interface Policy {
  id: string;
  title: string;
  description: string;
  topic: string;
  location: string;
  dateIntroduced: string;
  status: string;
}

export const PolicyCard = ({ policy }: { policy: Policy }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold">{policy.title}</h3>
    <p className="text-gray-700 mt-2">{policy.description}</p>
    <p className="text-sm text-gray-500 mt-2">
      <strong>Topic:</strong> {policy.topic}
    </p>
    <p className="text-sm text-gray-500">
      <strong>Location:</strong> {policy.location}
    </p>
    <p className="text-sm text-gray-500">
      <strong>Date Introduced:</strong> {policy.dateIntroduced}
    </p>
    <p className="text-sm text-gray-500">
      <strong>Status:</strong> {policy.status}
    </p>
  </div>
);
