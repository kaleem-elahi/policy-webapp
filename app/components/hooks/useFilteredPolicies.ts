import { useEffect, useState } from "react";
import { IPolicy } from "../../dashboard/page";
import { IFiltersOptions } from "../filter-panel/FilterPanel.types";

// Custom hook for filtering policies
export const useFilteredPolicies = (policies: IPolicy[], filters: IFiltersOptions) => {
    const [filteredPolicies, setFilteredPolicies] = useState<IPolicy[]>([]);
  
    useEffect(() => {
      const filterByTopic = (policies: IPolicy[], selectedTopics: string[]) =>
        selectedTopics.length === 0
          ? policies
          : policies.filter((policy) => selectedTopics.includes(policy.topic));
  
      const filterByStatus = (policies: IPolicy[], selectedStatuses: string[]) =>
        selectedStatuses.length === 0
          ? policies
          : policies.filter((policy) => selectedStatuses.includes(policy.status));
  
      const filterByLocation = (policies: IPolicy[], selectedLocations: string[]) =>
        selectedLocations.length === 0
          ? policies
          : policies.filter((policy) => selectedLocations.includes(policy.location));
  
      const filterByDateRange = (policies: IPolicy[], fromDate: Date | null, toDate: Date | null) =>
        policies.filter((policy) => {
          const policyDate = new Date(policy.dateIntroduced);
          const isAfterFromDate = !fromDate || policyDate >= fromDate;
          const isBeforeToDate = !toDate || policyDate <= toDate;
          
          return isAfterFromDate && isBeforeToDate;
        });
  
      let result = policies;
  
      if (filters?.locations?.length > 0) {
      const selectedLocations = filters.locations.map((location) => location.label.toString());
      result = filterByLocation(result, selectedLocations);
      }
      
      if (filters?.statuses?.length > 0) {
        const selectedStatuses = filters.statuses.map((status) => status.label.toString());
        result = filterByStatus(result, selectedStatuses);
      }
      
      if (filters?.topics?.length > 0) {
        console.log("Filters:", filters);
        const selectedTopics = filters.topics.map((topic) => topic.label.toString());
        result = filterByTopic(result, selectedTopics);
      }

        console.log("Filters:", filters);
        
      if (filters?.dateIntroduced?.from || filters?.dateIntroduced?.to) {
        const fromDate = filters.dateIntroduced.from ? new Date(filters.dateIntroduced.from) : null;
        const toDate = filters.dateIntroduced.to ? new Date(filters.dateIntroduced.to) : null;
        result = filterByDateRange(result, fromDate, toDate);
      }
  
      setFilteredPolicies(result);
    }, [filters, policies]);  

    return filteredPolicies;
  };


