"use client";

import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery } from "@/state/api";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import Header from "@/components/Header";

type TaskTypeItems = "task" | "milestone" | "project";

const TimeLineView = () => {
  // Determine if dark mode is active
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Fetch projects data using the API query
  const { data: projects, isLoading, error } = useGetProjectsQuery();

  // State for managing Gantt chart display options
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: navigator.language || "en-US", // Automatically set locale based on the browser's settings
  });

  // Transform projects data into Gantt-compatible tasks
  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: project.startDate ? new Date(project.startDate) : new Date(),
        end: project.endDate ? new Date(project.endDate) : new Date(),
        name: project.name || "Unnamed Project", // Fallback for missing project names
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50, // Default progress if undefined
        isDisabled: false, // Default to enabled tasks
      })) || []
    );
  }, [projects]);

  // Handle changes in the view mode dropdown
  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode, // Update the view mode
    }));
  };

  // Loader UI while fetching projects
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="loader"></div> {/* Replace with a styled loader */}
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="text-center text-red-500">
        An error occurred while fetching projects. Please try again later.
      </div>
    );
  }

  // Empty state message if no projects are available
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center">
        No projects found. Start by creating a new project!
      </div>
    );
  }

  return (
    <div className="max-w-full p-8">
      {/* Header Section */}
      <header className="mb-4 flex items-center justify-between">
        <Header name="Project Timeline" />
        <div className="relative inline-block w-64">
          {/* Dropdown for selecting view mode */}
          <label htmlFor="viewModeSelect" className="sr-only">
            View Mode
          </label>
          <select
            id="viewModeSelect"
            aria-label="Select View Mode"
            className="focus:shadow-outline block w-full appearance-none rounded border border-green-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      {/* Gantt Chart Section */}
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks} // Pass the processed tasks
            {...displayOptions} // Spread display options
            columnWidth={
              displayOptions.viewMode === ViewMode.Month
                ? Math.max(window.innerWidth / 15, 100) // Dynamic column width
                : 100
            }
            listCellWidth="100px"
            // High-contrast background colors for white text
            projectBackgroundColor={isDarkMode ? "#1a1c23" : "#3b3f4c"}
            projectProgressColor={isDarkMode ? "#197278" : "#256d85"}
            projectProgressSelectedColor={isDarkMode ? "#1b5066" : "#1e6072"}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeLineView;
