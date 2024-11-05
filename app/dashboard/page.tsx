"use client";

import { useState, useMemo, useCallback } from "react";
import { Header } from "../components/header/Header";
import { PolicyList } from "../components/policy-list/PolicyList";
import FilterPanel from "../components/filter-panel/FilterPanel";
import { IFiltersOptions } from "../components/filter-panel/FilterPanel.types";
import { ThemeProvider } from "next-themes";
import PolicyLineChart from "../components/charts/PolicyLineChart";
import { useFilteredPolicies } from "../components/hooks/useFilteredPolicies";

export interface IPolicy {
  id: string;
  title: string;
  description: string;
  topic: string;
  location: string;
  dateIntroduced: string;
  status: string;
}

export default function Dashboard({
  initialPolicies,
  initialFilterOptions,
}: {
  initialPolicies: IPolicy[];
  initialFilterOptions: IFiltersOptions;
}) {
  const [filters, setFilters] = useState<IFiltersOptions>({
    topics: [],
    statuses: [],
    locations: [],
    dateIntroduced: { from: "", to: "" },
  });
  const [selectKey, setSelectKey] = useState(1);
  const filteredPolicies = useFilteredPolicies(initialPolicies, filters);

  const resetFilters = useCallback(() => {
    setSelectKey((prevKey) => prevKey + 1);
    setFilters({
      topics: [],
      statuses: [],
      locations: [],
      dateIntroduced: { from: "", to: "" },
    });
  }, []);

  const memoizedFilteredPolicies = useMemo(
    () => filteredPolicies,
    [filteredPolicies]
  );

  return (
    <ThemeProvider attribute="class">
      <Header />
      <div className="mt-28" />
      <PolicyLineChart policies={memoizedFilteredPolicies} />
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        filterOptions={initialFilterOptions}
        resetFilters={resetFilters}
        selectKey={selectKey}
      />
      <PolicyList policies={memoizedFilteredPolicies} />
    </ThemeProvider>
  );
}
