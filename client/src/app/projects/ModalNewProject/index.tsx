import Modal from "@/components/Modal";
import { useCreateProjectMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createNewProject, { isLoading }] = useCreateProjectMutation();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (!projectName || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("End date must be after start date.");
      return;
    }

    const formattedStartDate = formatISO(new Date(startDate));
    const formattedEndDate = formatISO(new Date(endDate));

    try {
      await createNewProject({
        name: projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      // Reset form
      setProjectName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      onClose();
    } catch (error) {
      setError("Failed to create project. Please try again.");
      console.error(error);
    }
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent dark:bg-dark-secondary dark:border-stroke-dark dark:text-white dark:focus:ring-green-primary dark:focus:border-transparent";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      name="New Project"
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
          <div className="text-red-500 text-sm" role="alert">
            {error}
          </div>
        )}
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          aria-label="Project Name"
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Project Description"
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            aria-label="End Date"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-green-primary py-2 text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2"
          disabled={isLoading || !isFormValid()}
          aria-busy={isLoading}
        >
          {isLoading ? "Creating Project..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
