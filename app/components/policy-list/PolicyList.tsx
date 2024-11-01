import { PolicyCard, Policy } from "./PolicyCard";

export const PolicyList = ({ policies }: { policies: Policy[] }) => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">Policies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
};
