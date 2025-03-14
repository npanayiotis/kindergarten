import { useState } from "react";
import React from "react";

const KindergartenFilter = ({ filters, onFilterChange }) => {
  const [isCollapsed, setIsCollapsed] = useState({
    ageRange: false,
    languages: false,
    curriculum: false,
  });

  // Available filter options
  const ageRangeOptions = [
    "1-2 years",
    "2-3 years",
    "3-4 years",
    "4-5 years",
    "5-6 years",
  ];
  const languageOptions = [
    "English",
    "Greek",
    "Russian",
    "French",
    "German",
    "Arabic",
  ];
  const curriculumOptions = [
    "Montessori",
    "Play-based",
    "Reggio Emilia",
    "International",
    "STEM-focused",
    "Forest School",
  ];

  const handleLocationChange = (e) => {
    onFilterChange({ location: e.target.value });
  };

  const handleAgeRangeChange = (age) => {
    const newAgeRange = filters.ageRange.includes(age)
      ? filters.ageRange.filter((a) => a !== age)
      : [...filters.ageRange, age];

    onFilterChange({ ageRange: newAgeRange });
  };

  const handleLanguageChange = (language) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter((l) => l !== language)
      : [...filters.languages, language];

    onFilterChange({ languages: newLanguages });
  };

  const handleCurriculumChange = (curriculum) => {
    const newCurriculum = filters.curriculum.includes(curriculum)
      ? filters.curriculum.filter((c) => c !== curriculum)
      : [...filters.curriculum, curriculum];

    onFilterChange({ curriculum: newCurriculum });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ rating: parseInt(rating) });
  };

  const clearFilters = () => {
    onFilterChange({
      location: "",
      ageRange: [],
      languages: [],
      curriculum: [],
      rating: 0,
    });
  };

  const toggleSection = (section) => {
    setIsCollapsed({
      ...isCollapsed,
      [section]: !isCollapsed[section],
    });
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.location) count++;
    count += filters.ageRange.length;
    count += filters.languages.length;
    count += filters.curriculum.length;
    if (filters.rating > 0) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 border border-blue-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear all
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Location
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="City or area in Cyprus"
            value={filters.location}
            onChange={handleLocationChange}
            className="block w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 placeholder-gray-400 text-sm transition-colors"
          />
          {filters.location && (
            <button
              onClick={() => onFilterChange({ location: "" })}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Age Range Filter */}
      <div className="mb-6 border-t border-gray-100 pt-5">
        <button
          onClick={() => toggleSection("ageRange")}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Age Range
            {filters.ageRange.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {filters.ageRange.length}
              </span>
            )}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isCollapsed.ageRange ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {!isCollapsed.ageRange && (
          <div className="mt-3 space-y-2">
            {ageRangeOptions.map((age) => (
              <label
                key={age}
                className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.ageRange.includes(age)}
                  onChange={() => handleAgeRangeChange(age)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{age}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Languages Filter */}
      <div className="mb-6 border-t border-gray-100 pt-5">
        <button
          onClick={() => toggleSection("languages")}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            Languages
            {filters.languages.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {filters.languages.length}
              </span>
            )}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isCollapsed.languages ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {!isCollapsed.languages && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {languageOptions.map((language) => (
              <label
                key={language}
                className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.languages.includes(language)}
                  onChange={() => handleLanguageChange(language)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{language}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Curriculum Filter */}
      <div className="mb-6 border-t border-gray-100 pt-5">
        <button
          onClick={() => toggleSection("curriculum")}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Curriculum
            {filters.curriculum.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {filters.curriculum.length}
              </span>
            )}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isCollapsed.curriculum ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {!isCollapsed.curriculum && (
          <div className="mt-3 space-y-2">
            {curriculumOptions.map((curriculum) => (
              <label
                key={curriculum}
                className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.curriculum.includes(curriculum)}
                  onChange={() => handleCurriculumChange(curriculum)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{curriculum}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-t border-gray-100 pt-5">
        <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          Minimum Rating
          {filters.rating > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {filters.rating}+
            </span>
          )}
        </h3>
        <div className="px-2">
          <div className="flex items-center gap-4 mb-2">
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex items-center justify-center h-8 w-8 rounded-full transition-colors ${
                  filters.rating === rating
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {rating === 0 ? "Any" : rating}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span>Any</span>
            <span>5 stars</span>
          </div>
        </div>
      </div>

      {/* Apply Filters Button (for mobile) */}
      <div className="mt-6 sm:hidden">
        <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default KindergartenFilter;
