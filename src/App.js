import React, { useState } from 'react';
import { Plane, Hotel, Landmark, Globe, MessageSquare, Sparkles, FileText } from 'lucide-react'; // Importing icons from lucide-react, added FileText for Visas

// Main App component
function App() {
  // State to manage the currently active section
  const [activeSection, setActiveSection] = useState('hajjUmrah');

  // State for flight booking form
  const [flightDetails, setFlightDetails] = useState({
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  // State for hotel booking form
  const [hotelDetails, setHotelDetails] = useState({
    destination: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    rooms: 1,
  });

  // State for AI Trip Planner
  const [aiTripDetails, setAiTripDetails] = useState({
    destination: '',
    days: 3,
    interests: '',
  });
  const [aiItinerary, setAiItinerary] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // State for Visa Request form
  const [visaDetails, setVisaDetails] = useState({
    country: '',
    visaType: '',
    nationality: '',
    purpose: '',
  });

  // Base WhatsApp link - Your phone number
  const baseWhatsappUrl = "https://wa.me/+201507000933?text=";

  // Handle flight form input changes
  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle flight request submission to WhatsApp
  const handleFlightRequest = () => {
    const message = `طلب حجز طيران جديد:%0A` +
                    `المغادرة: ${flightDetails.departure || 'لم يتم الإدخال'}%0A` +
                    `الوصول: ${flightDetails.arrival || 'لم يتم الإدخال'}%0A` +
                    `تاريخ المغادرة: ${flightDetails.departureDate || 'لم يتم الإدخال'}%0A` +
                    `تاريخ العودة: ${flightDetails.returnDate || 'لا يوجد'}%0A` +
                    `عدد الركاب: ${flightDetails.passengers || '1'}%0A` +
                    `%0Aيرجى التواصل معي لإتمام الحجز.`;
    window.open(`${baseWhatsappUrl}${encodeURIComponent(message)}`, '_blank');
  };

  // Handle hotel form input changes
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle hotel request submission to WhatsApp
  const handleHotelRequest = () => {
    const message = `طلب حجز فندق جديد:%0A` +
                    `الوجهة: ${hotelDetails.destination || 'لم يتم الإدخال'}%0A` +
                    `تاريخ الدخول: ${hotelDetails.checkInDate || 'لم يتم الإدخال'}%0A` +
                    `تاريخ الخروج: ${hotelDetails.checkOutDate || 'لم يتم الإدخال'}%0A` +
                    `عدد النزلاء: ${hotelDetails.guests || '1'}%0A` +
                    `عدد الغرف: ${hotelDetails.rooms || '1'}%0A` +
                    `%0Aيرجى التواصل معي لإتمام الحجز.`;
    window.open(`${baseWhatsappUrl}${encodeURIComponent(message)}`, '_blank');
  };

  // Handle AI trip planner input changes
  const handleAiTripChange = (e) => {
    const { name, value } = e.target;
    setAiTripDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to call Gemini API for AI trip planning
  const generateAiItinerary = async () => {
    const { destination, days, interests } = aiTripDetails;

    if (!destination || !days) {
      setAiError('الرجاء إدخال الوجهة وعدد الأيام.');
      return;
    }

    setIsAiLoading(true);
    setAiItinerary('');
    setAiError('');

    const prompt = `Generate a detailed travel itinerary for a ${days}-day trip to ${destination}. Focus on ${interests || 'general sightseeing and culture'}. Provide daily activities, suggested meals, and key attractions. Format the response clearly, starting each day with 'اليوم X:' (Day X:) and use Arabic language for the itinerary.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = ""; // Leave as-is, Canvas will provide it at runtime.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setAiItinerary(text);
      } else {
        setAiError('لم يتمكن الذكاء الاصطناعي من توليد خطة الرحلة. يرجى المحاولة مرة أخرى.');
        console.error('Gemini API response structure unexpected:', result);
      }
    } catch (error) {
      setAiError('حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
      console.error('Error calling Gemini API:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle Visa form input changes
  const handleVisaChange = (e) => {
    const { name, value } = e.target;
    setVisaDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle Visa request submission to WhatsApp
  const handleVisaRequest = () => {
    const message = `طلب تأشيرة جديد:%0A` +
                    `الدولة المطلوبة: ${visaDetails.country || 'لم يتم الإدخال'}%0A` +
                    `نوع التأشيرة: ${visaDetails.visaType || 'لم يتم الإدخال'}%0A` +
                    `الجنسية: ${visaDetails.nationality || 'لم يتم الإدخال'}%0A` +
                    `الغرض من السفر: ${visaDetails.purpose || 'لم يتم الإدخال'}%0A` +
                    `%0Aيرجى التواصل معي لإتمام إجراءات التأشيرة.`;
    window.open(`${baseWhatsappUrl}${encodeURIComponent(message)}`, '_blank');
  };

  // Data for virtual trips in each section (Hajj & Umrah, Tourist Trips)
  const sections = {
    hajjUmrah: {
      title: 'الحج والعمرة',
      icon: <Landmark className="w-6 h-6 ml-2" />,
      trips: [
        {
          title: 'رحلة عمرة اقتصادية - 7 أيام',
          description: 'جدول الرحلة: اليوم الأول: الوصول إلى مكة والإحرام، اليوم الثاني: أداء العمرة، الأيام 3-5: العبادة في الحرم المكي، اليوم السادس: زيارة المعالم الدينية، اليوم السابع: المغادرة.',
          image: 'https://placehold.co/400x250/8B5CF6/FFFFFF?text=عمرة+اقتصادية', // Image for economic Umrah
          whatsappText: 'أود الاستفسار عن رحلة عمرة اقتصادية - 7 أيام',
        },
        {
          title: 'رحلة عمرة مميزة - 10 أيام',
          description: 'جدول الرحلة: الأيام 1-5: مكة المكرمة (عمرة، عبادة، زيارات)، الأيام 6-9: المدينة المنورة (زيارة المسجد النبوي، الروضة الشريفة، المواقع التاريخية)، اليوم العاشر: المغادرة.',
          image: 'https://placehold.co/400x250/C084FC/FFFFFF?text=عمرة+مميزة', // Image for special Umrah
          whatsappText: 'أود الاستفسار عن رحلة عمرة مميزة - 10 أيام',
        },
        {
          title: 'برنامج الحج الشامل - 14 يوم',
          description: 'جدول الرحلة: يشمل جميع مناسك الحج بالتفصيل، الإقامة في مخيمات مجهزة، وخدمات الإعاشة والنقل، بالإضافة إلى زيارات للمدينة المنورة بعد أداء المناسك.',
          image: 'https://placehold.co/400x250/A78BFA/FFFFFF?text=برنامج+الحج', // Image for Hajj program
          whatsappText: 'أود الاستفسار عن برنامج الحج الشامل - 14 يوم',
        },
      ],
    },
    touristTrips: {
      title: 'رحلات سياحية',
      icon: <Globe className="w-6 h-6 ml-2" />,
      trips: [
        {
          title: 'اسطنبول الساحرة، تركيا - 5 أيام',
          description: 'استكشاف آيا صوفيا، المسجد الأزرق، البازار الكبير، ومضيق البوسفور.',
          image: 'https://placehold.co/400x250/FF7F50/FFFFFF?text=اسطنبول', // Image of Istanbul
          whatsappText: 'أود الاستفسار عن رحلة اسطنبول الساحرة، تركيا - 5 أيام',
        },
        {
          title: 'جمال تبليسي، جورجيا - 4 أيام',
          description: 'جولة في المدينة القديمة، قلعة ناريكالا، جبال القوقاز الخضراء.',
          image: 'https://placehold.co/400x250/6A5ACD/FFFFFF?text=تبليسي', // Image of Tbilisi
          whatsappText: 'أود الاستفسار عن رحلة جمال تبليسي، جورجيا - 4 أيام',
        },
        {
          title: 'بالي الاستوائية، إندونيسيا - 7 أيام',
          description: 'استرخاء على الشواطئ، زيارة المعابد، الغوص، والتمتع بالطبيعة الخلابة.',
          image: 'https://placehold.co/400x250/20B2AA/FFFFFF?text=بالي', // Image of Bali
          whatsappText: 'أود الاستفسار عن رحلة بالي الاستوائية، إندونيسيا - 7 أيام',
        },
        {
          title: 'كوالالمبور الحديثة، ماليزيا - 6 أيام',
          description: 'برجاي التوأم، حدائق البحيرة، كهوف باتو، وتسوق لا يُنسى.',
          image: 'https://placehold.co/400x250/FFD700/FFFFFF?text=كوالالمبور', // Image of Kuala Lumpur
          whatsappText: 'أود الاستفسار عن رحلة كوالالمبور الحديثة، ماليزيا - 6 أيام',
        },
        {
          title: 'باريس الرومانسية، فرنسا - 5 أيام',
          description: 'برج إيفل، متحف اللوفر، كاتدرائية نوتردام، وشارع الشانزليزيه.',
          image: 'https://eg.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/destinations/paris/marquee-travel-paris-800x450.jpg', // Image of Paris
          whatsappText: 'أود الاستفسار عن رحلة باريس الرومانسية، فرنسا - 5 أيام',
        },
        {
          title: 'روما التاريخية، إيطاليا - 6 أيام',
          description: 'الكولوسيوم، نافورة تريفي، الفاتيكان، وتذوق أشهى المأكولات الإيطالية.',
          image: 'https://placehold.co/400x250/4682B4/FFFFFF?text=روما', // Image of Rome
          whatsappText: 'أود الاستفسار عن رحلة روما التاريخية، إيطاليا - 6 أيام',
        },
      ],
      // Add a special entry for the AI Planner within touristTrips
      aiPlanner: {
        title: '✨ خطط رحلتك بالذكاء الاصطناعي',
        description: 'دع الذكاء الاصطناعي يصمم لك خطة رحلة مخصصة بناءً على اهتماماتك!',
        image: 'https://placehold.co/400x250/9333EA/FFFFFF?text=مخطط+الذكاء+الاصطناعي', // Image for AI planner
      }
    },
    flightBooking: {
      title: 'حجز طيران',
      icon: <Plane className="w-6 h-6 ml-2" />,
      // This section will render the flight request form
      renderContent: () => (
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">أرسل طلب حجز الطيران</h3>
          <p className="text-center text-gray-600 mb-6">املأ التفاصيل وسنتواصل معك لإتمام الحجز.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="departure" className="block text-gray-700 text-sm font-bold mb-2">
                مدينة المغادرة:
              </label>
              <input
                type="text"
                id="departure"
                name="departure"
                value={flightDetails.departure}
                onChange={handleFlightChange}
                placeholder="مثال: القاهرة"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="arrival" className="block text-gray-700 text-sm font-bold mb-2">
                مدينة الوصول:
              </label>
              <input
                type="text"
                id="arrival"
                name="arrival"
                value={flightDetails.arrival}
                onChange={handleFlightChange}
                placeholder="مثال: دبي"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="departureDate" className="block text-gray-700 text-sm font-bold mb-2">
                تاريخ المغادرة:
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
                تاريخ العودة (اختياري):
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
                عدد الركاب:
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
            أرسل طلب حجز الطيران عبر واتساب
          </button>
        </div>
      ),
    },
    hotelBooking: {
      title: 'حجز فنادق',
      icon: <Hotel className="w-6 h-6 ml-2" />,
      renderContent: () => (
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">أرسل طلب حجز الفندق</h3>
          <p className="text-center text-gray-600 mb-6">املأ التفاصيل وسنتواصل معك لإتمام الحجز.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">
                مدينة الوجهة:
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={hotelDetails.destination}
                onChange={handleHotelChange}
                placeholder="مثال: باريس"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="checkInDate" className="block text-gray-700 text-sm font-bold mb-2">
                تاريخ الدخول:
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
                تاريخ الخروج:
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
                عدد النزلاء:
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
                عدد الغرف:
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
            أرسل طلب حجز الفندق عبر واتساب
          </button>
        </div>
      ),
    },
    visas: { // New Visas Section
      title: 'تأشيرات',
      icon: <FileText className="w-6 h-6 ml-2" />,
      renderContent: () => (
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">أرسل طلب تأشيرة</h3>
          <p className="text-center text-gray-600 mb-6">املأ التفاصيل وسنتواصل معك لمساعدتك في الحصول على التأشيرة.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="visaCountry" className="block text-gray-700 text-sm font-bold mb-2">
                الدولة المطلوبة:
              </label>
              <input
                type="text"
                id="visaCountry"
                name="country"
                value={visaDetails.country}
                onChange={handleVisaChange}
                placeholder="مثال: كندا"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="visaType" className="block text-gray-700 text-sm font-bold mb-2">
                نوع التأشيرة:
              </label>
              <select
                id="visaType"
                name="visaType"
                value={visaDetails.visaType}
                onChange={handleVisaChange}
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              >
                <option value="">اختر نوع التأشيرة</option>
                <option value="سياحة">سياحة</option>
                <option value="عمل">عمل</option>
                <option value="دراسة">دراسة</option>
                <option value="زيارة عائلية">زيارة عائلية</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
            <div>
              <label htmlFor="visaNationality" className="block text-gray-700 text-sm font-bold mb-2">
                الجنسية:
              </label>
              <input
                type="text"
                id="visaNationality"
                name="nationality"
                value={visaDetails.nationality}
                onChange={handleVisaChange}
                placeholder="مثال: مصري"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="visaPurpose" className="block text-gray-700 text-sm font-bold mb-2">
                الغرض من السفر:
              </label>
              <input
                type="text"
                id="visaPurpose"
                name="purpose"
                value={visaDetails.purpose}
                onChange={handleVisaChange}
                placeholder="مثال: حضور مؤتمر"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          <button
            onClick={handleVisaRequest}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <MessageSquare className="w-5 h-5 ml-2" />
            أرسل طلب التأشيرة عبر واتساب
          </button>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 font-inter text-gray-800 flex flex-col items-center p-4 sm:p-8">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-2">
          يسروا للسفر والسياحة
        </h1>
        <p className="text-lg text-gray-600">رفيقك الأمثل في رحلاتك حول العالم</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 mb-8 flex flex-wrap justify-center gap-4">
        {Object.keys(sections).map((key) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex items-center justify-center px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out
              ${activeSection === key
                ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800'
              }`}
          >
            {sections[key].icon}
            <span>{sections[key].title}</span>
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
          {sections[activeSection].title}
        </h2>

        {/* Conditional rendering for Flight Booking, Hotel Booking, and Visas sections */}
        {(activeSection === 'flightBooking' || activeSection === 'hotelBooking' || activeSection === 'visas') && sections[activeSection].renderContent()}

        {/* Virtual Trips Section (for Hajj & Umrah and Tourist Trips) */}
        {activeSection !== 'flightBooking' && activeSection !== 'hotelBooking' && activeSection !== 'visas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Display AI Trip Planner card first in Tourist Trips section */}
            {activeSection === 'touristTrips' && sections.touristTrips.aiPlanner && (
              <div className="bg-purple-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 border-2 border-purple-400">
                <img
                  src={sections.touristTrips.aiPlanner.image}
                  alt={sections.touristTrips.aiPlanner.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=صورة+غير+متوفرة`; }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">{sections.touristTrips.aiPlanner.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{sections.touristTrips.aiPlanner.description}</p>
                  
                  {/* AI Trip Planner Form */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <label htmlFor="aiDestination" className="block text-gray-700 text-xs font-bold mb-1">
                        الوجهة:
                      </label>
                      <input
                        type="text"
                        id="aiDestination"
                        name="destination"
                        value={aiTripDetails.destination}
                        onChange={handleAiTripChange}
                        placeholder="مثال: دبي"
                        className="shadow-sm appearance-none border rounded-lg w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-500 transition duration-200 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="aiDays" className="block text-gray-700 text-xs font-bold mb-1">
                        عدد الأيام:
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
                        الاهتمامات (فاصلة):
                      </label>
                      <input
                        type="text"
                        id="aiInterests"
                        name="interests"
                        value={aiTripDetails.interests}
                        onChange={handleAiTripChange}
                        placeholder="مثال: تاريخ, طعام, مغامرة"
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
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Sparkles className="w-5 h-5 ml-2" />
                    )}
                    {isAiLoading ? 'جاري التخطيط...' : 'خطط رحلتي الآن'}
                  </button>

                  {aiError && (
                    <p className="text-red-600 text-sm mt-3 text-center">{aiError}</p>
                  )}

                  {aiItinerary && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200 text-gray-800 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                      <h4 className="font-semibold text-purple-700 mb-2">خطة الرحلة المقترحة:</h4>
                      {aiItinerary}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Existing Virtual Trips */}
            {sections[activeSection].trips.map((trip, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/CCCCCC/000000?text=صورة+غير+متوفرة`; }}
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
                    تواصل معنا
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;