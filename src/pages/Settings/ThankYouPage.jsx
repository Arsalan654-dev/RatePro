// src/pages/Settings/ThankYouPage.jsx
"use client"

import { useState } from "react"
import { MdSave, MdPreview } from "react-icons/md"

const ThankYouPage = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    type: 'default', // 'default', 'redirect', or 'custom'
    message: 'Thank you for completing our survey!',
    redirectUrl: '',
    showSocialSharing: true,
    showCoupon: false,
    couponCode: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const saveSettings = (e) => {
    e.preventDefault()
    // Save thank you page settings
    console.log('Thank you page settings saved:', settings)
  }

  return (
    <div className="thank-you-page">
      <div className="page-header">
        <h1>Thank You Page Settings</h1>
      </div>

      <form onSubmit={saveSettings}>
        <div className="form-group toggle-group">
          <label>Enable Custom Thank You Page</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="enabled"
              name="enabled"
              checked={settings.enabled}
              onChange={handleChange}
            />
            <label htmlFor="enabled" className="toggle-label"></label>
          </div>
        </div>

        {settings.enabled && (
          <>
            <div className="form-group">
              <label>Thank You Page Type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="default"
                    checked={settings.type === 'default'}
                    onChange={handleChange}
                  />
                  Default Message
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="redirect"
                    checked={settings.type === 'redirect'}
                    onChange={handleChange}
                  />
                  Redirect to URL
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="custom"
                    checked={settings.type === 'custom'}
                    onChange={handleChange}
                  />
                  Custom Page
                </label>
              </div>
            </div>

            {settings.type === 'default' && (
              <div className="form-group">
                <label>Thank You Message</label>
                <textarea
                  name="message"
                  value={settings.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            )}

            {settings.type === 'redirect' && (
              <div className="form-group">
                <label>Redirect URL</label>
                <input
                  type="url"
                  name="redirectUrl"
                  value={settings.redirectUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/thank-you"
                  required
                />
              </div>
            )}

            {settings.type === 'custom' && (
              <div className="form-group">
                <label>Custom HTML</label>
                <textarea
                  name="customHtml"
                  value={settings.customHtml || ''}
                  onChange={handleChange}
                  rows={8}
                  placeholder="<div class='thank-you'><h1>Thank You!</h1></div>"
                />
              </div>
            )}

            <div className="form-group toggle-group">
              <label>Show Social Sharing Buttons</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="showSocialSharing"
                  name="showSocialSharing"
                  checked={settings.showSocialSh