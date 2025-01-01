import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";

type ListProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: ListProps) => {
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
  if (error) return <div>An error occured while fetching data</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="List" buttonComponent={
          <button className="flex items-center rounded-md bg-green-primary px-3 py-2 text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600" onClick={() => setIsModalNewTaskOpen(true)}> New Task </button>
        } isSmallerText />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"></div>
      {tasks?.map((tasks: Task) => <TaskCard key={tasks.id} task={tasks} />)}
    </div>
  );
};

export default ListView;
