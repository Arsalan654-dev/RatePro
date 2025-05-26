// src/components/LanguageSelector/LanguageSelector.jsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { MdLanguage } from "react-icons/md"

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const router = useRouter()

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ]

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang)
    // In a real app, you would update the app's language context
    // and potentially save preference to localStorage
    console.log('Language changed to:', lang)
  }

  return (
    <div className="language-selector">
      <MdLanguage className="icon" />
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector