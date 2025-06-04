// src/forms/VisaRequestForm.js
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import { MessageSquare, Sparkles } from 'lucide-react';
import MessageDisplay from '../components/MessageDisplay'; // Import MessageDisplay

const VisaRequestForm = ({
  visaDetails,
  handleVisaChange,
  handleVisaRequest,
  visaRequirementsResult,
  isVisaAiLoading,
  visaAiError,
  generateVisaRequirements,
  setVisaAiError // Pass setVisaAiError to clear messages
}) => {
  const t = useTranslation();

  // Clear AI error when input changes
  const onVisaChange = (e) => {
    handleVisaChange(e);
    setVisaAiError('');
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">{t('visas.formTitle')}</h3>
      <p className="text-center text-gray-600 mb-6">{t('visas.formDescription')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="visaCountry" className="block text-gray-700 text-sm font-bold mb-2">
            {t('visas.requiredCountryLabel')}
          </label>
          <input
            type="text"
            id="visaCountry"
            name="country"
            value={visaDetails.country}
            onChange={onVisaChange}
            placeholder={t('visas.countryPlaceholder')}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="visaType" className="block text-gray-700 text-sm font-bold mb-2">
            {t('visas.visaTypeLabel')}
          </label>
          <select
            id="visaType"
            name="visaType"
            value={visaDetails.visaType}
            onChange={onVisaChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          >
            <option value="">{t('visas.selectVisaTypePlaceholder')}</option>
            <option value="سياحة">{t('visas.tourism')}</option>
            <option value="عمل">{t('visas.work')}</option>
            <option value="دراسة">{t('visas.study')}</option>
            <option value="زيارة عائلية">{t('visas.familyVisit')}</option>
            <option value="أخرى">{t('visas.other')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="visaNationality" className="block text-gray-700 text-sm font-bold mb-2">
            {t('visas.nationalityLabel')}
          </label>
          <input
            type="text"
            id="visaNationality"
            name="nationality"
            value={visaDetails.nationality}
            onChange={onVisaChange}
            placeholder={t('visas.nationalityPlaceholder')}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="visaPurpose" className="block text-gray-700 text-sm font-bold mb-2">
            {t('visas.purposeLabel')}
          </label>
          <input
            type="text"
            id="visaPurpose"
            name="purpose"
            value={visaDetails.purpose}
            onChange={onVisaChange}
            placeholder={t('visas.purposePlaceholder')}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
        </div>
      </div>
      <button
        onClick={handleVisaRequest}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105"
      >
        <MessageSquare className="w-5 h-5 ml-2" />
        {t('visas.sendRequestButton')}
      </button>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-xl font-semibold text-purple-700 mb-4 text-center">{t('visas.aiVisaAssistantTitle')}</h4>
        <p className="text-center text-gray-600 mb-4">{t('visas.aiVisaAssistantDescription')}</p>
        <div className="flex justify-center">
          <button
            onClick={generateVisaRequirements}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center font-medium"
            disabled={isVisaAiLoading}
          >
            {isVisaAiLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Sparkles className="w-5 h-5 ml-2" />
            )}
            {isVisaAiLoading ? t('visas.searching') : t('visas.getRequirementsButton')}
          </button>
        </div>

        <MessageDisplay message={visaAiError} type="error" />

        {visaRequirementsResult && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200 text-gray-800 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
            <h4 className="font-semibold text-purple-700 mb-2">{t('visas.suggestedVisaRequirements')}</h4>
            {visaRequirementsResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaRequestForm;
