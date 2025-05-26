import { useEffect, useState } from 'react';

const OllamaSync = () => {
  const [dashboardCode, setDashboardCode] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:11434/api/generate');

    ws.onopen = () => {
      if (prompt) {
        ws.send(JSON.stringify({
          model: "llama3:8b-instruct-q4_0",
          prompt: `Update this React/Vite dashboard: ${prompt}. Return ONLY JSX/JS code.`,
          stream: true,
        }));
      }
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (!data.done) {
        setDashboardCode(prev => prev + data.response); // Real-time update
      }
    };

    return () => ws.close();
  }, [prompt]);

  return { dashboardCode, setPrompt };
};

export default OllamaSync;