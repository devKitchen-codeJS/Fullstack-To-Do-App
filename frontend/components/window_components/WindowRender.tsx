import { TaskCalendar } from "@/components/calendar/TaskCalendar";
import { WindowState } from "../../utils/types";

function WindowRender({ window }: { window: WindowState }) {
  switch (window.type) {
    case "calendar":
      return <TaskCalendar />;

    case "chat":
      return <TaskCalendar />;

    // case "chart":
    //   return <ChartWidget />;

    // case "todo":
    //   return <TodoWidget />;

    default:
      return null;
  }
}

export default WindowRender;
