import { TaskCalendar } from "@/components/calendar/TaskCalendar";
import Container from "@/components/layout/Container";
import React from "react";

const Dashboard = () => {
  return (
    <Container>
      <div>Welcome to the Dashboard!</div>
      <TaskCalendar />
    </Container>
  );
};

export default Dashboard;
