import { IFiltersOptions } from "./components/filter-panel/FilterPanel.types";
import Dashboard, { IPolicy } from "./dashboard/page";

type FetchDualDataProps = {
  initialPolicies: IPolicy[];
  initialFilterOptions: IFiltersOptions;
};

async function fetchDualData(): Promise<FetchDualDataProps> {
  try {
    // dual api call
    const [policiesResponse, filterOptionsResponse] = await Promise.all([
      fetch("http://localhost:5050/policies", {
        cache: "no-cache",
      }),
      fetch("http://localhost:5050/filterDropdowns", {
        cache: "no-cache",
      }),
    ]);

    const [policies, filterDropdowns] = await Promise.all([
      policiesResponse.json(),
      filterOptionsResponse.json(),
    ]);

    console.log(policies);

    return {
      initialPolicies: policies,
      initialFilterOptions: filterDropdowns,
    };
  } catch (error) {
    console.error("Error fetching policies:", error);
    return {
      initialPolicies: [],
      initialFilterOptions: {
        topics: [],
        statuses: [],
        locations: [],
        dateIntroduced: { from: "", to: "" },
      },
    };
  }
}

export default async function Page() {
  // Fetch the fetchDualData data on the server side
  const initialProps = await fetchDualData();
  return <Dashboard {...initialProps} />;
}
