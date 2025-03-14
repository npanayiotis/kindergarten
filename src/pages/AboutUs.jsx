import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

function AboutUs() {
  const [activeSection, setActiveSection] = useState("mission");

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Subtle Design */}
      <div className="relative bg-gradient-to-r from-indigo-700 to-blue-500 overflow-hidden">
        {/* Hero content - SVG patterns, decorative elements, etc. */}
        <div className="absolute inset-0 opacity-10">
          {/* SVG pattern background */}
          <svg
            className="w-full h-full"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="8" fill="white" />
              </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#pattern)" />
          </svg>
        </div>

        {/* Decorative elements with reduced intensity */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-16 lg:mr-0 lg:right-1/4">
          <div className="w-64 h-64 bg-blue-400 rounded-full opacity-10 filter blur-3xl"></div>
        </div>
        <div className="absolute left-1/4 bottom-0 transform -translate-x-1/2 translate-y-1/4">
          <div className="w-40 h-40 bg-indigo-300 rounded-full opacity-10 filter blur-2xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28 flex flex-col items-center justify-center text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white mb-6">
              Our Story
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl max-w-3xl">
              <span className="block">Connecting Families with</span>
              <span className="block mt-1">Quality Education in Cyprus</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-white text-opacity-90 sm:max-w-2xl">
              NestFinder simplifies finding, comparing, and enrolling in the
              best kindergartens across Cyprus
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/search"
                className="px-8 py-3 rounded-lg bg-white text-indigo-600 hover:bg-opacity-90 font-medium transition-all shadow-md hover:shadow-lg"
              >
                Find Kindergartens
              </Link>
              <a
                href="#mission"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection("mission");
                  document
                    .getElementById("main-content")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 rounded-lg bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-medium transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Bottom wave with softer curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            fill="#f9fafb"
            preserveAspectRatio="none"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content with improved layout */}
      <div
        id="main-content"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Improved Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-8 border border-gray-100">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  About NestFinder
                </h3>
              </div>
              <nav className="flex flex-col py-2">
                {[
                  { id: "mission", label: "Our Mission" },
                  { id: "story", label: "Our Story" },
                  { id: "team", label: "Our Team" },
                  { id: "contact", label: "Contact Us" },
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`px-5 py-3 text-left flex items-center transition-all ${
                      activeSection === item.id
                        ? "text-indigo-600 bg-indigo-50 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-3 ${
                        activeSection === item.id
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      }`}
                    ></span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area with improved styling */}
          <div className="mt-8 lg:mt-0 lg:col-span-9">
            {activeSection === "mission" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                {/* Mission section content */}
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Our Mission
                    </h2>
                  </div>

                  <div className="prose max-w-none text-gray-500">
                    <p className="text-lg">
                      At NestFinder, we're committed to transforming how parents
                      in Cyprus find and engage with kindergartens, making
                      quality early education accessible to every child.
                    </p>
                  </div>
                </div>

                <div className="px-8 py-8">
                  <div className="prose max-w-none text-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900">
                      What Drives Us
                    </h3>
                    <p>
                      We believe that finding the right kindergarten shouldn't
                      be complicated. Our platform simplifies the search
                      process, providing parents with comprehensive information,
                      trusted reviews, and seamless booking capabilities—all in
                      one place.
                    </p>

                    <p>
                      By connecting families with educational institutions that
                      align with their values and requirements, we help ensure
                      every child gets the best possible start to their
                      educational journey.
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                      {[
                        {
                          title: "Simplicity",
                          description:
                            "Making the kindergarten search process straightforward and stress-free for busy parents.",
                          icon: (
                            <svg
                              className="h-8 w-8 text-indigo-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          ),
                        },
                        {
                          title: "Transparency",
                          description:
                            "Providing honest, comprehensive information about each kindergarten.",
                          icon: (
                            <svg
                              className="h-8 w-8 text-indigo-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          ),
                        },
                        {
                          title: "Quality",
                          description:
                            "Partnering only with verified, high-quality kindergartens across Cyprus.",
                          icon: (
                            <svg
                              className="h-8 w-8 text-indigo-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          ),
                        },
                      ].map((value, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-xl p-6 border border-gray-100 transition-all hover:shadow-md hover:border-indigo-100"
                        >
                          <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                            {value.icon}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {value.title}
                          </h4>
                          <p className="mt-2 text-gray-600">
                            {value.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-100">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Our Vision for the Future
                      </h3>
                      <p className="mt-4">
                        We envision NestFinder becoming the central hub for
                        early childhood education in Cyprus, connecting parents,
                        educators, and institutions in a supportive community
                        focused on providing the best possible start for every
                        child.
                      </p>
                      <p className="mt-2">
                        Beyond kindergarten placement, we aim to expand our
                        offerings to include resources for parents, professional
                        development for educators, and advocacy for quality
                        early education standards across the country.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "story" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                {/* Story section content */}
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Our Story
                    </h2>
                  </div>

                  <div className="prose max-w-none text-gray-500">
                    <p className="text-lg">
                      From firsthand frustration to a revolutionary platform—how
                      NestFinder was born from real parents' experiences in
                      Cyprus.
                    </p>
                  </div>
                </div>

                {/* Story section continued */}
                <div className="px-8 py-8">
                  {/* Rest of the story content */}
                  {/* ... */}
                </div>
              </div>
            )}

            {activeSection === "team" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                {/* Team section content */}
                {/* ... */}
              </div>
            )}

            {activeSection === "contact" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Contact Us
                    </h2>
                  </div>

                  <div className="prose max-w-none text-gray-500">
                    <p className="text-lg">
                      Have questions, feedback, or partnership inquiries? We'd
                      love to hear from you.
                    </p>
                  </div>
                </div>

                <div className="px-8 py-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Contact form and details */}
                    {/* ... */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 relative overflow-hidden mt-16">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 -mr-40 -mt-32">
          <div className="w-96 h-96 rounded-full bg-indigo-500 opacity-20 filter blur-3xl"></div>
        </div>
        <div className="absolute left-0 bottom-0 -ml-40 -mb-32">
          <div className="w-96 h-96 rounded-full bg-blue-400 opacity-10 filter blur-3xl"></div>
        </div>

        <div className="relative max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            <span className="block">
              Ready to find the perfect kindergarten?
            </span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white text-opacity-90">
            Join thousands of parents across Cyprus who have found the ideal
            learning environment for their children.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-lg bg-white text-indigo-600 hover:bg-opacity-90 font-medium transition-all shadow-md hover:shadow-lg"
            >
              Sign up for free
            </Link>
            <Link
              to="/search"
              className="px-8 py-3 rounded-lg bg-indigo-500 bg-opacity-40 text-white hover:bg-opacity-50 font-medium transition-all shadow-md hover:shadow-lg backdrop-blur-sm"
            >
              Browse Kindergartens
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
