"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

export default function AQI() {
    const [city, setCity] = useState("Chittoor");
    const [aqiResult, setAqiResult] = useState<number | null>(null);
    const [statusText, setStatusText] = useState<string>("Unknown");
    const [pollutants, setPollutants] = useState<Record<string, number> | null>(
        null
    );
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // To track loading state

    const NEXT_PUBLIC_GEOCODING_API_KEY = process.env.NEXT_PUBLIC_GEOCODING_API_KEY; // Replace with your geocoding API key
    const NEXT_PUBLIC_AQI_API_KEY = process.env.NEXT_PUBLIC_AQI_API_KEY; // Replace with your AQI API key

    const colors: Record<number | "Unknown", string> = {
        1: 'text-green-600',      // Good
        2: 'text-yellow-400',    // Moderate
        3: 'text-orange-400',    // Unhealthy
        4: 'text-purple-600',    // Very Unhealthy
        5: 'text-red-600',       // Hazardous
        Unknown: 'text-transparent', // Unknown
    };

    const assignAQIStatus = (aqiValue: number | null) => {
        let status = "Unknown";
        if (aqiValue) {
            switch (aqiValue) {
                case 1:
                    status = "Good";
                    break;
                case 2:
                    status = "Moderate";
                    break;
                case 3:
                    status = "Unhealthy";
                    break;
                case 4:
                    status = "Very Unhealthy";
                    break;
                case 5:
                    status = "Hazardous";
                    break;
                default:
                    status = "Unknown";
            }
        }
        return status;
    };

    const fetchAQI = async (cityName: string) => {
        setError(null);
        setAqiResult(null);
        setPollutants(null);
        setLoading(true); // Set loading to true when data fetching starts

        try {
            // Fetch latitude and longitude
            const geoRes = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${NEXT_PUBLIC_GEOCODING_API_KEY}`
            );

            if (!geoRes.ok) {
                throw new Error("Failed to fetch geocoding data.");
            }

            const geoData = await geoRes.json();
            if (geoData.length === 0) {
                throw new Error("City not found.");
            }

            const { lat, lon } = geoData[0];

            // Fetch AQI data
            const aqiRes = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${NEXT_PUBLIC_AQI_API_KEY}`
            );

            if (!aqiRes.ok) {
                throw new Error("Failed to fetch AQI data.");
            }

            const aqiData = await aqiRes.json();
            const aqi = aqiData.list[0].main.aqi;
            const components = aqiData.list[0].components;

            setAqiResult(aqi);
            setStatusText(assignAQIStatus(aqi));
            setPollutants(components);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false); // Set loading to false when data fetching completes
        }
    };

    // Fetch AQI for default city on mount
    useEffect(() => {
        fetchAQI(city);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchAQI(city);
    };

    const getAQIColor = (aqi: number | null): string => {
        if (!aqi || !colors[aqi]) return colors["Unknown"];
        return colors[aqi];
    };

    return (
        <div className="flex flex-wrap justify-center items-center z-50 relative w-[1/3] top-[120vh]">
            <div className="opacity-90 text-white shadow-md" style={{ height: '400px' }}>
                <form id="AQI-form" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="text-white text-xl capitalize w-96 mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-blue-500 xs:w-[10vw] sm:w-[10vw] md:w-[8vw] lg:w-[8vw] text-white px-4 py-2 rounded"
                    >
                        Find AQI
                    </button>
                </form>

                <div className="relative mt-6">
                    {error && <p className="text-red-500 text-xl">{error}</p>}

                    {aqiResult !== null && (
                        <div className="text-center">
                            <p className={`text-2xl font-bold ${getAQIColor(aqiResult)} px-4`}>
                                {loading ? (
                                    <Skeleton className="h-12 w-full mb-2 bg-zinc-300" />
                                ) : (
                                    <>
                                        <span className="text-white px-2 tracking-wider">AQI: </span>
                                        {statusText || <Skeleton className="h-12 w-24 mb-2 bg-zinc-300" />} {/* Skeleton for status text */}
                                    </>
                                )}
                            </p>
                        </div>
                    )}
                </div>

                {/* Skeleton Loader for Pollutants Table */}
                {loading ? (
                    <div className="mt-4">
                        <Skeleton className="h-12 w-full mb-2 bg-zinc-300" />
                        <Skeleton className="h-12 w-full mb-2 bg-zinc-300" />
                        <Skeleton className="h-12 w-full mb-2 bg-zinc-300" />
                        <Skeleton className="h-12 w-full mb-2 bg-zinc-300" />
                        <Skeleton className="h-12 w-full mb-2 bg-zinc-300" />
                        <Skeleton className="h-12 w-full mb-2 bg-zinc-300" />
                        <Skeleton className="h-12 w-full mb-2 bg-zinc-300" />
                    </div>
                ) : (
                    pollutants && (
                        <table className="table-auto w-full my-4 border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 text-green-600 text-xl px-14 py-2">
                                        Pollutant
                                    </th>
                                    <th className="border border-gray-300 text-green-600 text-xl px-14 py-2">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(pollutants).map(([key, value]) => (
                                    <tr
                                        key={key}
                                        className="text-center hover:bg-white hover:opacity-60 hover:text-black"
                                    >
                                        <td className="border border-gray-300 px-14 py-2 uppercase">{key}</td>
                                        <td className="border border-gray-300 px-14 py-2">
                                            {value.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </div>
    );
}
