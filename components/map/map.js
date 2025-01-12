import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

const Map = ({ lat, lon }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Ensure map is initialized only once Leaflet is loaded
    const initMap = () => {
      if (typeof window.L !== 'undefined') {
        const mapContainer = document.getElementById('map');
        if (mapContainer && !mapContainer._leaflet_id) {
          const map = L.map(mapContainer).setView([lat, lon], 13);
          mapRef.current = map;

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          }).addTo(map);

          setTimeout(() => {
            map.invalidateSize(); // Adjust map size to fit container after rendering
          }, 100);
        }
      }
    };

    // Initialize map on first render
    if (typeof window.L !== 'undefined') {
      initMap();
    }

    return () => {
      // Cleanup map on unmount
      if (mapRef.current) {
        mapRef.current.remove(); // Proper cleanup using map.remove()
      }
    };
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    // Fly to the new coordinates when lat or lon changes
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lon], 13, {
        duration: 2, // Duration in seconds
        easeLinearity: 0.25, // Smoothness of the animation
      });
    }
  }, [lat, lon]); // Dependencies for flyTo

  return (
    <>
      <Script 
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        onLoad={() => {
          // Only initialize map when Leaflet is loaded
          const mapContainer = document.getElementById('map');
          if (mapContainer && !mapContainer._leaflet_id) {
            const map = L.map(mapContainer).setView([lat, lon], 13);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            }).addTo(map);
          }
        }}
      />
      <div 
        id="map" 
        className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg"
        style={{ position: 'relative', zIndex: 1 }}
      />
    </>
  );
};

export default Map;
