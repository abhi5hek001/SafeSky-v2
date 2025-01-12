import React from 'react';
import { TiWeatherCloudy } from 'react-icons/ti';
import { FaMaskFace } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Services() {
  return (
    <section id="services" className="z-50 text-white opacity-60 relative top-[145vh] w-[100%] h-auto py-10">
      <div className="flex flex-col">

        <div className="heading text-center pt-14">
          <h2 className='text-4xl font-semibold tracking-wider text-green-500 p-1'>Services</h2>
          <p>Revolutionary Aerial Hazard Monitoring System</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-[5vw]">
          {/* Weather Report */}
          <div className="flex flex-col justify-center items-center col-md-4 text-center">
          <TiWeatherCloudy className='h-20 w-20 text-green-500 p-2' />
            <h3 className='text-2xl p-1'>
              Weather Report
            </h3>
            <p>Check Weather Report of your locality.</p>
          </div>

          {/* Air Quality Index */}
          <div className="flex flex-col justify-center items-center col-md-4 text-center">
           <FaMaskFace className='h-20 w-20 text-green-500 p-2' />
            <h3 className='text-2xl p-1'>
              Check AQI
            </h3>
            <p>Check Air Quality Index of your surrounding.</p>
          </div>

          {/* Hazard Monitoring */}
          <div className="flex flex-col justify-center items-center col-md-4 text-center">
            <FaExclamationTriangle className='h-20 w-20 text-green-500 p-2' />
            <h3 className='text-2xl p-1'>
              Hazard Monitoring
            </h3>
            <p>Check Hazardous conditions through camera.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
