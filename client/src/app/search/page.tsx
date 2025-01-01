"use client";
import { useSearchQuery } from "@/state/api";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";

const SearchQuery = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 300);

  useEffect(() => {
    return () => handleSearch.cancel(); // Cleanup on unmount
  }, [handleSearch]);

  return (
    <div className="p-8 space-y-4 bg-white rounded shadow">
      <Header name="Search" />
      <div className="w-full max-w-lg">
        <input
          type="text"
          placeholder="Search for tasks, projects, or users"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleSearch}
        />
      </div>

      <div className="space-y-4">
        {isLoading && <div>Loading...</div>}
        {error && (
          <div>
            Error: {error && 'status' in error ? error.status : error?.message}
          </div>
        )}
        {!isLoading && !error && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Tasks</h2>
                {searchResults.tasks?.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}

            {searchResults.projects && searchResults.projects.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Projects</h2>
                {searchResults.projects?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}

            {searchResults.users && searchResults.users.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Users</h2>
                {searchResults.users?.map((user) => (
                  <UserCard key={user.userId} user={user} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchQuery;