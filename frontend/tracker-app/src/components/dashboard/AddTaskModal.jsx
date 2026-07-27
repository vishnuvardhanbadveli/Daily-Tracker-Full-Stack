import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

function AddTaskModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Task name is required");
      return;
    }

    onCreate(trimmedName);
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 transition-opacity duration-150 ease-out"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        onClick={(event) => event.stopPropagation()}
        className="mx-4 w-full max-w-sm animate-slideUp rounded-lg border border-border-strong bg-surface-2 shadow-float"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2
            id="add-task-title"
            className="text-md font-semibold text-text-primary"
          >
            Add Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-7 w-7 items-center justify-center rounded text-text-secondary transition-colors duration-150 hover:bg-surface-3 hover:text-text-primary"
          >
            <FiX size={15} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 px-5 py-4"
        >
          <div>
            <label
              htmlFor="task-name"
              className="mb-1.5 block text-xs text-text-secondary"
            >
              Task name
            </label>

            <input
              id="task-name"
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="e.g. Drink water"
              className={`w-full rounded border bg-surface-0 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-150 focus:outline-none ${
                error
                  ? "border-red-400"
                  : "border-border focus:border-border-strong"
              }`}
            />

            {error && (
              <p className="mt-1.5 text-xs text-red-400">
                {error}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 items-center rounded border border-border bg-surface-0 px-3 text-sm font-medium text-text-secondary transition-colors duration-150 hover:bg-surface-3 hover:text-text-primary"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex h-8 items-center rounded bg-accent px-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;