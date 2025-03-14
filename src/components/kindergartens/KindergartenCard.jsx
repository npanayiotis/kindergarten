import { Link } from "react-router-dom";
import React from "react";

const KindergartenCard = ({ kindergarten }) => {
  const {
    id,
    name,
    location,
    address,
    rating,
    reviewCount,
    ageRange,
    languages,
    curriculum,
    images,
    description,
    availableSpots,
    tuitionFee,
    facilities,
    operatingHours,
  } = kindergarten;

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
            className="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            className="h-5 w-5 text-yellow-400"
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="sm:flex">
        {/* Image with overlay status */}
        <div className="relative sm:flex-shrink-0">
          <img
            className="h-56 w-full object-cover sm:h-full sm:w-56"
            src={images[0]}
            alt={name}
          />
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {availableSpots > 0 ? "Spots Available" : "Fully Booked"}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                {name}
              </h2>
              <div className="flex items-center mt-1">
                <svg
                  className="h-4 w-4 text-gray-500 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-600">{address}</p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end mt-2 sm:mt-0">
              <div className="flex items-center">
                {renderStars(rating)}
                <span className="ml-2 text-sm font-medium text-gray-800">
                  {rating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-gray-500 ml-2 sm:ml-0">
                ({reviewCount} reviews)
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {ageRange}
            </span>
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
              >
                {lang}
              </span>
            ))}
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {curriculum}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-700 text-sm line-clamp-2">
            {description}
          </p>

          {/* Features */}
          <div className="mt-5 grid grid-cols-3 gap-3 bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="text-xs font-medium text-gray-500">Tuition Fee</p>
              <p className="text-sm font-bold text-gray-800">{tuitionFee}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">
                Available Spots
              </p>
              <p className="text-sm font-bold text-gray-800">
                {availableSpots}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Hours</p>
              <p className="text-sm font-medium text-gray-800">
                {operatingHours}
              </p>
            </div>
          </div>

          {/* Facilities chips */}
          {facilities && facilities.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Facilities
              </p>
              <div className="flex flex-wrap gap-1">
                {facilities.slice(0, 3).map((facility) => (
                  <span
                    key={facility}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {facility}
                  </span>
                ))}
                {facilities.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{facilities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Link
              to={`/kindergartens/${id}`}
              className="flex-1 px-4 py-2 bg-white border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors text-center"
            >
              View Details
            </Link>
            <Link
              to={`/booking/${id}`}
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors text-center shadow-sm"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KindergartenCard;
