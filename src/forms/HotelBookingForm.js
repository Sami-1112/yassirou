// src/forms/HotelBookingForm.js
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const HotelBookingForm = () => {
  const { t, showMessage } = useAppContext();
  const baseWhatsappUrl = "https://wa.me/+201507000933?text=";

  const [hotelDetails, setHotelDetails] = useState({
    destination: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    rooms: 1,
  });

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleHotelRequest = () => {
    if (!hotelDetails.destination || !hotelDetails.checkInDate || !hotelDetails.checkOutDate) {
      showMessage('error', 'الرجاء ملء جميع الحقول المطلوبة (مدينة الوجهة، تاريخ الدخول، تاريخ الخروج).');
      return;
    }

    let message = `${t.hotelBooking.whatsappText}%0A`;

    if (hotelDetails.destination) {
      message += `${t.hotelBooking.destinationCity} ${hotelDetails.destination}%0A`;
    }
    if (hotelDetails.checkInDate) {
      message += `${t.hotelBooking.checkInDate} ${hotelDetails.checkInDate}%0A`;
    }
    if (hotelDetails.checkOutDate) {
      message += `${t.hotelBooking.checkOutDate} ${hotelDetails.checkOutDate}%0A`;
    }
    message += `${t.hotelBooking.guests} ${hotelDetails.guests}%0A`; // الضيوف والغرف دائماً لهم قيمة افتراضية
    message += `${t.hotelBooking.rooms} ${hotelDetails.rooms}%0A`;

    message += `%0A${t.general.contactUs}.`;

    window.open(`${baseWhatsappUrl}${encodeURIComponent(message)}`, '_blank');
    showMessage('success', 'تم إرسال طلب حجز الفندق بنجاح!');
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">{t.hotelBooking.formTitle}</h3>
      <p className="text-center text-gray-600 mb-6">{t.hotelBooking.formDescription}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">
            {t.hotelBooking.destinationCity}
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={hotelDetails.destination}
            onChange={handleHotelChange}
            placeholder={t.hotelBooking.destinationPlaceholder}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="checkInDate" className="block text-gray-700 text-sm font-bold mb-2">
            {t.hotelBooking.checkInDate}
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
            {t.hotelBooking.checkOutDate}
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
            {t.hotelBooking.guests}
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
            {t.hotelBooking.rooms}
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
        {t.hotelBooking.button}
      </button>
    </div>
  );
};

export default HotelBookingForm;