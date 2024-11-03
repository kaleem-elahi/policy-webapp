"use client";

import { useEffect, useState } from "react";
import { Header } from "./components/header/Header";
import { PolicyList } from "./components/policy-list/PolicyList";
import FilterPanel from "./components/filter-panel/FilterPanel";
import { Policy } from "./components/policy-list/PolicyCard";
import {
  FilterOptions,
  Filters,
  Option,
} from "./components/filter-panel/FilterPanel.types";
import { ThemeProvider } from "next-themes";

export default function Home() {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    topics: [],
    statuses: [],
    locations: [],
    dateIntroduced: { from: "", to: "" },
  });
  const [filters, setFilters] = useState<Filters>({
    topics: [],
    statuses: [],
    locations: [],
    dateIntroduced: { from: "", to: "" },
  });

  // Fetch filter options (topics, statuses, locations) from the API
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

  // Fetch policies from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:5050/policies");
        const data = await response.json();
        setPolicies(data);
        setFilteredPolicies(data); // Initially set all policies as filtered
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  // Filter policies based on selected filters
  useEffect(() => {
    let filtered = policies;
    console.log("🚀 ~ useEffect ~ filters:", filters);
    console.log("🚀 ~ useEffect ~/ policies:", policies);
    // Filter by topic
    if (filters?.topics?.length > 0) {
      const selectedTopics = filters.topics.map((item: Option) => item.label);

      filtered = filtered.filter((policy: Policy) =>
        selectedTopics.includes(policy.topic)
      );
    }

    // Filter by status
    if (filters?.statuses?.length > 0) {
      const selectedStatuses = filters.statuses.map(
        (item: Option) => item.label
      );
      filtered = filtered.filter((policy: Policy) =>
        selectedStatuses.includes(policy.status)
      );
    }

    // Filter by location
    if (filters?.locations?.length > 0) {
      const selectedLocations = filters.locations.map(
        (item: Option) => item.label
      );
      filtered = filtered.filter((policy: Policy) =>
        selectedLocations.includes(policy.location)
      );
    }

    // Filter by date range
    if (filters.dateIntroduced.from || filters.dateIntroduced.to) {
      const fromDate = filters.dateIntroduced.from
        ? new Date(filters.dateIntroduced.from)
        : null;
      const toDate = filters.dateIntroduced.to
        ? new Date(filters.dateIntroduced.to)
        : null;

      filtered = filtered.filter((policy: Policy) => {
        const policyDate = new Date(policy.dateIntroduced);
        return (
          (!fromDate || policyDate >= fromDate) &&
          (!toDate || policyDate <= toDate)
        );
      });
    }

    setFilteredPolicies(filtered);
  }, [filters, policies]);

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      topics: [],
      statuses: [],
      locations: [],
      dateIntroduced: { from: "", to: "" },
    });
  };

  return (
    <ThemeProvider attribute="class">
      <Header />
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        resetFilters={resetFilters}
      />
      <PolicyList policies={filteredPolicies} />
    </ThemeProvider>
  );
}
