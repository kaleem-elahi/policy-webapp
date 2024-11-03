// Status color mappings
const statusColors: { [key: string]: string } = {
  Introduced: "bg-blue-500",
  "Under consideration": "bg-yellow-500",
  Passed: "bg-green-500",
  Failed: "bg-red-500",
};

export default function StatusIndicator({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
        statusColors[status] || "bg-gray-500"
      }`}
    >
      {status}
    </span>
  );
}
