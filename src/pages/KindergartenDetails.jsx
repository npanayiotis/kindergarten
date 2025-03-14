import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import React from "react";
const KindergartenDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

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

  // Function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="h-5 w-5 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            className="h-5 w-5 text-yellow-500"
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

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Images */}
      <div className="relative">
        <div className="h-64 md:h-96 bg-gray-200 overflow-hidden">
          <img
            src={kindergarten.images[0]}
            alt={kindergarten.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay with darker opacity for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
            <div className="text-white">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl drop-shadow-md">
                {kindergarten.name}
              </h1>
              <p className="text-lg mt-2 drop-shadow-md">
                {kindergarten.address}
              </p>
              <div className="flex items-center mt-3 space-x-2">
                <div className="flex items-center">
                  {renderStars(kindergarten.rating)}
                  <span className="ml-2 text-white drop-shadow-md">
                    {kindergarten.rating.toFixed(1)} ({kindergarten.reviewCount}{" "}
                    reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column: Info & Tabs */}
          <div className="lg:col-span-2">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200">
                <h3 className="text-sm text-gray-500">Age Range</h3>
                <p className="text-lg font-medium text-gray-900">
                  {kindergarten.ageRange}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200">
                <h3 className="text-sm text-gray-500">Languages</h3>
                <p className="text-lg font-medium text-gray-900">
                  {kindergarten.languages.join(", ")}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200">
                <h3 className="text-sm text-gray-500">Curriculum</h3>
                <p className="text-lg font-medium text-gray-900">
                  {kindergarten.curriculum}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200">
                <h3 className="text-sm text-gray-500">Hours</h3>
                <p className="text-lg font-medium text-gray-900">
                  {kindergarten.operatingHours.split(":")[0]}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <div className="flex -mb-px space-x-8">
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "overview"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "facilities"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("facilities")}
                >
                  Facilities
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "reviews"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About {kindergarten.name}
                </h2>
                <p className="text-gray-700 mb-6">{kindergarten.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Key Information
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>
                          Ages: {kindergarten.ageRange.replace("Ages ", "")}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Tuition: {kindergarten.tuitionFee}</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>
                          Languages: {kindergarten.languages.join(", ")}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Hours of Operation
                    </h3>
                    <p className="text-gray-700">
                      {kindergarten.operatingHours}
                    </p>
                    <p className="mt-4 text-gray-700">
                      {kindergarten.availableSpots}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "facilities" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Our Facilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {kindergarten.facilities.map((facility, index) => (
                    <div key={index} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-blue-500 mr-3 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {facility}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nulla vitae elit libero.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kindergarten.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden h-40 shadow-md"
                    >
                      <img
                        src={image}
                        alt={`Facility ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Parent Reviews
                  </h2>
                  <div className="flex items-center">
                    {renderStars(kindergarten.rating)}
                    <span className="ml-2 text-gray-700 font-medium">
                      {kindergarten.rating.toFixed(1)}
                    </span>
                    <span className="ml-2 text-gray-500">
                      ({kindergarten.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {kindergarten.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {review.author}
                          </h3>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <p className="mt-3 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded transition duration-150">
                    See all reviews
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Booking & Contact */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Book an Appointment
              </h2>
              <p className="text-gray-700 mb-6">
                Schedule a visit to learn more about our programs and
                facilities.
              </p>

              <Link
                to={`/booking/${kindergarten.id}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150 text-center block"
              >
                Book Now
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Contact Information
                </h3>
                <ul className="space-y-3">
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
                    <span className="text-gray-700">
                      {kindergarten.address}
                    </span>
                  </li>
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-700">+357 22 123456</span>
                  </li>
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      info@sunshinekindergarten.cy
                    </span>
                  </li>
                </ul>

                <div className="mt-6">
                  <button className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded transition duration-150 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Virtual Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Kindergartens Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Similar Kindergartens in {kindergarten.location}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="h-40 bg-gray-200">
                  <img
                    src="/api/placeholder/400/300"
                    alt="Kindergarten"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Rainbow Kids {item}</h3>
                  <p className="text-sm text-gray-600">
                    {kindergarten.location}, Cyprus
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">Ages 2-5</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      Ages 2-5
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      English/Greek
                    </span>
                  </div>
                  <Link
                    to={`/kindergartens/${item + 10}`}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150 text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KindergartenDetails;
