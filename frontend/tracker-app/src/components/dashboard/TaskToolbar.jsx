import { FiSearch, FiPlus } from "react-icons/fi";

const FILTER_OPTIONS = [
  { value: "all", label: "All Tasks" },
  { value: "completed-today", label: "Completed Today" },
  { value: "pending-today", label: "Pending Today" },
];

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "progress-desc", label: "Progress: High to Low" },
  { value: "progress-asc", label: "Progress: Low to High" },
];

function TaskToolbar({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  sortValue,
  onSortChange,
  onAddTask,
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-3 md:flex-row md:items-center">
      {/* Search */}
      <div className="relative flex-1 md:max-w-sm">
        <FiSearch
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="w-full rounded border border-border bg-surface-0 py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-border-strong focus:outline-none"
        />
      </div>

      {/* Filter */}
      <select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        aria-label="Filter tasks"
        className="rounded border border-border bg-surface-0 px-3 py-2 text-sm text-text-primary focus:border-border-strong focus:outline-none"
      >
        {FILTER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort tasks"
        className="rounded border border-border bg-surface-0 px-3 py-2 text-sm text-text-primary focus:border-border-strong focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            Sort: {option.label}
          </option>
        ))}
      </select>

      
    </div>
  );
}

export default TaskToolbar;