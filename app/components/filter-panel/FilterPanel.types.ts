interface FilterObj {
    id: string | number;
    name: string;
  }
  
  interface FilterOptions {
    topics: FilterObj[];
    statuses: FilterObj[];
    locations: FilterObj[];
    dateIntroduced: { from: string, to: string }
  }
  
  interface DateIntroduced {
    from: string;
    to: string;
  }
  
  interface Option {
    label: string;
    value: number | string;
  }
  
  interface Filters {
    topics:  [];
    statuses: Option[];
    locations: Option[];
    dateIntroduced: DateIntroduced;
  }
  
  interface FilterPanelProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
    filterOptions: FilterOptions;
    resetFilters: () => void;
  }
  

  export type { FilterObj as FilterOption, FilterOptions, DateIntroduced, Option, Filters, FilterPanelProps }