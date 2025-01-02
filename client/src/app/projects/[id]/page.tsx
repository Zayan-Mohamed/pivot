"use client";
import React, { useEffect, useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "../BoardView";
import ListView from "../ListView";
import TimeLineView from "../TimeLineView";
import TableView from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";

type Props = {
  params: Promise<{ id: string }>;
};

const Project = ({ params }: Props) => {
  const [id, setId] = useState<string | null>(null);

  
  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id = {id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && id && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && id && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && id && (
        <TimeLineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && id && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
