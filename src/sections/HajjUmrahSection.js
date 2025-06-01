// src/sections/HajjUmrahSection.js
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const HajjUmrahSection = () => {
  const { t } = useAppContext();
  const baseWhatsappUrl = "https://wa.me/+201507000933?text="; // رقم الواتساب ثابت

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {t.hajjUmrah.suggestions.map((suggestion, index) => (
        <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img
            src={suggestion.image || `https://placehold.co/400x250/CCCCCC/000000?text=${t.general.imageNotAvailable}`}
            alt={suggestion.title}
            className="w-full h-40 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=${t.general.imageNotAvailable}`; }}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">{suggestion.title}</h3>
            <p className="text-gray-700 text-sm">{suggestion.description}</p>
          </div>
        </div>
      ))}

      {/* بطاقة التواصل عبر واتساب لبرامج الحج والعمرة */}
      {t.hajjUmrah.whatsappContact && (
        <div className="bg-green-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 border-2 border-green-400">
          <img
            src={t.hajjUmrah.whatsappContact.image || `https://placehold.co/400x250/663399/FFFFFF?text=${t.general.imageNotAvailable}`}
            alt={t.hajjUmrah.whatsappContact.title}
            className="w-full h-40 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=${t.general.imageNotAvailable}`; }}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-green-800 mb-2">{t.hajjUmrah.whatsappContact.title}</h3>
            <p className="text-gray-700 text-sm mb-4">{t.hajjUmrah.whatsappContact.description}</p>
            <a
              href={`${baseWhatsappUrl}${encodeURIComponent(t.hajjUmrah.whatsappContact.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center font-medium"
            >
              <MessageSquare className="w-5 h-5 ml-2" />
              {t.hajjUmrah.whatsappContact.button}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HajjUmrahSection;
