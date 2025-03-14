import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const KindergartenMap = ({
  kindergartens,
  selectedKindergarten = null,
  onKindergartenSelect = () => {},
  height = "500px",
  showInfoCard = true,
}) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [mapType, setMapType] = useState("roadmap");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  // Load Google Maps API
  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    // Create script element to load Google Maps
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE"
    }&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;

    // Handle script loading success
    googleMapScript.addEventListener("load", () => {
      setMapLoaded(true);
    });

    // Handle script loading error
    googleMapScript.addEventListener("error", () => {
      setMapError("Failed to load Google Maps. Please try again later.");
    });

    document.body.appendChild(googleMapScript);

    return () => {
      // Clean up script if component unmounts before loading
      if (document.body.contains(googleMapScript)) {
        document.body.removeChild(googleMapScript);
      }
    };
  }, []);

  // Initialize map after Google Maps API is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    try {
      // For demo purposes, center on Cyprus
      const defaultCenter = { lat: 35.1856, lng: 33.3823 }; // Cyprus center

      // Create map instance
      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 10,
        mapTypeControl: false, // We'll create our own UI for this
        streetViewControl: false,
        fullscreenControl: false, // We'll create our own fullscreen button
        zoomControl: true,
        styles: [
          {
            featureType: "poi.school",
            elementType: "labels.icon",
            stylers: [{ color: "#3b82f6" }],
          },
          {
            featureType: "poi.school",
            elementType: "labels.text.fill",
            stylers: [{ color: "#1e40af" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#bfdbfe" }],
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ color: "#f0fdf4" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{ color: "#fcd34d" }],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{ color: "#fde68a" }],
          },
        ],
      });

      // Create info window instance
      const infoWindowInstance = new window.google.maps.InfoWindow();

      // Add map type changed listener
      map.addListener("maptypeid_changed", () => {
        setMapType(map.getMapTypeId());
      });

      setMapInstance(map);
      setInfoWindow(infoWindowInstance);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Error initializing map. Please try again later.");
    }
  }, [mapLoaded]);

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!mapRef.current) return;

    if (!document.fullscreenElement) {
      setIsFullscreen(true);
      mapRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle map type change
  const changeMapType = useCallback(
    (type) => {
      if (!mapInstance) return;
      mapInstance.setMapTypeId(type);
      setMapType(type);
    },
    [mapInstance]
  );

  // Add markers for kindergartens
  useEffect(() => {
    if (!mapInstance || !kindergartens) return;

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));

    // Create bounds to fit all markers
    const bounds = new window.google.maps.LatLngBounds();

    // Create new markers
    const newMarkers = kindergartens
      .map((kindergarten) => {
        // Create marker for each kindergarten
        const position = {
          lat: kindergarten.coordinates?.lat || 0,
          lng: kindergarten.coordinates?.lng || 0,
        };

        // Skip invalid coordinates
        if (position.lat === 0 && position.lng === 0) return null;

        // Determine marker icon based on whether it's selected
        const isSelected = selectedKindergarten?.id === kindergarten.id;

        // Create marker with custom icon
        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance,
          title: kindergarten.name,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: isSelected
              ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new window.google.maps.Size(
              isSelected ? 50 : 40,
              isSelected ? 50 : 40
            ),
          },
          zIndex: isSelected ? 1000 : 1,
        });

        // Add click event to marker
        marker.addListener("click", () => {
          // Close any open info window
          if (infoWindow) {
            infoWindow.close();
          }

          // Set active marker
          setActiveMarker(marker);

          // Select kindergarten
          onKindergartenSelect(kindergarten);

          // Show info window
          if (infoWindow) {
            infoWindow.setContent(`
              <div class="p-3 max-w-xs">
                <h3 class="font-bold text-base mb-1">${kindergarten.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${
                  kindergarten.address
                }</p>
                <div class="flex items-center mb-2">
                  ${Array(Math.floor(kindergarten.rating))
                    .fill()
                    .map(() => `<span class="text-yellow-500">★</span>`)
                    .join("")}
                  ${
                    kindergarten.rating % 1 >= 0.5
                      ? `<span class="text-yellow-500">★</span>`
                      : ""
                  }
                  ${Array(5 - Math.ceil(kindergarten.rating))
                    .fill()
                    .map(() => `<span class="text-gray-300">★</span>`)
                    .join("")}
                  <span class="ml-1 text-sm">${kindergarten.rating.toFixed(
                    1
                  )}</span>
                  <span class="ml-2 text-xs text-gray-500">(${
                    kindergarten.reviewCount
                  } reviews)</span>
                </div>
                <div class="flex flex-wrap gap-1 mb-2">
                  <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">${
                    kindergarten.ageRange
                  }</span>
                  <span class="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">${
                    kindergarten.availableSpots
                  } spots</span>
                </div>
                <div class="flex gap-2 mt-3">
                  <button 
                    class="flex-1 px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
                    onclick="window.navigateToKindergarten('${
                      kindergarten.id
                    }')"
                  >
                    View Details
                  </button>
                  <button 
                    class="flex-1 px-3 py-1.5 border border-blue-500 text-blue-500 text-sm font-medium rounded hover:bg-blue-50 transition-colors"
                    onclick="window.navigateToBooking('${kindergarten.id}')"
                  >
                    Book Visit
                  </button>
                </div>
              </div>
            `);
            infoWindow.open(mapInstance, marker);
          }
        });

        // Extend bounds to include this marker
        bounds.extend(position);

        return marker;
      })
      .filter(Boolean); // Remove null markers

    // Save markers
    setMarkers(newMarkers);

    // Fit map to bounds if there are markers
    if (newMarkers.length > 0) {
      mapInstance.fitBounds(bounds);

      // Don't zoom in too far on small areas
      const listener = window.google.maps.event.addListener(
        mapInstance,
        "idle",
        () => {
          if (mapInstance.getZoom() > 16) {
            mapInstance.setZoom(16);
          }
          window.google.maps.event.removeListener(listener);
        }
      );
    }

    // Custom functions to navigate
    window.navigateToKindergarten = (id) => {
      navigate(`/kindergartens/${id}`);
    };

    window.navigateToBooking = (id) => {
      navigate(`/booking/${id}`);
    };

    return () => {
      // Clean up
      delete window.navigateToKindergarten;
      delete window.navigateToBooking;
    };
  }, [
    mapInstance,
    infoWindow,
    kindergartens,
    navigate,
    onKindergartenSelect,
    selectedKindergarten,
  ]);

  // Center map on selected kindergarten
  useEffect(() => {
    if (
      !mapInstance ||
      !selectedKindergarten ||
      !selectedKindergarten.coordinates
    )
      return;

    const { lat, lng } = selectedKindergarten.coordinates;
    if (lat && lng) {
      // Center map on selected kindergarten
      mapInstance.setCenter({ lat, lng });
      mapInstance.setZoom(15);

      // Find marker for selected kindergarten
      const marker = markers.find(
        (marker) =>
          marker.getPosition().lat() === lat &&
          marker.getPosition().lng() === lng
      );

      // Trigger click on marker
      if (marker && marker !== activeMarker) {
        window.google.maps.event.trigger(marker, "click");
      }

      // Update marker icon to show it's selected
      markers.forEach((marker) => {
        const position = marker.getPosition();
        const isSelected = position.lat() === lat && position.lng() === lng;

        marker.setIcon({
          url: isSelected
            ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(
            isSelected ? 50 : 40,
            isSelected ? 50 : 40
          ),
        });

        marker.setZIndex(isSelected ? 1000 : 1);
      });
    }
  }, [selectedKindergarten, mapInstance, markers, activeMarker]);

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
    >
      {/* Map header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-medium text-gray-900 flex items-center">
          <svg
            className="h-5 w-5 text-blue-500 mr-2"
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
          {kindergartens?.length > 0 ? (
            <span>
              Showing{" "}
              <span className="font-bold text-blue-600">
                {kindergartens.length}
              </span>{" "}
              kindergartens
            </span>
          ) : (
            <span>Kindergartens Map</span>
          )}
        </h3>

        <div className="flex space-x-2">
          {/* Map type switcher */}
          <div className="hidden sm:flex border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => changeMapType("roadmap")}
              className={`px-2 py-1 text-xs font-medium ${
                mapType === "roadmap"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => changeMapType("satellite")}
              className={`px-2 py-1 text-xs font-medium ${
                mapType === "satellite" || mapType === "hybrid"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => changeMapType("terrain")}
              className={`px-2 py-1 text-xs font-medium ${
                mapType === "terrain"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Terrain
            </button>
          </div>

          {/* Zoom controls */}
          <button
            onClick={() =>
              mapInstance?.setZoom((mapInstance?.getZoom() || 10) + 1)
            }
            className="p-1 rounded-md hover:bg-gray-200 text-gray-600"
            title="Zoom in"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              mapInstance?.setZoom((mapInstance?.getZoom() || 10) - 1)
            }
            className="p-1 rounded-md hover:bg-gray-200 text-gray-600"
            title="Zoom out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Fit bounds button */}
          {kindergartens?.length > 0 && (
            <button
              onClick={() => {
                if (mapInstance && markers.length > 0) {
                  const bounds = new window.google.maps.LatLngBounds();
                  markers.forEach((marker) =>
                    bounds.extend(marker.getPosition())
                  );
                  mapInstance.fitBounds(bounds);
                }
              }}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-600"
              title="Fit all markers"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded-md hover:bg-gray-200 text-gray-600"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        style={{ height: isFullscreen ? "100vh" : height }}
        className="w-full"
      ></div>

      {/* Mobile map type controls (visible on small screens) */}
      <div className="absolute bottom-4 right-4 sm:hidden">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex flex-col">
            <button
              onClick={() => changeMapType("roadmap")}
              className={`px-3 py-2 text-sm font-medium ${
                mapType === "roadmap"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => changeMapType("satellite")}
              className={`px-3 py-2 text-sm font-medium ${
                mapType === "satellite" || mapType === "hybrid"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => changeMapType("terrain")}
              className={`px-3 py-2 text-sm font-medium ${
                mapType === "terrain"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Terrain
            </button>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-500 mb-4"
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
            <p className="text-gray-700 font-medium">Loading map...</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {mapError && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-center max-w-md p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Map Error</h3>
            <p className="text-gray-600">{mapError}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      )}

      {/* No kindergartens message */}
      {mapLoaded && kindergartens?.length === 0 && !mapError && (
        <div className="absolute top-16 left-0 right-0 mx-auto w-max bg-white bg-opacity-90 rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-700">
              No kindergartens found in this area
            </p>
          </div>
        </div>
      )}

      {/* Selected kindergarten info card */}
      {showInfoCard && selectedKindergarten && (
        <div className="absolute bottom-4 left-4 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="h-28 bg-gray-200 overflow-hidden">
            {selectedKindergarten.images && selectedKindergarten.images[0] && (
              <img
                src={selectedKindergarten.images[0]}
                alt={selectedKindergarten.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              {selectedKindergarten.availableSpots > 0
                ? `${selectedKindergarten.availableSpots} spots`
                : "Fully booked"}
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-bold text-gray-900 line-clamp-1">
              {selectedKindergarten.name}
            </h3>
            <p className="text-xs text-gray-600 mb-1 line-clamp-1">
              {selectedKindergarten.address}
            </p>
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {Array(Math.floor(selectedKindergarten.rating))
                  .fill()
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                {selectedKindergarten.rating % 1 >= 0.5 && (
                  <svg
                    className="h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
                {Array(5 - Math.ceil(selectedKindergarten.rating))
                  .fill()
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-3 w-3 text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <span className="text-xs ml-1 text-gray-600">
                ({selectedKindergarten.reviewCount})
              </span>
            </div>

            {/* Additional details section */}
            <div className="mt-1 mb-2">
              <div className="flex items-center text-xs text-gray-700 mb-1">
                <svg
                  className="h-3 w-3 text-blue-500 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                {selectedKindergarten.ageRange}
              </div>
              <div className="flex items-center text-xs text-gray-700 mb-1">
                <svg
                  className="h-3 w-3 text-blue-500 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {selectedKindergarten.operatingHours}
              </div>
              <div className="flex items-center text-xs text-gray-700">
                <svg
                  className="h-3 w-3 text-blue-500 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {selectedKindergarten.tuitionFee}
              </div>
            </div>

            <div className="flex justify-between gap-1">
              <button
                onClick={() =>
                  navigate(`/kindergartens/${selectedKindergarten.id}`)
                }
                className="flex-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => navigate(`/booking/${selectedKindergarten.id}`)}
                className="flex-1 px-2 py-1.5 bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 text-xs font-medium rounded transition-colors"
              >
                Book Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-lg shadow-sm p-2 border border-gray-200 text-xs">
        <div className="flex items-center mb-1">
          <div className="h-4 w-4 mr-2 rounded-full bg-blue-500"></div>
          <span>Kindergarten</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 mr-2 rounded-full bg-red-500"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default KindergartenMap;
