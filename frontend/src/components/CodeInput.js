import { useState } from 'react';

const CodeInput = ({ onExplain }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      onExplain(code);
    }
  };

  return (
    <div style={styles.container}>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        style={styles.textarea}
      />
      <button onClick={handleSubmit} style={styles.button}>
        Explain Code
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    maxWidth: '600px',
    margin: '20px auto',
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontFamily: 'monospace',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.2s',
  },
};

export default CodeInput;
