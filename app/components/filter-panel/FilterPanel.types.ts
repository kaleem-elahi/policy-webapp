interface IFilterObj {
    id?: number;
    label?: string | number;
    value?: number;
  }
  
  interface IFiltersData {
    topics: IFilterObj[];
    statuses: IFilterObj[];
    locations: IFilterObj[];
    dateIntroduced?: { from?: string, to?: string };
  }
  
  interface IDateIntroduced {
    from: string;
    to: string;
  }
  
  interface IOption {
    id: number;
    label: string | number;
    value: number;
  }
  
  interface IFiltersOptions {
    topics:  IOption[];
    statuses: IOption[];
    locations: IOption[];
    dateIntroduced: IDateIntroduced;
  }
  
  interface IFilterPanelProps {
    filters: IFiltersOptions;
    setFilters: (filters: IFiltersOptions) => void;
    filterOptions: IFiltersOptions;
    resetFilters: () => void;
    selectKey: number;
  }
  

  export type { IFilterObj, IFiltersData, IDateIntroduced, IOption, IFiltersOptions, IFilterPanelProps }