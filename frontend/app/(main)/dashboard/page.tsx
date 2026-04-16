import { WindowProvider } from "@/app/context/Window/WindowContext";

import Container from "@/components/layout/Container";
import DragableContainer from "@/components/dragable_area/DragableContainer";
import EditSidebarMenu from "@/components/layout/EditSidebarMenu";
import Sidebar from "@/components/layout/SIdebar";
import AppSidebar from "@/components/layout/SIdebar";

const Dashboard = () => {
  return (
    <div className=' relative bg-secondary h-[calc(100vh-76px)] pl-16 w-full'>
      <EditSidebarMenu />
      <AppSidebar />
      <DragableContainer />
    </div>
  );
};

export default Dashboard;
