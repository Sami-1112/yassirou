// src/hooks/useLocale.js
import { useAppContext } from '../context/AppContext';

// هوك مخصص لسهولة الوصول إلى وظائف الترجمة واللغة
const useLocale = () => {
  const { locale, toggleLocale, t } = useAppContext();
  return { locale, toggleLocale, t };
};

export default useLocale;
