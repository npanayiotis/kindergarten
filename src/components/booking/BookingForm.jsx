import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AppointmentCalendar from "./AppointmentCalendar";
import TimeSlotPicker from "./TimeSlotPicker";

const BookingForm = ({ kindergartenDetails, onBookingComplete }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchedFields = watch();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const onSubmit = (data) => {
    // Combine form data with booking details
    const bookingDetails = {
      ...data,
      kindergartenName: kindergartenDetails.name,
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
    };

    onBookingComplete(bookingDetails);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Book an Appointment at {kindergartenDetails.name}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <AppointmentCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              bookedDates={
                [
                  /* array of already booked dates */
                ]
              }
              disabledDates={
                [
                  /* additional dates to disable */
                ]
              }
              // Pass any booked dates if you have them
              // bookedDates={bookedDates}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time Slot
            </label>
            <TimeSlotPicker
              selectedDate={selectedDate}
              onTimeSelect={setSelectedTime}
              selectedTime={selectedTime}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="parentName"
              className="block text-sm font-medium text-gray-700"
            >
              Parent/Guardian Name
            </label>
            <input
              id="parentName"
              type="text"
              placeholder="Enter your full name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 form-input"
              {...register("parentName", {
                required: "Parent name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.parentName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.parentName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 form-input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="additionalNotes"
            className="block text-sm font-medium text-gray-700"
          >
            Additional Notes (Optional)
          </label>
          <textarea
            id="additionalNotes"
            rows={3}
            placeholder="Any additional information or questions"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 form-input"
            {...register("additionalNotes")}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={!selectedDate || !selectedTime}
            className="w-full btn btn-primary py-3 disabled:opacity-50"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
