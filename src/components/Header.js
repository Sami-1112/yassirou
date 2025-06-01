// src/components/Header.js
import React from 'react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { t, toggleLocale, locale } = useAppContext();

  return (
    <header className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 mb-8 text-center relative">
      <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-2">
        {t.appName}
      </h1>
      <p className="text-lg text-gray-600">{t.appSlogan}</p>
      <button
        onClick={toggleLocale}
        className="absolute top-4 right-4 bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200"
      >
        {locale === 'ar' ? 'English' : 'العربية'}
      </button>
    </header>
  );
};

export default Header;
