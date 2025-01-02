import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { useGetTasksQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { GridRenderCellParams } from "@mui/x-data-grid";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};


const renderStatus = (params: GridRenderCellParams) => (
  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
    {params.value as string}
  </span>
);

const renderUsername = (params: GridRenderCellParams) =>
  (params.value as { username?: string })?.username || "Unknown";
const renderAssignee = (params: GridRenderCellParams) =>
  (params.value as { username?: string })?.username || "Unassigned";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 100 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: renderStatus,
  },
  { field: "priority", headerName: "Priority", width: 200 },
  { field: "tags", headerName: "Tags", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "dueDate", headerName: "Due Date", width: 130 },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: renderUsername,
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: renderAssignee,
  },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <div>An error occurred: {JSON.stringify(error)}</div>;
  if (!tasks || tasks.length === 0)
    return <div>No tasks available for this project.</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Project Task Table"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-green-primary px-3 py-2 text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              {" "}
              New Task{" "}
            </button>
          }
          isSmallerText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default TableView;
