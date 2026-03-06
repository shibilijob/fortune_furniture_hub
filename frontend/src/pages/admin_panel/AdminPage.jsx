import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../component/admin_component/side_bar/SideBar";

function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-400 gap-3 px-3 py-3">
      <SideBar />

      <main className="flex-1 rounded-tl-3xl shadow-inner overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;
