import React from "react";

const TimeSlotPicker = ({ selectedDate, onTimeSelect, selectedTime }) => {
  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      // Morning slots
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Disable time selection if no date is selected
  if (!selectedDate) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
        Please select a date first
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {timeSlots.map((time) => (
        <button
          key={time}
          type="button"
          onClick={() => onTimeSelect(time)}
          className={`
            px-3 py-2 rounded-md text-sm 
            ${
              selectedTime === time
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-primary-100"
            }
            transition-colors duration-200
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
