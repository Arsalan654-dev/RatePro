const PromptBox = ({ setPrompt }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    setPrompt(input); // Triggers WebSocket
    setInput('');
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter instructions (e.g., 'Change header color to red')"
      />
      <button onClick={handleSubmit}>Apply Changes</button>
    </div>
  );
};