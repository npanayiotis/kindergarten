import { useState, useEffect } from "react";
import KindergartenCard from "./KindergartenCard";
import React from "react";

const KindergartenList = ({ kindergartens }) => {
  const [sortBy, setSortBy] = useState("rating"); // Default sort by rating
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading when sort changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [sortBy]);

  const sortedKindergartens = [...kindergartens].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "availableSpots") {
      return b.availableSpots - a.availableSpots;
    } else if (sortBy === "tuitionFee") {
      // Extract numeric value from tuition fee string (assumes format like "€500/month")
      const aFee = parseInt(a.tuitionFee.replace(/[^0-9]/g, "")) || 0;
      const bFee = parseInt(b.tuitionFee.replace(/[^0-9]/g, "")) || 0;
      return aFee - bFee;
    }
    return 0;
  });

  return (
    <div>
      {/* Sorting controls with improved styling */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white rounded-xl shadow-md px-5 py-4 border border-gray-100">
        <div className="flex items-center mb-4 sm:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
            <path d="M10 4a1 1 0 011 1v5a1 1 0 01-1 1 1 1 0 01-1-1V5a1 1 0 011-1z" />
            <path d="M10 12a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          <p className="text-sm text-gray-700">
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500"
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
                Updating results...
              </span>
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-blue-600">
                  {kindergartens.length}
                </span>{" "}
                kindergartens
              </>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View mode toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center justify-center rounded-md p-1.5 ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center justify-center rounded-md p-1.5 ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-sm transition-colors"
              >
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
                <option value="availableSpots">Available Spots</option>
                <option value="tuitionFee">Price: Low to High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* No results message */}
      {kindergartens.length === 0 && !isLoading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No kindergartens found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your filters or search for a different location.
          </p>
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="sm:flex">
                <div className="bg-gray-200 h-56 w-full sm:h-full sm:w-56"></div>
                <div className="p-6 sm:flex-1">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="flex gap-2 mb-6">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-10 bg-gray-200 rounded flex-1"></div>
                    <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kindergarten cards */}
      {!isLoading && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-6"
              : "space-y-6"
          }
        >
          {sortedKindergartens.map((kindergarten) => (
            <KindergartenCard
              key={kindergarten.id}
              kindergarten={kindergarten}
            />
          ))}
        </div>
      )}

      {/* Show more button - conditionally shown when there are more results */}
      {kindergartens.length > 5 && !isLoading && (
        <div className="mt-8 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-lg font-medium transition-colors shadow-sm">
            Show more kindergartens
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default KindergartenList;
