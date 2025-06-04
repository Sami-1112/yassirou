// src/components/Navigation.js
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import { Plane, Hotel, Landmark, Globe, FileText } from 'lucide-react'; // Importing icons

const Navigation = ({ activeSection, setActiveSection }) => {
  const t = useTranslation();

  // Define sections with their titles and icons
  const sectionsConfig = {
    hajjUmrah: { title: t('sections.hajjUmrah'), icon: <Landmark className="w-6 h-6 ml-2" /> },
    touristTrips: { title: t('sections.touristTrips'), icon: <Globe className="w-6 h-6 ml-2" /> },
    flightBooking: { title: t('sections.flightBooking'), icon: <Plane className="w-6 h-6 ml-2" /> },
    hotelBooking: { title: t('sections.hotelBooking'), icon: <Hotel className="w-6 h-6 ml-2" /> },
    visas: { title: t('sections.visas'), icon: <FileText className="w-6 h-6 ml-2" /> },
  };

  return (
    <nav className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 mb-8 flex flex-wrap justify-center gap-4 backdrop-blur-sm bg-opacity-80 transition-all duration-300 hover:shadow-xl hover:bg-opacity-90">
      {Object.keys(sectionsConfig).map((key) => (
        <button
          key={key}
          onClick={() => setActiveSection(key)}
          className={`flex items-center justify-center px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out
            ${activeSection === key
              ? 'bg-indigo-600 text-white shadow-md transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 transform hover:scale-105'
            }`}
        >
          {sectionsConfig[key].icon}
          <span>{sectionsConfig[key].title}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
