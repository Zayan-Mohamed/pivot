import Header from "@/components/Header";
import React from "react";


const Settings = () => {
  const userSettings = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  const labelStyles = "block text-sm font-medium text-gray-700 dark:text-gray-200 mt-4";
  const textStyles = "block w-full px-3 py-2 mt-1 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  
  return <div className="p-8" >
    <Header name="Settings" />
    <div className="mt-10 sm:mt-0 space-y-4">
    <div>
        <label htmlFor="username" className={labelStyles} > Username</label>
        <div className={textStyles} >
            {userSettings.name}
        </div>
    </div>
    <div>
        <label htmlFor="email" className={labelStyles} > Email</label>
        <div className={textStyles} >
            {userSettings.email}
        </div>
    </div>
    <div>
        <label htmlFor="teamName" className={labelStyles} > team Name</label>
        <div className={textStyles} >
            {userSettings.teamName}
        </div>
    </div>
    <div>
        <label htmlFor="roleName" className={labelStyles} > Role Name</label>
        <div className={textStyles} >
            {userSettings.roleName}
        </div>
    </div>
    </div>
  </div>;
};

export default Settings;
