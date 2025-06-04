import React, { useState } from 'react';
// مسارات الاستيراد هذه صحيحة بافتراض أن ملف App.js موجود في مجلد 'src/'
// وهذا يعني أن المسار './contexts/LocaleContext' يشير إلى 'src/contexts/LocaleContext.js'
import { LocaleProvider, useLocale } from './contexts/LocaleContext';
import useTranslation from './hooks/useTranslation';
import { generateAiItineraryApi, generateVisaRequirementsApi } from './api/api';

// استيراد المكونات
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MessageDisplay from './components/MessageDisplay';

// استيراد النماذج
import FlightBookingForm from './forms/FlightBookingForm';
import HotelBookingForm from './forms/HotelBookingForm';
import VisaRequestForm from './forms/VisaRequestForm';

// استيراد الأقسام
import HajjUmrahSection from './sections/HajjUmrahSection';
import TouristTripsSection from './sections/TouristTripsSection';

// المكون الرئيسي للتطبيق
function AppContent() {
  // حالة لإدارة القسم النشط حاليًا
  const [activeSection, setActiveSection] = useState('hajjUmrah');
  const { locale, t } = useLocale(); // استيراد اللغة الحالية ودالة الترجمة

  // حالة نموذج حجز الطيران
  const [flightDetails, setFlightDetails] = useState({
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    airline: '',
    customAirline: '',
  });

  // حالة نموذج حجز الفنادق
  const [hotelDetails, setHotelDetails] = useState({
    destination: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    rooms: 1,
  });

  // حالة مخطط الرحلات بالذكاء الاصطناعي
  const [aiTripDetails, setAiTripDetails] = useState({
    destination: '',
    days: 3,
    interests: '',
  });
  const [aiItinerary, setAiItinerary] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // حالة نموذج طلب التأشيرة
  const [visaDetails, setVisaDetails] = useState({
    country: '',
    visaType: '',
    nationality: '',
    purpose: '',
  });
  const [visaRequirementsResult, setVisaRequirementsResult] = useState('');
  const [isVisaAiLoading, setIsVisaAiLoading] = useState(false);
  const [visaAiError, setVisaAiError] = useState('');

  // حالة رسائل النجاح/الخطأ العامة للتطبيق
  const [appMessage, setAppMessage] = useState({ message: '', type: '' });

  // رابط واتساب الأساسي - رقم هاتفك
  const baseWhatsappUrl = "https://wa.me/+201507000933?text=";

  // معالجة تغييرات مدخلات نموذج الطيران
  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    setAppMessage({ message: '', type: '' }); // مسح الرسائل عند تغيير المدخلات
  };

  // معالجة إرسال طلب حجز الطيران إلى واتساب
  const handleFlightRequest = () => {
    const selectedAirline = flightDetails.airline === 'أخرى'
      ? flightDetails.customAirline || t('flightBooking.otherNoInput')
      : flightDetails.airline || t('flightBooking.noPreference');

    const message = `${t('flightBooking.formTitle')}:%0A` +
                      `${t('flightBooking.departureCityLabel')} ${flightDetails.departure || t('flightBooking.noInput')}%0A` +
                      `${t('flightBooking.arrivalCityLabel')} ${flightDetails.arrival || t('flightBooking.noInput')}%0A` +
                      `${t('flightBooking.departureDateLabel')} ${flightDetails.departureDate || t('flightBooking.noInput')}%0A` +
                      `${t('flightBooking.returnDateLabel')} ${flightDetails.returnDate || t('flightBooking.noInput')}%0A` +
                      `${t('flightBooking.passengersLabel')} ${flightDetails.passengers || '1'}%0A` +
                      `${t('flightBooking.preferredAirlineLabel')} ${selectedAirline}%0A` +
                      `%0A${t('messages.contactForBooking')}`;
    
    try {
      window.open(`${baseWhatsappUrl}${encodeURIComponent(message)}`, '_blank');
      setAppMessage({ message: t('messages.success'), type: 'success' });
    } catch (error) {
      setAppMessage({ message: t('messages.error'), type: 'error' });
      console.error("فشل فتح واتساب:", error);
    }
  };

  // معالجة تغييرات مدخلات نموذج الفنادق
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    setAppMessage({ message: '', type: '' }); // مسح الرسائل عند تغيير المدخلات
  };

  // معالجة إرسال طلب حجز الفنادق إلى واتساب
  const handleHotelRequest = () => {
    const message = `${t('hotelBooking.formTitle')}:%0A` +
                      `${t('hotelBooking.destinationCityLabel')} ${hotelDetails.destination || t('flightBooking.noInput')}%0A` +
                      `${t('hotelBooking.checkInDateLabel')} ${hotelDetails.checkInDate || t('flightBooking.noInput')}%0A` +
                      `${t('hotelBooking.checkOutDateLabel')} ${hotelDetails.checkOutDate || t('flightBooking.noInput')}%0A` +
                      `${t('hotelBooking.guestsLabel')} ${hotelDetails.guests || '1'}%0A` +
                      `${t('hotelBooking.roomsLabel')} ${hotelDetails.rooms || '1'}%0A` +
                      `%0A${t('messages.contactForBooking')}`;
    try {
      window.open(`${baseWhatsappUrl}${encodeURIComponent(message)}`, '_blank');
      setAppMessage({ message: t('messages.success'), type: 'success' });
    } catch (error) {
      setAppMessage({ message: t('messages.error'), type: 'error' });
      console.error("فشل فتح واتساب:", error);
    }
  };

  // دالة لاستدعاء Gemini API لتخطيط الرحلات بالذكاء الاصطناعي
  const generateAiItinerary = async () => {
    const { destination, days, interests } = aiTripDetails;

    if (!destination || !days) {
      setAiError(t('touristTrips.planRequiredFields'));
      return;
    }

    setIsAiLoading(true);
    setAiItinerary('');
    setAiError('');
    setAppMessage({ message: '', type: '' });

    try {
      const text = await generateAiItineraryApi(destination, days, interests, locale);
      setAiItinerary(text);
      setAppMessage({ message: t('messages.success'), type: 'success' });
    } catch (error) {
      setAiError(t('touristTrips.connectionError')); // استخدام رسالة خطأ عامة أو أكثر تحديدًا إذا كانت الـ API توفرها
      setAppMessage({ message: t('messages.error'), type: 'error' });
      console.error('خطأ في استدعاء AI itinerary API:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  // معالجة إرسال طلب التأشيرة إلى واتساب
  const handleVisaRequest = () => {
    const message = `${t('visas.formTitle')}:%0A` +
                      `${t('visas.requiredCountryLabel')} ${visaDetails.country || t('flightBooking.noInput')}%0A` +
                      `${t('visas.visaTypeLabel')} ${visaDetails.visaType || t('flightBooking.noInput')}%0A` +
                      `${t('visas.nationalityLabel')} ${visaDetails.nationality || t('flightBooking.noInput')}%0A` +
                      `${t('visas.purposeLabel')} ${visaDetails.purpose || t('flightBooking.noInput')}%0A` +
                      `%0A${t('messages.contactForVisa')}`;
    try {
      window.open(`${baseWhatsappUrl}${encodeURIComponent(message)}`, '_blank');
      setAppMessage({ message: t('messages.success'), type: 'success' });
    } catch (error) {
      setAppMessage({ message: t('messages.error'), type: 'error' });
      console.error("فشل فتح واتساب:", error);
    }
  };

  // دالة لاستدعاء Gemini API لمتطلبات التأشيرة بالذكاء الاصطناعي
  const generateVisaRequirements = async () => {
    const { nationality, country } = visaDetails;

    if (!nationality || !country) {
      setVisaAiError(t('visas.visaRequiredFields'));
      return;
    }

    setIsVisaAiLoading(true);
    setVisaRequirementsResult('');
    setVisaAiError('');
    setAppMessage({ message: '', type: '' });

    try {
      const text = await generateVisaRequirementsApi(nationality, country, locale);
      setVisaRequirementsResult(text);
      setAppMessage({ message: t('messages.success'), type: 'success' });
    } catch (error) {
      setVisaAiError(t('visas.aiVisaConnectionError')); // استخدام رسالة خطأ عامة أو أكثر تحديدًا
      setAppMessage({ message: t('messages.error'), type: 'error' });
      console.error('خطأ في استدعاء AI visa requirements API:', error);
    } finally {
      setIsVisaAiLoading(false);
    }
  };

  // عرض محتوى القسم النشط
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'hajjUmrah':
        return <HajjUmrahSection baseWhatsappUrl={baseWhatsappUrl} />;
      case 'touristTrips':
        return (
          <TouristTripsSection
            aiTripDetails={aiTripDetails}
            setAiTripDetails={setAiTripDetails}
            aiItinerary={aiItinerary}
            isAiLoading={isAiLoading}
            aiError={aiError}
            generateAiItinerary={generateAiItinerary}
            setAiError={setAiError}
          />
        );
      case 'flightBooking':
        return (
          <FlightBookingForm
            flightDetails={flightDetails}
            handleFlightChange={handleFlightChange}
            handleFlightRequest={handleFlightRequest}
          />
        );
      case 'hotelBooking':
        return (
          <HotelBookingForm
            hotelDetails={hotelDetails}
            handleHotelChange={handleHotelChange}
            handleHotelRequest={handleHotelRequest}
          />
        );
      case 'visas':
        return (
          <VisaRequestForm
            visaDetails={visaDetails}
            handleVisaChange={handleVisaChange}
            handleVisaRequest={handleVisaRequest}
            visaRequirementsResult={visaRequirementsResult}
            isVisaAiLoading={isVisaAiLoading}
            visaAiError={visaAiError}
            generateVisaRequirements={generateVisaRequirements}
            setVisaAiError={setVisaAiError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen font-inter text-gray-800 flex flex-col items-center justify-center p-4 sm:p-8
      bg-[url('https://images.unsplash.com/photo-1542382155-27f1c4e7724a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
      bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ fontFamily: 'Inter, "Noto Sans Arabic", sans-serif' }} // تم دمج الخطوط للعربية والإنجليزية
    >
      {/* يُفترض أن Tailwind CSS مُعدّ في مشروعك. أزل روابط CDN في مشروع React حقيقي. */}
      {/* <script src="https://cdn.tailwindcss.com"></script> */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" /> */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" /> */}

      <Header />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 backdrop-blur-sm bg-opacity-80 transition-all duration-300 hover:shadow-xl hover:bg-opacity-90">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
          {t(`sections.${activeSection}`)}
        </h2>
        <MessageDisplay message={appMessage.message} type={appMessage.type} />
        {renderSectionContent()}
      </main>

      <Footer />
    </div>
  );
}

// قم بتغليف AppContent بـ LocaleProvider
function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}

export default App;
