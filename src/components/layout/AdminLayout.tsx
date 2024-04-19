import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"
import AdminNavbar from "../admin/AdminNavbar";
import Sidebar from "../admin/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Toaster />
    </div>
  );
}

export default AdminLayout;