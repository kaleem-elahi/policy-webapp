import { Typography } from "antd";
import React from "react";
import { DatePicker, Select } from "antd";
import {
  FilterPanelProps,
  Filters,
  FilterOption,
  Option,
} from "./FilterPanel.types";

const { RangePicker } = DatePicker;

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  filterOptions,
  resetFilters,
  selectKey,
}) => {
  const handleFilterChange = (
    name: keyof Filters,
    option: Option | Option[]
  ) => {
    setFilters({
      ...filters,
      [name]: option,
    });
  };

  const handleDateChange = (dateStrings: [string, string]) => {
    setFilters({
      ...filters,
      dateIntroduced: {
        from: dateStrings?.[0] ?? null,
        to: dateStrings?.[1] ?? null,
      },
    });
  };

  const isFilterApplied = (): boolean => {
    return (
      (filters.topics?.length ?? 0) > 0 ||
      (filters.statuses?.length ?? 0) > 0 ||
      (filters.locations?.length ?? 0) > 0 ||
      filters.dateIntroduced.from !== "" ||
      filters.dateIntroduced.to !== ""
    );
  };

  const renderFilterSelect = (
    name: keyof Filters,
    options: FilterOption[],
    placeholder: string
  ) => (
    <div>
      <label className="block font-semibold mb-1 ">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <Select
        key={selectKey + name}
        className="w-full"
        allowClear
        mode="multiple"
        placeholder={placeholder}
        optionFilterProp="label"
        options={options.map((option: FilterOption) => ({
          value: option.id,
          label: option.name,
        }))}
        onChange={(_value, option) => handleFilterChange(name, option)}
      />
    </div>
  );

  return (
    <div className=" max-w-7xl mx-auto py-6 px-4">
      <div className="flex justify-between">
        <h2 className=" font-semibold mb-4">Filters</h2>
        {isFilterApplied() && (
          <div>
            <Typography.Link
              onClick={resetFilters}
              className="text-orange-500 align-middle"
            >
              Reset Filters
            </Typography.Link>
          </div>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {renderFilterSelect("topics", filterOptions.topics, "Search Topics")}
        {renderFilterSelect(
          "statuses",
          filterOptions.statuses,
          "Search Statuses"
        )}
        {renderFilterSelect(
          "locations",
          filterOptions.locations,
          "Search Locations"
        )}

        <div>
          <label className="block font-semibold mb-1">Date Introduced</label>
          <RangePicker
            onChange={(_d, dateStrings) => handleDateChange(dateStrings)}
            key={selectKey + "dateIntroduced"}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
