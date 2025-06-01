// src/sections/TouristTripsSection.js
import React, { useState } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { callGeminiApi } from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TouristTripsSection = () => {
  const { t, showMessage } = useAppContext();
  const baseWhatsappUrl = "https://wa.me/+201507000933?text="; // رقم الواتساب ثابت

  const [aiTripDetails, setAiTripDetails] = useState({
    destination: '',
    days: 3,
    interests: '',
  });
  const [aiItinerary, setAiItinerary] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiTripChange = (e) => {
    const { name, value } = e.target;
    setAiTripDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const generateAiItinerary = async () => {
    const { destination, days, interests } = aiTripDetails;

    if (!destination || !days) {
      showMessage('error', t.touristTrips.aiPlanner.inputError);
      return;
    }

    setIsAiLoading(true);
    setAiItinerary('');
    showMessage(null, null); // Clear previous messages

    const prompt = `Generate a detailed travel itinerary for a ${days}-day trip to ${destination}. Focus on ${interests || 'general sightseeing and culture'}. Provide daily activities, suggested meals, and key attractions. Format the response clearly, starting each day with 'اليوم X:' (Day X:) and **use Arabic language for the itinerary.**`;

    try {
      const text = await callGeminiApi(prompt);
      setAiItinerary(text);
      showMessage('success', 'تم توليد خطة الرحلة بنجاح!');
    } catch (error) {
      showMessage('error', t.general.apiError);
      console.error('Error in AI Trip Planner:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* بطاقة مخطط الذكاء الاصطناعي */}
      <div className="bg-purple-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 border-2 border-purple-400">
        <img
          src={t.touristTrips.aiPlanner.image || `https://placehold.co/400x250/9333EA/FFFFFF?text=${t.general.imageNotAvailable}`}
          alt={t.touristTrips.aiPlanner.title}
          className="w-full h-40 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=${t.general.imageNotAvailable}`; }}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-purple-800 mb-2">{t.touristTrips.aiPlanner.title}</h3>
          <p className="text-gray-700 text-sm mb-4">{t.touristTrips.aiPlanner.description}</p>

          {/* نموذج مخطط الذكاء الاصطناعي */}
          <div className="space-y-3 mb-4">
            <div>
              <label htmlFor="aiDestination" className="block text-gray-700 text-xs font-bold mb-1">
                {t.touristTrips.aiPlanner.destinationLabel}
              </label>
              <input
                type="text"
                id="aiDestination"
                name="destination"
                value={aiTripDetails.destination}
                onChange={handleAiTripChange}
                placeholder={t.touristTrips.aiPlanner.destinationPlaceholder}
                className="shadow-sm appearance-none border rounded-lg w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-500 transition duration-200 text-sm"
              />
            </div>
            <div>
              <label htmlFor="aiDays" className="block text-gray-700 text-xs font-bold mb-1">
                {t.touristTrips.aiPlanner.daysLabel}
              </label>
              <input
                type="number"
                id="aiDays"
                name="days"
                value={aiTripDetails.days}
                onChange={handleAiTripChange}
                min="1"
                className="shadow-sm appearance-none border rounded-lg w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-500 transition duration-200 text-sm"
              />
            </div>
            <div>
              <label htmlFor="aiInterests" className="block text-gray-700 text-xs font-bold mb-1">
                {t.touristTrips.aiPlanner.interestsLabel}
              </label>
              <input
                type="text"
                id="aiInterests"
                name="interests"
                value={aiTripDetails.interests}
                onChange={handleAiTripChange}
                placeholder={t.touristTrips.aiPlanner.interestsPlaceholder}
                className="shadow-sm appearance-none border rounded-lg w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-500 transition duration-200 text-sm"
              />
            </div>
          </div>

          <button
            onClick={generateAiItinerary}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center font-medium"
            disabled={isAiLoading}
          >
            {isAiLoading ? (
              <LoadingSpinner color="text-white" />
            ) : (
              <Sparkles className="w-5 h-5 ml-2" />
            )}
            {isAiLoading ? t.touristTrips.aiPlanner.loading : t.touristTrips.aiPlanner.button}
          </button>

          {aiItinerary && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200 text-gray-800 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
              <h4 className="font-semibold text-purple-700 mb-2">{t.touristTrips.aiPlanner.resultTitle}</h4>
              {aiItinerary}
            </div>
          )}
        </div>
      </div>

      {/* الرحلات السياحية المحددة */}
      {t.touristTrips.trips.map((trip, index) => (
        <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img
            src={trip.image || `https://placehold.co/400x250/CCCCCC/000000?text=${t.general.imageNotAvailable}`}
            alt={trip.title}
            className="w-full h-40 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=${t.general.imageNotAvailable}`; }}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">{trip.title}</h3>
            <p className="text-gray-700 text-sm">{trip.description}</p>
            <a
              href={`${baseWhatsappUrl}${encodeURIComponent(trip.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
            >
              <MessageSquare className="w-5 h-5 ml-2" />
              {t.touristTrips.tripContactButton}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TouristTripsSection;
