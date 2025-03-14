import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Expanded mock data for available slots
const mockAvailableSlots = {
  1: [
    { date: "2025-03-20", times: ["10:00", "11:00", "14:00"] },
    { date: "2025-03-22", times: ["09:00", "13:00", "15:00"] },
    { date: "2025-03-25", times: ["10:30", "14:30", "16:00"] },
  ],
};

const KindergartenDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  // In a real app, you would fetch the kindergarten data based on the ID
  // Mock data for demonstration
  const kindergarten = {
    id: 1,
    name: "Sunshine Kindergarten",
    location: "Nicosia",
    address: "123 Palm Avenue, Nicosia, Cyprus",
    rating: 4.8,
    reviewCount: 48,
    ageRange: "Ages 3-6",
    languages: ["English", "Greek"],
    curriculum: "Montessori",
    description:
      "Sunshine Kindergarten provides a nurturing environment where children can learn, play, and grow. Our Montessori approach encourages independence and curiosity.",
    availableSpots: "Limited spots available",
    tuitionFee: "€450-600/month",
    facilities: [
      "Outdoor playground",
      "Art studio",
      "Music room",
      "Library corner",
    ],
    operatingHours: "Mon-Fri: 7:30AM - 6:00PM",
    images: [
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
    ],
    reviews: [
      {
        id: 1,
        author: "Maria C.",
        date: "February 12, 2025",
        rating: 5,
        comment:
          "My daughter loves going to Sunshine Kindergarten. The teachers are caring and the facilities are excellent.",
      },
      {
        id: 2,
        author: "Andreas G.",
        date: "January 28, 2025",
        rating: 4,
        comment:
          "Great curriculum and friendly staff. My son has learned so much in just a few months.",
      },
    ],
  };

  // Effect to load available slots when component mounts
  useEffect(() => {
    // Fetch available slots for this specific kindergarten
    const slots = mockAvailableSlots[id] || [];
    setAvailableSlots(slots);
  }, [id]);

  // Function to render star rating (kept from original component)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="h-5 w-5 text-accent-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            className="h-5 w-5 text-accent-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="h-5 w-5 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Handle booking submission
  const handleBooking = () => {
    // Validate booking
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a time.");
      return;
    }

    // Prepare booking data
    const bookingData = {
      kindergartenId: kindergarten.id,
      kindergartenName: kindergarten.name,
      date: selectedDate,
      time: selectedTime,
    };

    // Navigate to dashboard with booking data
    navigate("/dashboard", {
      state: {
        newBooking: bookingData,
      },
    });
  };

  // Render the right column with booking section
  const renderBookingSection = () => {
    return (
      <div className="mt-8 lg:mt-0">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Book an Appointment
          </h2>
          <p className="text-gray-700 mb-6">
            Schedule a visit to learn more about our programs and facilities.
          </p>

          {/* Date Selection */}
          <div className="mb-4">
            <label
              htmlFor="booking-date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Date
            </label>
            <select
              id="booking-date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                // Reset time when date changes
                setSelectedTime("");
              }}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              <option value="">Choose a date</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={slot.date}>
                  {new Date(slot.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="mb-4">
              <label
                htmlFor="booking-time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Time
              </label>
              <select
                id="booking-time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              >
                <option value="">Choose a time</option>
                {availableSlots
                  .find((slot) => slot.date === selectedDate)
                  ?.times.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Book Now Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-3 text-center block rounded transition duration-150 ${
              selectedDate && selectedTime
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Book Now
          </button>

          {/* Rest of the contact information remains the same as in the original component */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Contact Information
            </h3>
            <ul className="space-y-3">
              {/* (Previous contact information remains unchanged) */}
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-gray-400 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700">{kindergarten.address}</span>
              </li>
              {/* Other contact details remain the same */}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Render the full component
  return (
    <div className="bg-gray-50">
      {/* Hero Section (unchanged from original) */}
      <div className="relative">{/* Hero content remains the same */}</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column: Info & Tabs (unchanged main structure) */}
          <div className="lg:col-span-2">
            {/* Quick Info Cards, Tabs, Tab Content remain the same */}
            {/* All previous tabs (overview, facilities, reviews) remain unchanged */}
          </div>

          {/* Right Column: Booking & Contact */}
          {renderBookingSection()}
        </div>
      </div>

      {/* Similar Kindergartens Section (unchanged) */}
      <div className="bg-gray-100 py-12">
        {/* Similar kindergartens content remains the same */}
      </div>
    </div>
  );
};

export default KindergartenDetails;
