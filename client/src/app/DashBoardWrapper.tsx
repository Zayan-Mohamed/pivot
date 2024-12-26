import React from "react";
import NavBar from "@/app/(components)/Navbar";
import SideBar from "@/app/(components)/SideBar";

const DashBoardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <SideBar />
      <main
        className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 md:pl-64`}
      >
        {/* NavBar */}
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default DashBoardWrapper;
