// src/hooks/useLocale.js
import useLocale from '../hooks/useLocale'; // 

// هوك مخصص لسهولة الوصول إلى وظائف الترجمة واللغة
const useLocale = () => {
  const { locale, toggleLocale, t } = useAppContext();
  return { locale, toggleLocale, t };
};

export default useLocale;
