// src/hooks/useLocale.js
import React from 'react'; // تأكد من استيراد React
import { useAppContext } from './useAppContext'; // تأكد من المسار الصحيح لـ useAppContext

/**
 * هوك مخصص (Custom Hook) لسهولة الوصول إلى وظائف الترجمة واللغة
 * من السياق العام للتطبيق (App Context).
 *
 * يوفر الوصول إلى:
 * - locale: اللغة الحالية (مثل 'ar' أو 'en').
 * - toggleLocale: دالة لتبديل اللغة.
 * - t: دالة الترجمة (ترجع النص المترجم حسب اللغة الحالية).
 */
export const useLocale = () => {
  const { locale, toggleLocale, t } = useAppContext();
  return { locale, toggleLocale, t };
};