// src/sections/HajjUmrahSection.js
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import { MessageSquare } from 'lucide-react';

const HajjUmrahSection = ({ baseWhatsappUrl }) => {
  const t = useTranslation();

  const suggestions = [
    {
      title: t('hajjUmrah.umrahTitle'),
      description: t('hajjUmrah.umrahDescription'),
      image: 'https://images.unsplash.com/photo-1579308611985-05d8f6d8c232?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Makkah
    },
    {
      title: t('hajjUmrah.hajjTitle'),
      description: t('hajjUmrah.hajjDescription'),
      image: 'https://images.unsplash.com/photo-1566861501602-5eeed61d5320?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Pilgrimage crowd
    },
    {
      title: t('hajjUmrah.holyPlacesTitle'),
      description: t('hajjUmrah.holyPlacesDescription'),
      image: 'https://images.unsplash.com/photo-1620241088661-d130c25a1768?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Madina
    },
  ];

  const whatsappContact = {
    title: t('hajjUmrah.whatsappContactTitle'),
    description: t('hajjUmrah.whatsappContactDescription'),
    whatsappText: t('hajjUmrah.whatsappText'),
    image: 'https://images.unsplash.com/photo-1549429532-6019b8841a15?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // WhatsApp icon background
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suggestions.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover transform transition-transform duration-300 hover:scale-110" // Image hover effect
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=صورة+غير+متوفرة`; }}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{item.title}</h3>
            <p className="text-gray-700 text-sm mb-4">{item.description}</p>
          </div>
        </div>
      ))}

      {whatsappContact && (
        <div className="bg-green-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 border-2 border-green-400 flex flex-col justify-between">
          <img
            src={whatsappContact.image}
            alt={whatsappContact.title}
            className="w-full h-40 object-cover transform transition-transform duration-300 hover:scale-110" // Image hover effect
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=صورة+غير+متوفرة`; }}
          />
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">{whatsappContact.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{whatsappContact.description}</p>
            </div>
            <button
              onClick={() => window.open(`${baseWhatsappUrl}${encodeURIComponent(whatsappContact.whatsappText)}`, '_blank')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 ml-2" />
              {t('hajjUmrah.whatsappContactTitle')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HajjUmrahSection;
