"use client";
import React, { useEffect } from "react";
import NavBar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import StoreProvider, { useAppSelector } from "./redux";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapesed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <SideBar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSidebarCollapesed ? "" : "md:pl-64"
        }`}
      >
        {/* NavBar */}
        <NavBar />
        {children}
      </main>
    </div>
  );
};

const DashBoardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashBoardLayout>{children}</DashBoardLayout>
    </StoreProvider>
  );
};

export default DashBoardWrapper;
