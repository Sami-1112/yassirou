// src/sections/TouristTripsSection.js
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import { Sparkles } from 'lucide-react';
import MessageDisplay from '../components/MessageDisplay'; // Import MessageDisplay

const TouristTripsSection = ({
  aiTripDetails,
  setAiTripDetails,
  aiItinerary,
  isAiLoading,
  aiError,
  generateAiItinerary,
  setAiError // Pass setAiError to clear messages
}) => {
  const t = useTranslation();

  const suggestions = [
    {
      title: t('touristTrips.exploreCitiesTitle'),
      description: t('touristTrips.exploreCitiesDescription'),
      image: 'https://images.unsplash.com/photo-1501700493521-8727192a0d78?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Cityscape
    },
    {
      title: t('touristTrips.natureAdventuresTitle'),
      description: t('touristTrips.natureAdventuresDescription'),
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Beach/Nature
    },
    {
      title: t('touristTrips.culturalTripsTitle'),
      description: t('touristTrips.culturalTripsDescription'),
      image: 'https://images.unsplash.com/photo-1552055660-42861c8d1976?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Historical/Cultural
    },
    {
      title: t('touristTrips.familyDestinationsTitle'),
      description: t('touristTrips.familyDestinationsDescription'),
      image: 'https://images.unsplash.com/photo-1528659846059-86923c577045?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Family travel
    },
  ];

  // Clear AI error when input changes
  const onAiTripChange = (e) => {
    setAiTripDetails(prevDetails => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
    setAiError('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* AI Trip Planner Card */}
      <div className="bg-purple-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 border-2 border-purple-400">
        <img
          src="https://images.unsplash.com/photo-1552589088-75704b2b4d93?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={t('touristTrips.aiPlannerTitle')}
          className="w-full h-40 object-cover transform transition-transform duration-300 hover:scale-110"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=صورة+غير+متوفرة`; }}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-purple-800 mb-2">{t('touristTrips.aiPlannerTitle')}</h3>
          <p className="text-gray-700 text-sm mb-4">{t('touristTrips.aiPlannerDescription')}</p>
          
          <div className="space-y-3 mb-4">
            <div>
              <label htmlFor="aiDestination" className="block text-gray-700 text-xs font-bold mb-1">
                {t('touristTrips.destinationLabel')}
              </label>
              <input
                type="text"
                id="aiDestination"
                name="destination"
                value={aiTripDetails.destination}
                onChange={onAiTripChange}
                placeholder={t('touristTrips.destinationPlaceholder')}
                className="shadow-sm appearance-none border rounded-lg w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="aiDays" className="block text-gray-700 text-xs font-bold mb-1">
                {t('touristTrips.daysLabel')}
              </label>
              <input
                type="number"
                id="aiDays"
                name="days"
                value={aiTripDetails.days}
                onChange={onAiTripChange}
                min="1"
                className="shadow-sm appearance-none border rounded-lg w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="aiInterests" className="block text-gray-700 text-xs font-bold mb-1">
                {t('touristTrips.interestsLabel')}
              </label>
              <input
                type="text"
                id="aiInterests"
                name="interests"
                value={aiTripDetails.interests}
                onChange={onAiTripChange}
                placeholder={t('touristTrips.interestsPlaceholder')}
                className="shadow-sm appearance-none border rounded-lg w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <button
            onClick={generateAiItinerary}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center font-medium"
            disabled={isAiLoading}
          >
            {isAiLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Sparkles className="w-5 h-5 ml-2" />
            )}
            {isAiLoading ? t('touristTrips.planningInProgress') : t('touristTrips.generatePlanButton')}
          </button>

          <MessageDisplay message={aiError} type="error" />

          {aiItinerary && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200 text-gray-800 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
              <h4 className="font-semibold text-purple-700 mb-2">{t('touristTrips.suggestedPlan')}</h4>
              {aiItinerary}
            </div>
          )}
        </div>
      </div>

      {/* General Tourist Trip Suggestions */}
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
    </div>
  );
};

export default TouristTripsSection;
