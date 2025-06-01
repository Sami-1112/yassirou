// src/App.js
import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HajjUmrahSection from './sections/HajjUmrahSection';
import TouristTripsSection from './sections/TouristTripsSection';
import FlightBookingForm from './forms/FlightBookingForm';
import HotelBookingForm from './forms/HotelBookingForm';
import VisaRequestForm from './forms/VisaRequestForm';
import MessageBox from './components/common/MessageBox'; // استيراد MessageBox

function AppContent() {
  const [activeSection, setActiveSection] = useState('hajjUmrah');
  const { t, message, showMessage } = useAppContext(); // استخدام useAppContext للوصول للترجمة والرسائل

  // تحديد اتجاه النص بناءً على اللغة
  const appDirectionClass = t.locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 font-inter text-gray-800 flex flex-col items-center p-4 sm:p-8 ${appDirectionClass}`}>
      <MessageBox type={message?.type} text={message?.text} onClose={() => showMessage(null, null)} />

      <Header />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
          {t.sections[activeSection]}
        </h2>

        {/* عرض المحتوى بناءً على القسم النشط */}
        {activeSection === 'hajjUmrah' && <HajjUmrahSection />}
        {activeSection === 'touristTrips' && <TouristTripsSection />}
        {activeSection === 'flightBooking' && <FlightBookingForm />}
        {activeSection === 'hotelBooking' && <HotelBookingForm />}
        {activeSection === 'visas' && <VisaRequestForm />}
      </main>
    </div>
  );
}

// المكون الرئيسي الذي يوفر AppContext
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
