import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  return (
    <div>
      {/* Hero Section with more vibrant background */}
      <div className="relative bg-gradient-to-b from-blue-700 to-blue-500">
        {/* Background pattern with increased opacity */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dotPattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="8" fill="white" />
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#dotPattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Find the Perfect Kindergarten</span>
                <span className="block">for Your Child in Cyprus</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-xl text-blue-100 sm:max-w-3xl">
                Discover, book appointments, and enroll your child in the best
                kindergartens across Cyprus with just a few clicks.
              </p>

              {/* Enhanced Search Box */}
              <div className="mt-12 max-w-xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-blue-100">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    Find Kindergartens Near You
                  </h3>
                  <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex-grow relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9l.7-1.414-4.242 4.242a1 1 0 01-1.415 0L5.05 12.657a7 7 0 010-9.9zM10 14a4 4 0 100-8 4 4 0 000 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <label htmlFor="location" className="sr-only">
                        Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        placeholder="Enter city or area in Cyprus"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="pl-10 block w-full px-4 py-4 rounded-lg border-2 border-blue-200 text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 focus:placeholder-gray-400"
                      />
                    </div>
                    <div className="">
                      <button
                        type="submit"
                        className="w-full h-full rounded-lg px-6 py-4 bg-yellow-500 text-lg font-semibold text-white shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-150"
                      >
                        <span className="flex items-center justify-center">
                          <span>Search</span>
                          <svg
                            className="ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => setLocation("Nicosia")}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium rounded-full transition"
                    >
                      Nicosia
                    </button>
                    <button
                      onClick={() => setLocation("Limassol")}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium rounded-full transition"
                    >
                      Limassol
                    </button>
                    <button
                      onClick={() => setLocation("Larnaca")}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium rounded-full transition"
                    >
                      Larnaca
                    </button>
                    <button
                      onClick={() => setLocation("Paphos")}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium rounded-full transition"
                    >
                      Paphos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              Everything You Need In One Place
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Our platform simplifies the process of finding and enrolling your
              child in the perfect kindergarten.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 shadow-md hover:shadow-lg transition duration-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Find and Compare
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Easily search and compare kindergartens across Cyprus
                      based on location, ratings, programs, and more.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 shadow-md hover:shadow-lg transition duration-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Book Appointments
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Schedule appointments with kindergarten managers online,
                      without the need for phone calls or emails.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 shadow-md hover:shadow-lg transition duration-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Easy Enrollment
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Complete application forms, upload required documents, and
                      manage the entire enrollment process online.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Kindergartens */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Popular Kindergartens in Cyprus
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover some of the highest-rated kindergartens across the island
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for kindergarten cards - these would be dynamically generated */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    Sunshine Kindergarten {item}
                  </h3>
                  <p className="text-gray-500 mt-2">Nicosia, Cyprus</p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">5.0 (48 reviews)</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      Ages 3-6
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      English/Greek
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      Montessori
                    </span>
                  </div>
                  <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-150">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded px-8 py-3 transition duration-150">
              View All Kindergartens
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              What Parents Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Hear from parents who found the perfect kindergarten for their
              children
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Maria Constantinou",
                role: "Parent of 2 children",
                quote:
                  "NestFinder made finding a kindergarten for my twins so much easier. The booking process was seamless, and I was able to compare different options side by side.",
              },
              {
                name: "Andreas Georgiou",
                role: "Father of a 4-year-old",
                quote:
                  "Being new to Cyprus, I had no idea where to start looking for kindergartens. This platform gave me all the information I needed in one place.",
              },
              {
                name: "Elena Papadopoulos",
                role: "Mother of a 3-year-old",
                quote:
                  "I was able to book appointments with three different kindergartens in less than 10 minutes. The enrollment process was straightforward and stress-free.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 relative"
              >
                <div className="absolute top-0 -mt-6 left-6">
                  <svg
                    className="h-12 w-12 text-blue-600 opacity-25"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="mt-8 text-lg text-gray-500">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">
              Ready to find the perfect kindergarten?
            </span>
            <span className="block">Start searching today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join thousands of parents across Cyprus who have found the ideal
            learning environment for their children.
          </p>
          <a
            href="/signup"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto transition duration-150"
          >
            Sign up for free
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
