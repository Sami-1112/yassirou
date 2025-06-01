// src/components/Navigation.js
import React from 'react';
import { Plane, Hotel, Landmark, Globe, FileText } from 'lucide-react'; // استيراد الأيقونات
import { useAppContext } from '../context/AppContext';

const Navigation = ({ activeSection, setActiveSection }) => {
  const { t } = useAppContext();

  const navItems = [
    { key: 'hajjUmrah', title: t.sections.hajjUmrah, icon: <Landmark className="w-6 h-6 ml-2" /> },
    { key: 'touristTrips', title: t.sections.touristTrips, icon: <Globe className="w-6 h-6 ml-2" /> },
    { key: 'flightBooking', title: t.sections.flightBooking, icon: <Plane className="w-6 h-6 ml-2" /> },
    { key: 'hotelBooking', title: t.sections.hotelBooking, icon: <Hotel className="w-6 h-6 ml-2" /> },
    { key: 'visas', title: t.sections.visas, icon: <FileText className="w-6 h-6 ml-2" /> },
  ];

  return (
    <nav className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 mb-8 flex flex-wrap justify-center gap-4">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveSection(item.key)}
          className={`flex items-center justify-center px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out
            ${activeSection === item.key
              ? 'bg-indigo-600 text-white shadow-md transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800'
            }`}
        >
          {item.icon}
          <span>{item.title}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
