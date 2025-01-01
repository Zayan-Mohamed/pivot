import Modal from "@/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createNewTask, { isLoading }] = useCreateTaskMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    // Basic validations
    if (!title || !authorUserId || !(id !== null || projectId)) {
      setError("Title and Author User ID are required.");
      return;
    }
    if (startDate && dueDate && new Date(startDate) > new Date(dueDate)) {
      setError("Due date must be after the start date.");
      return;
    }

    const formattedStartDate = startDate
      ? formatISO(new Date(startDate))
      : undefined;
    const formattedDueDate = dueDate ? formatISO(new Date(dueDate)) : undefined;

    try {
      await createNewTask({
        title,
        description,
        status,
        priority,
        tags,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        authorUserId: parseInt(authorUserId),
        assignedUserId: parseInt(assignedUserId),
        projectId: id !== null ? Number(id) : Number(projectId),
      });

      // Reset form fields
      setTitle("");
      setDescription("");
      setStatus(Status.ToDo);
      setPriority(Priority.Backlog);
      setTags("");
      setStartDate("");
      setDueDate("");
      setAuthorUserId("");
      setAssignedUserId("");
      onClose();
    } catch (error) {
      setError("Failed to create task. Please try again.");
      console.error(error);
    }
  };

  const isFormValid = () => {
    return title && authorUserId && !(id !== null || projectId);
  };

  const selectStyles =
    "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent dark:bg-dark-secondary dark:border-stroke-dark dark:text-white dark:focus:ring-green-primary dark:focus:border-transparent";

  const inputStyles =
    "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent dark:bg-dark-secondary dark:border-stroke-dark dark:text-white dark:focus:ring-green-primary dark:focus:border-transparent";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      name="New Task"
      aria-labelledby="modal-title"
    >
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        aria-live="polite"
      >
        {error && (
          <div className="text-sm text-red-500" role="alert">
            {error}
          </div>
        )}
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Task Title"
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Task Description"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
            aria-label="Task Status"
          >
            {Object.values(Status).map((statusValue) => (
              <option key={statusValue} value={statusValue}>
                {statusValue}
              </option>
            ))}
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
            aria-label="Task Priority"
          >
            {Object.values(Priority).map((priorityValue) => (
              <option key={priorityValue} value={priorityValue}>
                {priorityValue}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          aria-label="Task Tags"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            aria-label="Start Date"
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Due Date"
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
          aria-label="Author User ID"
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
          aria-label="Assigned User ID"
        />
        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="Project ID"
            value={projectId || ""}
            onChange={(e) => setProjectId(e.target.value)}
            aria-label="Project ID"
          />
        )}
        <button
          type="submit"
          className="w-full rounded-md bg-green-primary py-2 text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2"
          disabled={isLoading || !isFormValid()}
          aria-busy={isLoading}
        >
          {isLoading ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
