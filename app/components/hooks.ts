import { useEffect, useState } from "react";
import { Policy } from "./policy-list/PolicyCard";
import { FilterOptions, Filters, Option } from "./filter-panel/FilterPanel.types";

// Custom hook for filtering policies
export const useFilteredPolicies = (policies: Policy[], filters: Filters) => {
    const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);
  
    useEffect(() => {
      const filterByTopic = (policies: Policy[], selectedTopics: string[]) =>
        selectedTopics.length === 0
          ? policies
          : policies.filter((policy) => selectedTopics.includes(policy.topic));
  
      const filterByStatus = (policies: Policy[], selectedStatuses: string[]) =>
        selectedStatuses.length === 0
          ? policies
          : policies.filter((policy) => selectedStatuses.includes(policy.status));
  
      const filterByLocation = (policies: Policy[], selectedLocations: string[]) =>
        selectedLocations.length === 0
          ? policies
          : policies.filter((policy) => selectedLocations.includes(policy.location));
  
      const filterByDateRange = (policies: Policy[], fromDate: Date | null, toDate: Date | null) =>
        policies.filter((policy) => {
          const policyDate = new Date(policy.dateIntroduced);
          const isAfterFromDate = !fromDate || policyDate >= fromDate;
          const isBeforeToDate = !toDate || policyDate <= toDate;
          return isAfterFromDate && isBeforeToDate;
        });
  
      let result = policies;
  
      if (filters?.topics?.length > 0) {
        const selectedTopics = filters.topics.map((topic: Option) => topic.label);
        result = filterByTopic(result, selectedTopics);
      }
  
      if (filters?.statuses?.length > 0) {
        const selectedStatuses = filters.statuses.map((status: Option) => status.label);
        result = filterByStatus(result, selectedStatuses);
      }

      if (filters?.locations?.length > 0) {
        const selectedLocations = filters.locations.map((location: Option) => location.label);
        result = filterByLocation(result, selectedLocations);
      }

      if (filters.dateIntroduced.from || filters.dateIntroduced.to) {
        const fromDate = filters.dateIntroduced.from ? new Date(filters.dateIntroduced.from) : null;
        const toDate = filters.dateIntroduced.to ? new Date(filters.dateIntroduced.to) : null;
        result = filterByDateRange(result, fromDate, toDate);
      }
  
      setFilteredPolicies(result);
    }, [filters, policies]);
  
    return filteredPolicies;
  };

export const usePolicies = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`http://localhost:5050/policies`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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


// Custom hooks for data fetching
export const useFilterOptions = () => {
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
