import React, { useState } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { callGeminiApi } from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const VisaRequestForm = () => {
  const { t, showMessage } = useAppContext();
  const baseWhatsappUrl = "https://wa.me/+201507000933?text=";

  const [visaDetails, setVisaDetails] = useState({
    country: '',
    visaType: '',
    nationality: '',
    purpose: '',
  });
  const [visaRequirementsResult, setVisaRequirementsResult] = useState('');
  const [isVisaAiLoading, setIsVisaAiLoading] = useState(false);

  const handleVisaChange = (e) => {
    const { name, value } = e.target;
    setVisaDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    setVisaRequirementsResult(''); // Clear AI visa result when input changes
    showMessage(null, null); // Clear previous messages
  };

  const handleVisaRequest = () => {
    if (!visaDetails.country || !visaDetails.nationality) {
      showMessage('error', 'الرجاء إدخال الدولة المطلوبة والجنسية لطلب التأشيرة.');
      return;
    }
    
    let messageParts = [];

    messageParts.push(t.visas.whatsappText);

    if (visaDetails.country) {
      messageParts.push(`${t.visas.country}: ${visaDetails.country}`);
    }
    if (visaDetails.visaType) { // حقل اختياري
      messageParts.push(`${t.visas.visaType}: ${visaDetails.visaType}`);
    }
    if (visaDetails.nationality) {
      messageParts.push(`${t.visas.nationality}: ${visaDetails.nationality}`);
    }
    if (visaDetails.purpose) { // حقل اختياري
      messageParts.push(`${t.visas.purpose}: ${visaDetails.purpose}`);
    }
    
    messageParts.push(''); // سطر فارغ للفصل
    messageParts.push(t.general.contactUs);

    const finalMessage = messageParts.map(part => encodeURIComponent(part)).join('%0A');

    window.open(`${baseWhatsappUrl}${finalMessage}`, '_blank');
    showMessage('success', 'تم إرسال طلب التأشيرة بنجاح!');
  };

  const generateVisaRequirements = async () => {
    const { nationality, country } = visaDetails;

    if (!nationality || !country) {
      showMessage('error', t.visas.aiAssistant.inputError);
      return;
    }

    setIsVisaAiLoading(true);
    setVisaRequirementsResult('');
    showMessage(null, null); // Clear previous messages

    const prompt = `As a travel assistant, provide general visa requirements for a citizen of ${nationality} traveling to ${country}. Include typical required documents (e.g., passport validity, photos, application form, bank statements, invitation letter) and any common steps or considerations. State if a visa is generally required or not. **Format the response clearly in Arabic,** using bullet points for documents if applicable. Start with a clear statement like 'متطلبات التأشيرة لمواطني [الجنسية] للسفر إلى [الدولة]:'.`;

    try {
      const text = await callGeminiApi(prompt);
      setVisaRequirementsResult(text);
      showMessage('success', 'تم توليد متطلبات التأشيرة بنجاح!');
    } catch (error) {
      showMessage('error', t.general.apiError);
      console.error('Error in AI Visa Assistant:', error);
    } finally {
      setIsVisaAiLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">{t.visas.formTitle}</h3>
      <p className="text-center text-gray-600 mb-6">{t.visas.formDescription}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="visaCountry" className="block text-gray-700 text-sm font-bold mb-2">
            {t.visas.country}
          </label>
          <input
            type="text"
            id="visaCountry"
            name="country"
            value={visaDetails.country}
            onChange={handleVisaChange}
            placeholder={t.visas.countryPlaceholder}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="visaType" className="block text-gray-700 text-sm font-bold mb-2">
            {t.visas.visaType}
          </label>
          <select
            id="visaType"
            name="visaType"
            value={visaDetails.visaType}
            onChange={handleVisaChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          >
            <option value="">{t.visas.selectVisaType}</option>
            <option value="سياحة">{t.visas.visaTypes.tourism}</option>
            <option value="عمل">{t.visas.visaTypes.work}</option>
            <option value="دراسة">{t.visas.visaTypes.study}</option>
            <option value="زيارة عائلية">{t.visas.visaTypes.familyVisit}</option>
            <option value="أخرى">{t.visas.visaTypes.other}</option>
          </select>
        </div>
        <div>
          <label htmlFor="visaNationality" className="block text-gray-700 text-sm font-bold mb-2">
            {t.visas.nationality}
          </label>
          <input
            type="text"
            id="visaNationality"
            name="nationality"
            value={visaDetails.nationality}
            onChange={handleVisaChange}
            placeholder={t.visas.nationalityPlaceholder}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="visaPurpose" className="block text-gray-700 text-sm font-bold mb-2">
            {t.visas.purpose}
          </label>
          <input
            type="text"
            id="visaPurpose"
            name="purpose"
            value={visaDetails.purpose}
            onChange={handleVisaChange}
            placeholder={t.visas.purposePlaceholder}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
      </div>
      <button
        onClick={handleVisaRequest}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105"
      >
        <MessageSquare className="w-5 h-5 ml-2" />
        {t.visas.button}
      </button>

      {/* AI Visa Requirements Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-xl font-semibold text-purple-700 mb-4 text-center">{t.visas.aiAssistant.title}</h4>
        <p className="text-center text-gray-600 mb-4">{t.visas.aiAssistant.description}</p>
        <div className="flex justify-center">
          <button
            onClick={generateVisaRequirements}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center font-medium"
            disabled={isVisaAiLoading}
          >
            {isVisaAiLoading ? (
              <LoadingSpinner color="text-white" />
            ) : (
              <Sparkles className="w-5 h-5 ml-2" />
            )}
            {isVisaAiLoading ? t.visas.aiAssistant.loading : t.visas.aiAssistant.button}
          </button>
        </div>

        {visaRequirementsResult && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200 text-gray-800 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
            <h4 className="font-semibold text-purple-700 mb-2">{t.visas.aiAssistant.resultTitle}</h4>
            {visaRequirementsResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaRequestForm;