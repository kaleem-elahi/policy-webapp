"use client";

import { useState, useMemo, useCallback } from "react";
import { Header } from "./components/header/Header";
import { PolicyList } from "./components/policy-list/PolicyList";
import FilterPanel from "./components/filter-panel/FilterPanel";
import { Filters } from "./components/filter-panel/FilterPanel.types";
import { ThemeProvider } from "next-themes";
import PolicyLineChart from "./components/charts/PolicyLineChart";
import {
  useFilteredPolicies,
  useFilterOptions,
  usePolicies,
} from "./components/hooks";

export default function Home() {
  const filterOptions = useFilterOptions();
  const policies = usePolicies();
  const [filters, setFilters] = useState<Filters>({
    topics: [],
    statuses: [],
    locations: [],
    dateIntroduced: { from: "", to: "" },
  });
  const [selectKey, setSelectKey] = useState(1); // for select filter
  const filteredPolicies = useFilteredPolicies(policies, filters);

  // Reset filters function
  const resetFilters = useCallback(() => {
    setSelectKey(selectKey + 1);
    setFilters({
      topics: [],
      statuses: [],
      locations: [],
      dateIntroduced: { from: "", to: "" },
    });
  }, [selectKey]);

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
        filterOptions={filterOptions}
        resetFilters={resetFilters}
        selectKey={selectKey}
      />
      <PolicyList policies={memoizedFilteredPolicies} />
    </ThemeProvider>
  );
}
