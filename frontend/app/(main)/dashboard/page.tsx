import { WindowProvider } from "@/app/context/Window/WindowContext";

import Container from "@/components/layout/Container";
import DragableContainer from "@/components/dragable_area/DragableContainer";
import EditSidebarMenu from "@/components/layout/EditSidebarMenu";


const Dashboard = () => {
  return (
    <Container className=' relative bg-secondary h-[calc(100vh-76px)] w-full'>
      <WindowProvider>
        <EditSidebarMenu />
        <DragableContainer />
      </WindowProvider>
    </Container>
  );
};

export default Dashboard;
