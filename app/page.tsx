// Import necessary dependencies
"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Header } from "./components/header/Header";
import { PolicyList } from "./components/policy-list/PolicyList";
import FilterPanel from "./components/filter-panel/FilterPanel";
import {
  FilterOptions,
  Filters,
} from "./components/filter-panel/FilterPanel.types";
import { ThemeProvider } from "next-themes";
import PolicyLineChart from "./components/charts/PolicyLineChart";
import { useFilteredPolicies } from "./components/hooks";

// Custom hooks for data fetching
const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    topics: [],
    statuses: [],
    locations: [],
    dateIntroduced: { from: "", to: "" },
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch("http://localhost:5050/filterOptions");
        const data = await response.json();
        setFilterOptions(data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  return filterOptions;
};

const usePolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:5050/policies");
        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  return policies;
};

// Main component
export default function Home() {
  const filterOptions = useFilterOptions();
  const policies = usePolicies();
  const [filters, setFilters] = useState<Filters>({
    topics: [],
    statuses: [],
    locations: [],
    dateIntroduced: { from: "", to: "" },
  });

  const filteredPolicies = useFilteredPolicies(policies, filters);

  // Reset filters function
  const resetFilters = useCallback(() => {
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
      <PolicyLineChart policies={memoizedFilteredPolicies} />
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        resetFilters={resetFilters}
      />
      <PolicyList policies={memoizedFilteredPolicies} />
    </ThemeProvider>
  );
}
