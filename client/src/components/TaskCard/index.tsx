import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const statusColors = {
    "To Do": "bg-yellow-100 text-yellow-700",
    "Work In Progress": "bg-blue-100 text-blue-700",
    "Under Review": "bg-green-100 text-green-700",
    Completed: "bg-red-100 text-red-700",
  };

  const priorityColors = {
    urgent: "text-red-700",
    high: "text-orange-600",
    medium: "text-yellow-500",
    low: "text-green-500",
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-dark-secondary dark:text-white hover:shadow-xl transition-shadow">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <strong className="block text-gray-600 dark:text-gray-300">Attachments:</strong>
          <div className="flex flex-wrap gap-2">
            <Image
              src={`https://ad-s3-images.s3.ap-southeast-2.amazonaws.com/${task.attachments?.[0]?.fileURL || ""}`}
              alt={task.attachments?.[0]?.fileName || "Attachment"}
              width={400}
              height={200}
              className="rounded-md border border-gray-300"
            />
          </div>
        </div>
      )}
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <strong>ID:</strong> {task.id}
      </p>
      <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {task.title}
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        <strong>Description:</strong> {task.description || "No Description Provided"}
      </p>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`mr-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
            statusColors[task.status as keyof typeof statusColors] || "bg-gray-100 text-gray-600"
          }`}
        >
          {task.status}
        </span>
        <span
          className={`inline-block text-sm font-semibold ${
            priorityColors[task.priority?.toLowerCase() as keyof typeof priorityColors] || "text-gray-600"
          }`}
        >
          Priority: {task.priority}
        </span>
      </div>
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        <strong>Tags:</strong> {task.tags || "No Tags Provided"}
      </p>
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        <strong>Start Date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "dd/MM/yyyy") : "Not Set"}
      </p>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        <strong>End Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "dd/MM/yyyy") : "Not Set"}
      </p>
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        <strong>Author:</strong> {task.author ? task.author.username : "Unknown Author"}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        <strong>Assignee:</strong> {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;