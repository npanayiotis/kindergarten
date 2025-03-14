import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("bookings");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Initialize bookings from localStorage or empty array
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("userBookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Function to add a new booking
  const addNewBooking = useCallback(
    (newBooking) => {
      const bookingToAdd = {
        ...newBooking,
        id: Date.now(),
        referenceNumber:
          newBooking.referenceNumber ||
          `REF${Math.floor(Math.random() * 100000)}`,
        status: "pending",
      };

      const updatedBookings = [...bookings, bookingToAdd];
      setBookings(updatedBookings);
      localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    },
    [bookings]
  );

  // Function to cancel a booking
  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
    );

    setBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    setSelectedBooking(null);
  };

  // Function to reactivate a cancelled booking
  const handleReactivateBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "pending" } : booking
    );

    setBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    setSelectedBooking(null);
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { state: { from: "/dashboard" } });
      return;
    }

    const fetchUserData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const newBooking = location.state?.newBooking;
        const preventDuplicate = location.state?.preventDuplicateBooking;

        if (newBooking && preventDuplicate) {
          addNewBooking(newBooking);
          navigate(location.pathname, { replace: true, state: {} });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate, location.state, addNewBooking]);

  // Render booking status
  const renderBookingStatus = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  // Booking Details Modal
  const BookingDetailsModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Kindergarten</p>
              <p className="font-medium">{booking.kindergartenName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium">
                {booking.date} at {booking.time}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Parent Name</p>
              <p className="font-medium">{booking.parentName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Child Name</p>
              <p className="font-medium">{booking.childName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Reference Number</p>
              <p className="font-medium">{booking.referenceNumber}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              {renderBookingStatus(booking.status)}
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            {booking.status !== "cancelled" && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="btn btn-outline-red"
              >
                Cancel Booking
              </button>
            )}

            {booking.status === "cancelled" && (
              <button
                onClick={() => handleReactivateBooking(booking.id)}
                className="btn btn-outline-green"
              >
                Reactivate Booking
              </button>
            )}

            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render bookings tab
  const renderBookingsTab = () => {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            My Bookings
          </h3>
        </div>
        <div className="border-t border-gray-200">
          {bookings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No bookings found
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {booking.kindergartenName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.date} at {booking.time}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ref: {booking.referenceNumber}
                      </p>
                    </div>
                    <div>{renderBookingStatus(booking.status)}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    );
  };

  // Rest of the component remains the same...

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, {user?.name || "User"}
          </p>
        </div>
        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-3 py-2 ${
                activeTab === "bookings"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-md`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-3 py-2 ${
                activeTab === "profile"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-md`}
            >
              Profile
            </button>
          </nav>
        </div>
        {/* Bookings Tab */}
        {activeTab === "bookings" && renderBookingsTab()}
        {/* Profile Tab */}

        {activeTab === "profile" && (
          // Profile tab content remains the same...
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {editProfile ? "Edit Profile" : "Profile Information"}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and contact information
              </p>
            </div>
            <div className="border-t border-gray-200">
              {editProfile ? (
                <form
                  onSubmit={handleProfileUpdate}
                  className="px-4 py-5 sm:p-6"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditProfile(false)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileData.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileData.email}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {profileData.phone || "Not provided"}
                      </dd>
                    </div>
                  </dl>
                  <div className="bg-white px-4 py-5 sm:px-6">
                    <button
                      onClick={() => setEditProfile(true)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
