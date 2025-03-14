import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import React from "react";

// Import components
import KindergartenList from "../components/kindergartens/KindergartenList";
import KindergartenFilter from "../components/kindergartens/KindergartenFilter";

// Mock data for now - would be fetched from an API in a real application
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
    images: ["https://via.placeholder.com/400x300"],
    description:
      "A nurturing environment focused on child-led learning and development.",
    availableSpots: 5,
    tuitionFee: "€450/month",
    facilities: ["Outdoor playground", "Music room", "Art studio"],
    operatingHours: "Mon-Fri: 7:30 AM - 6:00 PM",
  },
  {
    id: 2,
    name: "Little Explorers",
    location: "Limassol, Cyprus",
    address: "45 Seaside Road, Limassol",
    rating: 4.9,
    reviewCount: 42,
    ageRange: "3-6 years",
    languages: ["English", "Greek", "Russian"],
    curriculum: "Play-based",
    images: ["https://via.placeholder.com/400x300"],
    description:
      "Fostering curiosity and creativity through play-based learning experiences.",
    availableSpots: 3,
    tuitionFee: "€500/month",
    facilities: ["Swimming pool", "Science lab", "Library"],
    operatingHours: "Mon-Fri: 8:00 AM - 5:30 PM",
  },
  {
    id: 3,
    name: "Creative Minds",
    location: "Larnaca, Cyprus",
    address: "78 Palm Tree Avenue, Larnaca",
    rating: 4.7,
    reviewCount: 38,
    ageRange: "1.5-6 years",
    languages: ["English", "Greek"],
    curriculum: "Reggio Emilia",
    images: ["https://via.placeholder.com/400x300"],
    description:
      "Encouraging children to express themselves through various forms of artistic expression.",
    availableSpots: 7,
    tuitionFee: "€420/month",
    facilities: ["Art studio", "Garden", "Music room"],
    operatingHours: "Mon-Fri: 7:00 AM - 6:00 PM",
  },
  {
    id: 4,
    name: "Little Scholars Academy",
    location: "Paphos, Cyprus",
    address: "23 Coastal Boulevard, Paphos",
    rating: 4.6,
    reviewCount: 29,
    ageRange: "2.5-6 years",
    languages: ["English", "Greek", "French"],
    curriculum: "International",
    images: ["https://via.placeholder.com/400x300"],
    description:
      "Preparing children for global citizenship through multilingual education.",
    availableSpots: 4,
    tuitionFee: "€550/month",
    facilities: ["Computer lab", "Library", "Sports field"],
    operatingHours: "Mon-Fri: 8:00 AM - 5:00 PM",
  },
  {
    id: 5,
    name: "Nature Kids",
    location: "Nicosia, Cyprus",
    address: "56 Green Valley, Nicosia",
    rating: 4.9,
    reviewCount: 47,
    ageRange: "2-6 years",
    languages: ["English", "Greek"],
    curriculum: "Forest School",
    images: ["https://via.placeholder.com/400x300"],
    description:
      "Connecting children with nature through outdoor exploration and learning.",
    availableSpots: 6,
    tuitionFee: "€480/month",
    facilities: ["Large garden", "Animal corner", "Vegetable patch"],
    operatingHours: "Mon-Fri: 8:00 AM - 4:30 PM",
  },
  {
    id: 6,
    name: "Smart Steps",
    location: "Limassol, Cyprus",
    address: "12 Technology Street, Limassol",
    rating: 4.7,
    reviewCount: 35,
    ageRange: "3-6 years",
    languages: ["English", "Greek"],
    curriculum: "STEM-focused",
    images: ["https://via.placeholder.com/400x300"],
    description:
      "Building a strong foundation in science, technology, engineering, and mathematics.",
    availableSpots: 8,
    tuitionFee: "€520/month",
    facilities: ["Science lab", "Robotics workshop", "Outdoor playground"],
    operatingHours: "Mon-Fri: 7:30 AM - 6:00 PM",
  },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "";

  const [kindergartens, setKindergartens] = useState([]);
  const [filteredKindergartens, setFilteredKindergartens] = useState([]);
  const [filters, setFilters] = useState({
    location: initialLocation,
    ageRange: [],
    languages: [],
    curriculum: [],
    rating: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch kindergartens - in a real app, this would be an API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setKindergartens(mockKindergartenData);
      setLoading(false);
    }, 500);
  }, []);

  // Apply filters
  useEffect(() => {
    if (kindergartens.length === 0) return;

    let result = [...kindergartens];

    // Filter by location
    if (filters.location) {
      result = result.filter((k) =>
        k.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by age range
    if (filters.ageRange.length > 0) {
      // This is simplified - in a real app, would need more complex age range comparison
      result = result.filter((k) =>
        filters.ageRange.some((age) => k.ageRange.includes(age))
      );
    }

    // Filter by languages
    if (filters.languages.length > 0) {
      result = result.filter((k) =>
        filters.languages.every((lang) => k.languages.includes(lang))
      );
    }

    // Filter by curriculum
    if (filters.curriculum.length > 0) {
      result = result.filter((k) => filters.curriculum.includes(k.curriculum));
    }

    // Filter by rating
    if (filters.rating > 0) {
      result = result.filter((k) => k.rating >= filters.rating);
    }

    setFilteredKindergartens(result);
  }, [kindergartens, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Kindergartens in Cyprus
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {filteredKindergartens.length} kindergartens available
            {filters.location ? ` in ${filters.location}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <KindergartenFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Kindergarten list */}
          <div className="lg:col-span-3">
            {loading ? (
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
            ) : filteredKindergartens.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
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
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No kindergartens found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search filters.
                </p>
              </div>
            ) : (
              <KindergartenList kindergartens={filteredKindergartens} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
