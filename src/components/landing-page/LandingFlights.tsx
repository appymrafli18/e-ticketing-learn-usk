"use client";
import { useCallback, useEffect, useState } from "react";
import NavbarWithoutLogin from "./NavbarList/NavbarWithoutLogin";
import useMe from "@/store/me";
import NavbarWithLogin from "./NavbarList/NavbarWithLogin";
import axios from "axios";
import { IAirlines } from "@/types/airlines";
import { FLIGHT } from "@/types/payment";
import Image from "next/image";

const LandingFlights = () => {
  const { user, setUser } = useMe();
  const [airlines, setAirlines] = useState<IAirlines[]>([]);
  const [flights, setFlights] = useState<FLIGHT[]>([]);

  const checkLogin = useCallback(() => {
    if (!user) {
      setUser();
    }
  }, [user, setUser]);

  const initialValue = async () => {
    try {
      const resAirlines = await axios.get("/api/airlines/all");
      const resFlight = await axios.get("/api/flights/filter");

      if (resAirlines.status === 200) {
        setAirlines(resAirlines.data.data);
      }

      if (resFlight.status === 200) {
        console.log(resFlight.data);
        setFlights(resFlight.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    initialValue();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {user ? <NavbarWithLogin /> : <NavbarWithoutLogin />}
      <main>
        {/* Hero Section */}
        <header
          className="bg-blue-600 text-white h-[50vh] bg-cover bg-center relative mt-[4.5rem] z-0"
          style={{
            backgroundImage: "url(assets/pexels-pixabay-62623.jpg)",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/50"></div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
            <h1 className="font-bold text-5xl mb-4 text-white">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Discover the best deals on flights to your favorite destinations
            </p>
          </div>
        </header>

        {/* Search Bar */}
        <div className="container mx-auto px-4 relative -top-10">
          <div className="bg-white p-6 shadow-lg rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  From
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
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
                  <input
                    type="text"
                    placeholder="City or Airport"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="Jakarta (CGK)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">To</label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
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
                  <input
                    type="text"
                    placeholder="City or Airport"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
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
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium">
                  Search Flights
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Airlines</h3>
                  <div className="space-y-2">
                    {airlines &&
                      airlines.map((airline) => (
                        <div
                          key={airline.id}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <input
                            type="checkbox"
                            id={`airline-${airline.id}`}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2">
                            <label
                              htmlFor={`airline-${airline.id}`}
                              className="text-gray-700 font-medium cursor-pointer select-none text-sm"
                            >
                              {airline.name}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Listings */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Available Flights
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Not Sorting</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Airline Logo */}
                  <div className="md:col-span-2 flex justify-center items-center">
                    <Image
                      src={`/img-airlines/${flight.airlines?.logo}`}
                      alt={flight.airlines?.logo || ""}
                      className="h-12 w-12 object-contain"
                      width={100}
                      height={100}
                    />
                  </div>

                  {/* Flight Details */}
                  <div className="md:col-span-6 flex flex-col justify-center">
                    <div className="flex items-center mb-2">
                      <span className="px-2 py-1 text-xs font-normal bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                        {flight.no_penerbangan}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {flight.airlines?.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <p className="text-xl font-bold">
                          {new Date(flight.waktu_keberangkatan).toLocaleString(
                            "id-ID",
                            {
                              minute: "2-digit",
                              hour: "2-digit",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {flight.kota_keberangkatan}
                        </p>
                      </div>

                      <div className="flex-1 flex flex-col items-center">
                        <div className="text-xs text-gray-500 mb-1">
                          {(() => {
                            const departure = new Date(
                              flight.waktu_keberangkatan
                            );
                            const arrival = new Date(flight.waktu_kedatangan);
                            const diff =
                              arrival.getTime() - departure.getTime();
                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            const minutes = Math.floor(
                              (diff % (1000 * 60 * 60)) / (1000 * 60)
                            );
                            return `${hours}j ${minutes}m`;
                          })()}
                        </div>
                        <div className="w-full flex items-center">
                          <div className="h-[2px] flex-1 bg-gray-300"></div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 mx-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                          <div className="h-[2px] flex-1 bg-gray-300"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-xl font-bold">
                          {new Date(flight.waktu_kedatangan).toLocaleString(
                            "id-ID",
                            {
                              minute: "2-digit",
                              hour: "2-digit",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {flight.kota_tujuan}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price and Book Button */}
                  <div className="md:col-span-4 flex flex-col justify-center items-end">
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      {formatPrice(Number(flight.harga))}
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium">
                      Book Flight
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Load More Button */}
            <div className="flex justify-center mt-8">
              <button className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md transition-colors duration-200 font-medium">
                Load More Flights
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
};

export default LandingFlights;
