// src/utils/api.js
// هذا الملف يحتوي على منطق الاتصال بـ Gemini API بشكل مركزي

const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = ""; // سيتم توفيره بواسطة Canvas في وقت التشغيل. في بيئة الإنتاج الحقيقية، لا تضع المفتاح هنا مباشرة.

/**
 * دالة عامة لإرسال طلب إلى Gemini API
 * @param {string} prompt - النص الذي سيتم إرساله للذكاء الاصطناعي.
 * @returns {Promise<string>} - وعد بنص الاستجابة من الذكاء الاصطناعي.
 */
export const callGeminiApi = async (prompt) => {
  let chatHistory = [];
  chatHistory.push({ role: "user", parts: [{ text: prompt }] });

  const payload = { contents: chatHistory };
  const apiUrl = `${API_BASE_URL}?key=${API_KEY}`;

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
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error('Gemini API response structure unexpected:', result);
      throw new Error('Unexpected API response structure.');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to connect to AI. Please check your internet connection.');
  }
};
