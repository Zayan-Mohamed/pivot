"use client";
import { useGetUsersQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const customToolbar = () => {
    return (
        <GridToolbarContainer className="toolbar flex gap-2">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  {
    field: "username",
    headerName: "Username",
    width: 150,
    editable: true,
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 150,
    editable: true,
    renderCell: (params) => (
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-9 h-9">
          <Image
            src={`https://ad-s3-images.s3.ap-southeast-2.amazonaws.com/${params.value}`}
            alt="profile"
            width={100}
            height={50}
            className=" h-full object-cover rounded-full"
          />
        </div>
      </div>
    ),
  },
  {
    field: "teamId",
    headerName: "Team",
    width: 150,
    editable: true,
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const isDarkMoed = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div
        style={{ height: 650, width: "100%" }}
        className={`ag-theme-alpine ${isDarkMoed ? "ag-theme-alpine-dark" : ""}`}
      >
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId ?? ""}
          paginationModel={{ pageSize: 10, page: 0 }}
          pageSizeOptions={[10, 20, 50]}
          slots={{
            toolbar: customToolbar,
          }}
          checkboxSelection
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMoed)}
        />
      </div>
    </div>
  );
};

export default Users;
