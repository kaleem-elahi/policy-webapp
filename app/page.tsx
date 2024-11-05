import { IFiltersOptions } from "./components/filter-panel/FilterPanel.types";
import Dashboard, { IPolicy } from "./dashboard/page";

type FetchDualDataProps = {
  initialPolicies: IPolicy[];
  initialFilterOptions: IFiltersOptions;
};

async function fetchDualData(): Promise<FetchDualDataProps> {
  const defaultFilterOptions: IFiltersOptions = {
    topics: [],
    statuses: [],
    locations: [],
    dateIntroduced: { from: "", to: "" },
  };

  try {
    // dual api call
    const [policiesResponse, filterOptionsResponse] = await Promise.all([
      fetch("http://localhost:5050/policies", {
        next: { revalidate: 60 },
      }),
      fetch("http://localhost:5050/filterDropdowns", {
        next: { revalidate: 60 },
      }),
    ]);

    const [policies, filterDropdowns] = await Promise.all([
      policiesResponse.json(),
      filterOptionsResponse.json(),
    ]);

    console.log(policies);

    return {
      initialPolicies: policies,
      initialFilterOptions: filterDropdowns || defaultFilterOptions,
    };
  } catch (error) {
    console.error("Error fetching policies:", error);
    return {
      initialPolicies: [],
      initialFilterOptions: defaultFilterOptions,
    };
  }
}

export default async function Page() {
  // Fetch the fetchDualData data on the server side
  const initialProps = await fetchDualData();
  return <Dashboard {...initialProps} />;
}
