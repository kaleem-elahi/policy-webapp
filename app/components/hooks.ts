import { useEffect, useState } from "react";
import { Policy } from "./policy-list/PolicyCard";
import { Filters, Option } from "./filter-panel/FilterPanel.types";

// Custom hook for filtering policies
export const useFilteredPolicies = (policies: Policy[], filters: Filters) => {
    const [filteredPolicies,  setFilteredPolicies] = useState<Policy[]>([]);
  
    useEffect(() => {
      const applyTopicFilter = (policies: Policy[], selectedTopics: string[]) =>
        selectedTopics.length === 0
          ? policies
          : policies.filter((policy) => selectedTopics.includes(policy.topic));
  
      const applyStatusFilter = (
        policies: Policy[],
        selectedStatuses: string[]
      ) =>
        selectedStatuses.length === 0
          ? policies
          : policies.filter((policy) => selectedStatuses.includes(policy.status));
  
      const applyLocationFilter = (
        policies: Policy[],
        selectedLocations: string[]
      ) =>
        selectedLocations.length === 0
          ? policies
          : policies.filter((policy) =>
              selectedLocations.includes(policy.location)
            );
  
      const applyDateFilter = (
        policies: Policy[],
        fromDate: Date | null,
        toDate: Date | null
      ) =>
        policies.filter((policy) => {
          const policyDate = new Date(policy.dateIntroduced);
          return (
            (!fromDate || policyDate >= fromDate) &&
            (!toDate || policyDate <= toDate)
          );
        });
  
      let filtered = policies;
  
      // Apply filters sequentially
      if (filters?.topics?.length > 0) {
        const selectedTopics = filters.topics.map((item: Option) => item.label);
  
        filtered = applyTopicFilter(filtered, selectedTopics);
      }
  
      if (filters?.statuses?.length > 0) {
        const selectedStatuses = filters.statuses.map(
          (item: Option) => item.label
        );
        filtered = applyStatusFilter(filtered, selectedStatuses);
      }
      if (filters?.locations?.length > 0) {
        const selectedLocations = filters.locations.map(
          (item: Option) => item.label
        );
        filtered = applyLocationFilter(filtered, selectedLocations);
      }
      if (filters.dateIntroduced.from || filters.dateIntroduced.to) {
        const fromDate = filters.dateIntroduced.from
          ? new Date(filters.dateIntroduced.from)
          : null;
        const toDate = filters.dateIntroduced.to
          ? new Date(filters.dateIntroduced.to)
          : null;
        filtered = applyDateFilter(filtered, fromDate, toDate);
      }
  
      setFilteredPolicies(filtered);
    }, [filters, policies]);
  
    return filteredPolicies;
  };
  