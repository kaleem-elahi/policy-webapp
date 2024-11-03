import { Typography } from "antd";
import React from "react";
import { DatePicker, Select } from "antd";
import { FilterPanelProps, Filters, FilterOption } from "./FilterPanel.types";

const { RangePicker } = DatePicker;

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilters,
  filterOptions,
  resetFilters,
}) => {
  const handleFilterChange = (
    name: keyof Filters,
    option:
      | {
          value: string | number;
          label: string;
        }
      | {
          value: string | number;
          label: string;
        }[]
  ) => {
    // find type of tis
    // console.log(option);
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
      <label className="block font-semibold mb-1">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <Select
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
    <div className="mt-20 max-w-7xl mx-auto py-6 px-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="bg-white p-6 rounded-lg shadow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
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
          />
        </div>

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
    </div>
  );
};

export default FilterPanel;
