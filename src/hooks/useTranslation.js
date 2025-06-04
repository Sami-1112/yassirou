// src/hooks/useTranslation.js
import { useLocale } from '../contexts/LocaleContext';

// Hook بسيط لاستخدام دالة الترجمة
const useTranslation = () => {
  const { t } = useLocale();
  return t;
};

export default useTranslation;
