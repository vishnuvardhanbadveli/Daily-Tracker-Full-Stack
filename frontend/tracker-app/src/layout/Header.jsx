import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiCheckSquare,
} from "react-icons/fi";

function Header({
  monthLabel,
  onPrevMonth,
  onNextMonth,
  onAddTask,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface-0/95">
      <div className="mx-auto flex min-h-16 max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-accent/15 text-accent">
            <FiCheckSquare size={17} />
          </div>

          <span className="text-md font-semibold text-text-primary">
            Daily Tracker
          </span>
        </div>


        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Month Selector */}
          <div className="flex items-center rounded border border-border bg-surface-1">

            <button
              type="button"
              onClick={onPrevMonth}
              aria-label="Previous month"
              className="flex h-8 w-8 items-center justify-center rounded-l text-text-secondary transition-colors duration-150 hover:bg-surface-3 hover:text-text-primary"
            >
              <FiChevronLeft size={16} />
            </button>


            <span className="flex h-8 min-w-[100px] items-center justify-center border-x border-border px-2 text-sm font-medium text-text-primary sm:min-w-[112px]">
              {monthLabel}
            </span>


            <button
              type="button"
              onClick={onNextMonth}
              aria-label="Next month"
              className="flex h-8 w-8 items-center justify-center rounded-r text-text-secondary transition-colors duration-150 hover:bg-surface-3 hover:text-text-primary"
            >
              <FiChevronRight size={16} />
            </button>

          </div>


          {/* Add Task */}
          <button
            type="button"
            onClick={onAddTask}
            className="flex h-8 items-center gap-1.5 rounded bg-accent px-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover"
          >
            <FiPlus size={15} />
            <span className="hidden sm:inline">
              Add Task
            </span>
            <span className="sm:hidden">
              Add
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}

export default Header;