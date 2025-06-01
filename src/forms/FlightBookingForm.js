// src/forms/FlightBookingForm.js
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FlightBookingForm = () => {
  const { t, showMessage } = useAppContext();
  const baseWhatsappUrl = "https://wa.me/+201507000933?text=";

  const [flightDetails, setFlightDetails] = useState({
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFlightRequest = () => {
    if (!flightDetails.departure || !flightDetails.arrival || !flightDetails.departureDate) {
      showMessage('error', 'الرجاء ملء جميع الحقول المطلوبة (مدينة المغادرة، مدينة الوصول، تاريخ المغادرة).');
      return;
    }

    const message = `${t.flightBooking.whatsappText}%0A` +
                    `${t.flightBooking.departureCity} ${flightDetails.departure || t.flightBooking.notEntered}%0A` +
                    `${t.flightBooking.arrivalCity} ${flightDetails.arrival || t.flightBooking.notEntered}%0A` +
                    `${t.flightBooking.departureDate} ${flightDetails.departureDate || t.flightBooking.notEntered}%0A` +
                    `${t.flightBooking.returnDate} ${flightDetails.returnDate || t.flightBooking.noReturnDate}%0A` +
                    `${t.flightBooking.passengers} ${flightDetails.passengers || '1'}%0A` +
                    `%0A${t.general.contactUs}.`; // استخدام الترجمة لـ "يرجى التواصل معي لإتمام الحجز."

    window.open(`${baseWhatsappUrl}${encodeURIComponent(message)}`, '_blank');
    showMessage('success', 'تم إرسال طلب حجز الطيران بنجاح!');
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">{t.flightBooking.formTitle}</h3>
      <p className="text-center text-gray-600 mb-6">{t.flightBooking.formDescription}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="departure" className="block text-gray-700 text-sm font-bold mb-2">
            {t.flightBooking.departureCity}
          </label>
          <input
            type="text"
            id="departure"
            name="departure"
            value={flightDetails.departure}
            onChange={handleFlightChange}
            placeholder={t.flightBooking.departurePlaceholder}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="arrival" className="block text-gray-700 text-sm font-bold mb-2">
            {t.flightBooking.arrivalCity}
          </label>
          <input
            type="text"
            id="arrival"
            name="arrival"
            value={flightDetails.arrival}
            onChange={handleFlightChange}
            placeholder={t.flightBooking.arrivalPlaceholder}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="departureDate" className="block text-gray-700 text-sm font-bold mb-2">
            {t.flightBooking.departureDate}
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
            {t.flightBooking.returnDate}
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
        <div className="md:col-span-2">
          <label htmlFor="passengers" className="block text-gray-700 text-sm font-bold mb-2">
            {t.flightBooking.passengers}
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
      </div>
      <button
        onClick={handleFlightRequest}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105"
      >
        <MessageSquare className="w-5 h-5 ml-2" />
        {t.flightBooking.button}
      </button>
    </div>
  );
};

export default FlightBookingForm;
