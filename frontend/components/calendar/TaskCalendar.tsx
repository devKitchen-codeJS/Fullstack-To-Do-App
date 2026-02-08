"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import CalendarTaskModal from "./CalendarTaskModal";



function getCalendarDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);

  // 0 (Вс) → 6 (Сб) → делаем Пн первым
  const dayOfWeek = firstDayOfMonth.getDay();
  const mondayIndex = (dayOfWeek + 6) % 7;

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(firstDayOfMonth.getDate() - mondayIndex);

  const days: Date[] = [];

  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push(d);
  }

  return days;
}

function formatMonth(date: Date) {
  return date.toLocaleString("ru-RU", {
    month: "long",
    year: "numeric",
  });
}



export function TaskCalendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const days = useMemo(
    () => getCalendarDays(currentDate),
    [currentDate]
  );

  const currentMonth = currentDate.getMonth();

  function prevMonth() {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  }

  const handleNewTask = () => {
    return <CalendarTaskModal />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="px-3 py-1 rounded bg-muted/20 hover:bg-muted/80"
        >
          ←
        </button>

        <h2 className="text-xl font-semibold capitalize">
          {formatMonth(currentDate)}
        </h2>

        <button
          onClick={nextMonth}
          className="px-3 py-1 rounded bg-muted/20 hover:bg-muted/80"
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-sm text-muted-foreground">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
          <div key={day} className="p-2 text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px rounded-lg  bg-blue-300/80">
        {days.map((date) => {
          const isCurrentMonth =
            date.getMonth() === currentMonth;

          const isToday =
            date.toDateString() === new Date().toDateString();

          return (
            <div
              key={date.toISOString()}
              className={clsx(
                "h-28 bg-white p-2 text-sm flex flex-col ",
                !isCurrentMonth && "opacity-70",
                isToday && "border rounded-lg hover:bg-yellow-100 border-yellow-400"
              )}
              onClick={handleNewTask}
            >
              <span className="font-medium">
                {date.getDate()}
              </span>

              {/* Здесь будут задачи */}
              <div className="mt-1 flex-1 space-y-1 text-xs text-muted-foreground">
                {/* placeholder */}
                {/* <div className=" bg-red-300 border rounded-lg">New Task</div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}