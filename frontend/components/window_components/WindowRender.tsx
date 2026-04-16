import { TaskCalendar } from "@/components/calendar/TaskCalendar";
import { WindowState, WindowType } from "../../utils/types";
function WindowRender({ window }: { window: WindowState }) {
  switch (window.type) {
    case WindowType.Calendar :
      return <TaskCalendar />;

    case WindowType.Chart:
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
