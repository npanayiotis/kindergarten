import React from "react";
import { Link } from "react-router-dom";

const BookingConfirmation = ({ bookingDetails }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <div className="text-center">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600 mt-2">
          Your appointment has been successfully booked.
        </p>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Booking Details
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Kindergarten:</span>
            <span className="font-medium">
              {bookingDetails.kindergartenName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{bookingDetails.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{bookingDetails.time}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <Link to="/dashboard" className="flex-1 btn btn-primary">
          View Bookings
        </Link>
        <Link to="/search" className="flex-1 btn btn-outline">
          Find More Kindergartens
        </Link>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        A confirmation email has been sent to {bookingDetails.email}
      </div>
    </div>
  );
};

export default BookingConfirmation;
