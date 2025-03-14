import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import React from "react";

// Assuming same mock data as KindergartenDetails.jsx
const mockKindergartenData = [
  {
    id: 1,
    name: "Sunshine Kindergarten",
    location: "Nicosia, Cyprus",
    address: "123 Makarios Avenue, Nicosia",
    rating: 4.8,
    reviewCount: 56,
    ageRange: "2-6 years",
    languages: ["English", "Greek"],
    curriculum: "Montessori",
    images: ["https://via.placeholder.com/800x400"],
    description:
      "A nurturing environment focused on child-led learning and development.",
    longDescription:
      "Sunshine Kindergarten offers a Montessori-based educational approach that encourages children to learn at their own pace through hands-on experiences. Our carefully prepared environment promotes independence, concentration, and a love for learning. With a focus on holistic development, we nurture not just academic skills but social, emotional, and physical growth as well. Our dedicated teachers guide children through individualized learning journeys, respecting each child's unique personality and interests.",
    availableSpots: 5,
    tuitionFee: "€450/month",
    facilities: [
      "Outdoor playground",
      "Music room",
      "Art studio",
      "Library corner",
      "Sensory room",
    ],
    operatingHours: "Mon-Fri: 7:30 AM - 6:00 PM",
    // Mock available time slots for appointment booking
    availableTimeSlots: [
      {
        date: "2025-03-18",
        slots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      },
      {
        date: "2025-03-19",
        slots: ["10:00", "11:00", "13:00", "14:00", "16:00"],
      },
      {
        date: "2025-03-20",
        slots: ["09:00", "10:00", "13:00", "15:00", "16:00"],
      },
      {
        date: "2025-03-21",
        slots: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      },
      { date: "2025-03-22", slots: ["09:00", "10:00", "11:00", "12:00"] },
    ],
  },
  // Additional mock data would be here
];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [kindergarten, setKindergarten] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parentName: user?.name || "",
      parentEmail: user?.email || "",
      parentPhone: user?.phone || "",
      childName: "",
      childAge: "",
      childStartDate: "",
      message: "",
    },
  });

  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const foundKindergarten = mockKindergartenData.find(
        (k) => k.id === parseInt(id)
      );
      setKindergarten(foundKindergarten);
      setLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated()) {
      navigate("/login", { state: { from: `/booking/${id}` } });
    }
  }, [loading, isAuthenticated, navigate, id]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime("");

    // Find time slots for selected date
    const dateSlots = kindergarten.availableTimeSlots.find(
      (slot) => slot.date === date
    );
    setTimeSlots(dateSlots ? dateSlots.slots : []);
  };

  const onSubmit = (data) => {
    // Validate date and time selection
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time before submitting.");
      return;
    }

    // Prepare booking details to pass to dashboard
    const newBooking = {
      kindergartenId: kindergarten.id,
      kindergartenName: kindergarten.name,
      date: selectedDate,
      time: selectedTime,
      parentName: data.parentName,
      childName: data.childName,
      referenceNumber: bookingReference,
    };

    // In a real app, this would be an API call to create the booking
    console.log("Booking data:", newBooking);

    // Generate a random booking reference
    const reference = Math.random().toString(36).substring(2, 10).toUpperCase();
    setBookingReference(reference);
    setBookingDetails(newBooking);
    setBookingSuccess(true);
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard", {
      state: {
        newBooking: {
          kindergartenId: kindergarten.id,
          kindergartenName: kindergarten.name,
          date: selectedDate,
          time: selectedTime,
          referenceNumber: bookingReference,
          status: "pending",
        },
        preventDuplicateBooking: true, // Add this flag
      },
    });
  };
  // Booking step components
  const BookingSteps = () => {
    const steps = [
      "Select Date",
      "Select Time",
      "Enter Details",
      "Confirm Booking",
    ];

    return (
      <div className="flex justify-between items-center mb-8">
        {steps.map((stepName, index) => (
          <div
            key={stepName}
            className={`
              rounded-full px-4 py-2 
              ${step > index ? "bg-green-500 text-white" : "bg-gray-200"}
            `}
          >
            {stepName}
          </div>
        ))}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-primary-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  // Kindergarten not found
  if (!kindergarten) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Kindergarten not found
        </h2>
        <p className="mt-2 text-gray-600">
          The kindergarten you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/search" className="mt-6 inline-block btn btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  // Booking success view
  if (bookingSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Your appointment with {kindergarten.name} has been successfully
            scheduled.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Booking Reference</p>
                <p className="font-bold text-gray-900">{bookingReference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kindergarten</p>
                <p className="font-medium text-gray-900">{kindergarten.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium text-gray-900">
                  {selectedDate} at {selectedTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">
                  {kindergarten.address}
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-8">
            We've sent a confirmation email with all the details to your email
            address. If you need to reschedule or cancel your appointment,
            please contact us at least 24 hours in advance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button onClick={handleGoToDashboard} className="btn btn-primary">
              Go to Dashboard
            </button>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main booking form
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">
          Book a Visit at {kindergarten.name}
        </h1>

        <BookingSteps />

        {/* Step 1: Date Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-xl mb-4">Select a Date</h2>
            <div className="grid grid-cols-3 gap-4">
              {kindergarten.availableTimeSlots.map((slot) => (
                <button
                  key={slot.date}
                  onClick={() => {
                    handleDateSelect(slot.date);
                    setStep(2);
                  }}
                  className={`
                    py-2 px-4 rounded 
                    ${
                      selectedDate === slot.date
                        ? "bg-primary-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }
                  `}
                >
                  {new Date(slot.date).toLocaleDateString()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {step === 2 && (
          <div>
            <h2 className="text-xl mb-4">Select a Time Slot</h2>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(3);
                  }}
                  className={`
                    py-2 px-4 rounded 
                    ${
                      selectedTime === time
                        ? "bg-primary-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setStep(1)}
                className="btn btn-outline mr-2"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details Form */}
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl mb-4">Enter Booking Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Parent Name</label>
                <input
                  {...register("parentName", {
                    required: "Parent name is required",
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.parentName && (
                  <p className="text-red-500">{errors.parentName.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Parent Email</label>
                <input
                  type="email"
                  {...register("parentEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.parentEmail && (
                  <p className="text-red-500">{errors.parentEmail.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Child Name</label>
                <input
                  {...register("childName", {
                    required: "Child name is required",
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.childName && (
                  <p className="text-red-500">{errors.childName.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Child Age</label>
                <input
                  type="number"
                  {...register("childAge", {
                    required: "Child age is required",
                    min: {
                      value: 2,
                      message: "Child must be at least 2 years old",
                    },
                    max: {
                      value: 6,
                      message: "Child must be 6 years or younger",
                    },
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.childAge && (
                  <p className="text-red-500">{errors.childAge.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Preferred Start Date</label>
                <input
                  type="date"
                  {...register("childStartDate", {
                    required: "Start date is required",
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.childStartDate && (
                  <p className="text-red-500">
                    {errors.childStartDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Parent Phone Number</label>
                <input
                  type="tel"
                  {...register("parentPhone", {
                    required: "Phone number is required",
                    pattern: {
                      value:
                        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      message: "Invalid phone number format",
                    },
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.parentPhone && (
                  <p className="text-red-500">{errors.parentPhone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                {...register("message")}
                className="w-full px-3 py-2 border rounded"
                rows="4"
                placeholder="Any additional information you'd like to share"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-outline"
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking;
