// src/api/api.js

/**
 * دالة لإنشاء خطة رحلة باستخدام Gemini API.
 * @param {string} destination - وجهة السفر.
 * @param {number} days - عدد أيام الرحلة.
 * @param {string} interests - اهتمامات السفر (اختياري).
 * @param {string} locale - اللغة المطلوبة للرد (مثل 'ar' أو 'en').
 * @returns {Promise<string>} - وعد بنص خطة الرحلة المولدة.
 * @throws {Error} - إذا فشل استدعاء API أو كان الرد غير متوقع.
 */
export const generateAiItineraryApi = async (destination, days, interests, locale) => {
  const prompt = `Generate a detailed travel itinerary for a ${days}-day trip to ${destination}. Focus on ${interests || 'general sightseeing and culture'}. Provide daily activities, suggested meals, and key attractions. Format the response clearly, starting each day with 'اليوم X:' (Day X:) and **use ${locale === 'ar' ? 'Arabic' : 'English'} language for the itinerary.**`;

  let chatHistory = [];
  chatHistory.push({ role: "user", parts: [{ text: prompt }] });

  const payload = { contents: chatHistory };
  const apiKey = ""; // Canvas will provide this at runtime.

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected API response structure for itinerary generation.');
    }
  } catch (error) {
    console.error('Error in generateAiItineraryApi:', error);
    throw error; // Re-throw to be caught by the calling component
  }
};

/**
 * دالة للحصول على متطلبات التأشيرة باستخدام Gemini API.
 * @param {string} nationality - جنسية المسافر.
 * @param {string} country - الدولة المطلوبة.
 * @param {string} locale - اللغة المطلوبة للرد (مثل 'ar' أو 'en').
 * @returns {Promise<string>} - وعد بنص متطلبات التأشيرة المولدة.
 * @throws {Error} - إذا فشل استدعاء API أو كان الرد غير متوقع.
 */
export const generateVisaRequirementsApi = async (nationality, country, locale) => {
  const prompt = `As a travel assistant, provide general visa requirements for a citizen of ${nationality} traveling to ${country}. Include typical required documents (e.g., passport validity, photos, application form, bank statements, invitation letter) and any common steps or considerations. State if a visa is generally required or not. **Format the response clearly in ${locale === 'ar' ? 'Arabic' : 'English'},** using bullet points for documents if applicable. Start with a clear statement like 'متطلبات التأشيرة لمواطني [الجنسية] للسفر إلى [الدولة]:' if Arabic, or 'Visa requirements for citizens of [Nationality] traveling to [Country]:' if English.`;

  let chatHistory = [];
  chatHistory.push({ role: "user", parts: [{ text: prompt }] });

  const payload = { contents: chatHistory };
  const apiKey = ""; // Canvas will provide this at runtime.

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected API response structure for visa requirements generation.');
    }
  } catch (error) {
    console.error('Error in generateVisaRequirementsApi:', error);
    throw error; // Re-throw to be caught by the calling component
  }
};
