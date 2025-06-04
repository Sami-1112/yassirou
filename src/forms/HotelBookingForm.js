// src/forms/HotelBookingForm.js
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import { MessageSquare } from 'lucide-react';

const HotelBookingForm = ({ hotelDetails, handleHotelChange, handleHotelRequest }) => {
  const t = useTranslation();

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">{t('hotelBooking.formTitle')}</h3>
      <p className="text-center text-gray-600 mb-6">{t('hotelBooking.formDescription')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">
            {t('hotelBooking.destinationCityLabel')}
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={hotelDetails.destination}
            onChange={handleHotelChange}
            placeholder={t('hotelBooking.destinationPlaceholder')}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="checkInDate" className="block text-gray-700 text-sm font-bold mb-2">
            {t('hotelBooking.checkInDateLabel')}
          </label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={hotelDetails.checkInDate}
            onChange={handleHotelChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="checkOutDate" className="block text-gray-700 text-sm font-bold mb-2">
            {t('hotelBooking.checkOutDateLabel')}
          </label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={hotelDetails.checkOutDate}
            onChange={handleHotelChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-gray-700 text-sm font-bold mb-2">
            {t('hotelBooking.guestsLabel')}
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={hotelDetails.guests}
            onChange={handleHotelChange}
            min="1"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="rooms" className="block text-gray-700 text-sm font-bold mb-2">
            {t('hotelBooking.roomsLabel')}
          </label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={hotelDetails.rooms}
            onChange={handleHotelChange}
            min="1"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
      </div>
      <button
        onClick={handleHotelRequest}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105"
      >
        <MessageSquare className="w-5 h-5 ml-2" />
        {t('hotelBooking.sendRequestButton')}
      </button>
    </div>
  );
};

export default HotelBookingForm;
