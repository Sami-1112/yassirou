// src/forms/FlightBookingForm.js
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import { MessageSquare } from 'lucide-react';

const FlightBookingForm = ({ flightDetails, handleFlightChange, handleFlightRequest }) => {
  const t = useTranslation();

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">{t('flightBooking.formTitle')}</h3>
      <p className="text-center text-gray-600 mb-6">{t('flightBooking.formDescription')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="departure" className="block text-gray-700 text-sm font-bold mb-2">
            {t('flightBooking.departureCityLabel')}
          </label>
          <input
            type="text"
            id="departure"
            name="departure"
            value={flightDetails.departure}
            onChange={handleFlightChange}
            placeholder={t('flightBooking.departurePlaceholder')}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="arrival" className="block text-gray-700 text-sm font-bold mb-2">
            {t('flightBooking.arrivalCityLabel')}
          </label>
          <input
            type="text"
            id="arrival"
            name="arrival"
            value={flightDetails.arrival}
            onChange={handleFlightChange}
            placeholder={t('flightBooking.arrivalPlaceholder')}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="departureDate" className="block text-gray-700 text-sm font-bold mb-2">
            {t('flightBooking.departureDateLabel')}
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={flightDetails.departureDate}
            onChange={handleFlightChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="returnDate" className="block text-gray-700 text-sm font-bold mb-2">
            {t('flightBooking.returnDateLabel')}
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={flightDetails.returnDate}
            onChange={handleFlightChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="passengers" className="block text-gray-700 text-sm font-bold mb-2">
            {t('flightBooking.passengersLabel')}
          </label>
          <input
            type="number"
            id="passengers"
            name="passengers"
            value={flightDetails.passengers}
            onChange={handleFlightChange}
            min="1"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        {/* Optional airline selection field */}
        <div>
          <label htmlFor="airline" className="block text-gray-700 text-sm font-bold mb-2">
            {t('flightBooking.preferredAirlineLabel')}
          </label>
          <select
            id="airline"
            name="airline"
            value={flightDetails.airline}
            onChange={handleFlightChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          >
            <option value="">{t('flightBooking.selectAirlinePlaceholder')}</option>
            <option value="مصر للطيران">{t('flightBooking.egyptAir')}</option>
            <option value="الخطوط السعودية">{t('flightBooking.saudiAirlines')}</option>
            <option value="طيران الإمارات">{t('flightBooking.emirates')}</option>
            <option value="الخطوط الجوية القطرية">{t('flightBooking.qatarAirways')}</option>
            <option value="الخطوط التركية">{t('flightBooking.turkishAirlines')}</option>
            <option value="لوفتهانزا">{t('flightBooking.lufthansa')}</option>
            <option value="الخطوط الجوية البريطانية">{t('flightBooking.britishAirways')}</option>
            <option value="أخرى">{t('flightBooking.other')}</option>
          </select>
        </div>
        {/* Conditional rendering for custom airline input */}
        {flightDetails.airline === 'أخرى' && (
          <div>
            <label htmlFor="customAirline" className="block text-gray-700 text-sm font-bold mb-2">
              {t('flightBooking.customAirlineName')}
            </label>
            <input
              type="text"
              id="customAirline"
              name="customAirline"
              value={flightDetails.customAirline}
              onChange={handleFlightChange}
              placeholder={t('flightBooking.customAirlinePlaceholder')}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            />
          </div>
        )}
      </div>
      <button
        onClick={handleFlightRequest}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105"
      >
        <MessageSquare className="w-5 h-5 ml-2" />
        {t('flightBooking.sendRequestButton')}
      </button>
    </div>
  );
};

export default FlightBookingForm;
