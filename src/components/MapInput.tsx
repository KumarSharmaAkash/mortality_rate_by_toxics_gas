// src/components/MapInput.tsx
import React, { useState } from 'react';

interface MapInputProps {
  onSubmit: (longitude: number, altitude: number) => void;
}

const MapInput: React.FC<MapInputProps> = ({ onSubmit }) => {
  // Initialize state with type number
  const [longitude, setLongitude] = useState<number | "">("");
  const [altitude, setAltitude] = useState<number | "">("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Convert to numbers if needed and check validity
    const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
    const alt = typeof altitude === 'string' ? parseFloat(altitude) : altitude;

    // Only call onSubmit if valid numbers
    if (!isNaN(lng) && !isNaN(alt)) {
      onSubmit(lng, alt);
    } else {
      console.error('Invalid longitude or altitude value');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="mb-2.5 block text-black dark:text-white">
      Longitude:  
        <input
          type="number"
          step="any"
           className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={longitude === "" ? "" : longitude} // Ensure correct value type
          onChange={(e) => setLongitude(e.target.value === "" ? "" : parseFloat(e.target.value))}
        />
      </label>
      <label className="mb-2.5 block text-black dark:text-white">
      Latitude:
        <input
          type="number"
          step="any"
           className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={altitude === "" ? "" : altitude} // Ensure correct value type
          onChange={(e) => setAltitude(e.target.value === "" ? "" : parseFloat(e.target.value))}
        />
      </label>
      <button 
      type="submit"
      className="mt-6 mb-4
       w-full rounded bg-primary py-3 px-5 text-white font-medium transition hover:bg-primary-dark focus:outline-none active:bg-primary-dark disabled:bg-gray-300">Submit</button>
    </form>
  );
};

export default MapInput;
