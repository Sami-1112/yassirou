import React from "react";
import { useLocale } from "../hooks/useLocale";

export default function Header() {
  const { t, switchLocale } = useLocale();
  return (
    <header className="w-full max-w-4xl bg-white rounded-xl p-6 mb-8 text-center shadow-lg flex flex-col items-center">
      <div className="flex w-full justify-between mb-2">
        <span className="text-2xl font-bold text-indigo-700">{t.appTitle}</span>
        <button
          className="rounded-full px-4 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium shadow"
          onClick={switchLocale}
        >
          {t.langSwitch}
        </button>
      </div>
      <p className="text-lg text-gray-600">{t.appSubtitle}</p>
    </header>
  );
}