"use client";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { Priority, Task, useGetAuthUserQuery, useGetTasksByUserQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "priority", headerName: "Priority", width: 150 },
  { field: "dueDate", headerName: "Due Date", width: 150 },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const { data: currentUser } = useGetAuthUserQuery({});
  const userId = currentUser?.userDetails?.userId ?? null;
  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const fileredTasks =
    tasks?.filter((task: Task) => task.priority === priority) || [];

  if (isTaskError) return <div>Error fetching tasks</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority"
        buttonComponent={
          <button
            className="mr-3 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("list")}
        >
          List View ({fileredTasks.length})
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("table")}
        >
          Table View ({fileredTasks.length}){" "}
        </button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {fileredTasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}

        </div>
      ): (
        view === "table" && fileredTasks && (
          <div className="overflow-x-auto w-full">
            <DataGrid 
            rows={fileredTasks}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.id}
            className={dataGridClassNames}
            sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        ))}

    </div>
  );
};

export default ReusablePriorityPage;
