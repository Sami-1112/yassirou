// src/components/Footer.js
import React from 'react';
import useTranslation from '../hooks/useTranslation';

const Footer = () => {
  const t = useTranslation();
  return (
    <footer className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 mt-8 text-center text-gray-600 text-sm backdrop-blur-sm bg-opacity-80 transition-all duration-300 hover:shadow-xl hover:bg-opacity-90">
      <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}.</p>
      <p className="mt-2">{t('footer.contact')} +201507000933</p>
    </footer>
  );
};

export default Footer;
