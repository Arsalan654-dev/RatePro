// src/pages/Settings/ThankYouPage.jsx
"use client";

import { useState } from "react";

import { MdCheck } from "react-icons/md";

const ThankYouPage = () => {
  const [message, setMessage] = useState("Thank you for completing the survey!");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // Save logic goes here (API call)
    console.log("Saved Thank You settings:", { message, redirectUrl });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Customize Thank You Page</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Custom Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a custom thank-you message..."
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Redirect URL (Optional)</label>
        <input
          type="url"
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
          placeholder="https://example.com/thank-you"
        />
      </div>

      <button onClick={handleSave} className="mt-2">
        Save Settings
      </button>

      {isSaved && (
        <div className="text-green-600 flex items-center gap-2 mt-3">
          <MdCheck className="text-xl" /> Settings saved!
        </div>
      )}
    </div>
  );
};

export default ThankYouPage;
