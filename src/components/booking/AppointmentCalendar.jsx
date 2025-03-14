import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  isWeekend,
  isWithinInterval,
  addMonths,
} from "date-fns";

const AppointmentCalendar = ({
  selectedDate,
  onDateSelect,
  bookedDates = [],
  disabledDates = [], // Add support for additional disabled dates
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Determine the first day of the week to add padding
    const startingDayIndex = monthStart.getDay();

    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            type="button" // Add type to prevent form submission
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="text-gray-600 hover:text-primary-600"
          >
            &larr;
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            type="button" // Add type to prevent form submission
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="text-gray-600 hover:text-primary-600"
          >
            &rarr;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-xs text-gray-500 font-medium">
              {day}
            </div>
          ))}

          {/* Add padding days */}
          {[...Array(startingDayIndex)].map((_, index) => (
            <div key={`empty-${index}`} className=""></div>
          ))}

          {days.map((day) => {
            const isSelected =
              selectedDate &&
              format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

            const isBookedDate = bookedDates.some(
              (bookedDate) =>
                format(bookedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
            );

            const isCustomDisabled = disabledDates.some(
              (disabledDate) =>
                format(disabledDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
            );

            const isDisabled =
              !isSameMonth(day, monthStart) ||
              isWeekend(day) ||
              isBookedDate ||
              isCustomDisabled ||
              day < new Date(); // Prevent selecting past dates

            return (
              <button
                type="button" // Prevent form submission
                key={day.toString()}
                onClick={() => !isDisabled && onDateSelect(day)}
                disabled={isDisabled}
                className={`
                  p-2 rounded-full text-sm 
                  ${isToday(day) ? "bg-primary-100 font-bold" : ""}
                  ${isSelected ? "bg-primary-600 text-white" : ""}
                  ${
                    isDisabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-primary-200"
                  }
                  ${isBookedDate ? "line-through text-red-400" : ""}
                  ${day < new Date() ? "bg-gray-100 text-gray-400" : ""}
                `}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return renderCalendar();
};

export default AppointmentCalendar;
