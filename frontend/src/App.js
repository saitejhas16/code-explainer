import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [language, setLanguage] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  // Function to detect language based on patterns
  const detectLanguage = (code) => {
    if (/^\s*#include\s*<.*>/.test(code) || /printf\(/.test(code)) {
      return 'C';
    } else if (/^\s*import\s/.test(code) || /def\s+.*:/.test(code)) {
      return 'Python';
    } else if (/^\s*public\s+class\s+/.test(code) || /System\.out\.println\(/.test(code)) {
      return 'Java';
    } else if (/^\s*console\.log\(/.test(code) || /function\s+.*\(/.test(code)) {
      return 'JavaScript';
    } else if (/^\s*func\s+.*\(/.test(code) || /import\s+Foundation/.test(code)) {
      return 'Swift';
    } else if (/std::cout/.test(code)) {
      return 'C++';
    } else {
      return 'Unknown';
    }
  };

  const handleExplain = async () => {
    if (!code.trim()) return;

    const detectedLanguage = detectLanguage(code);
    setLanguage(detectedLanguage);

    try {
      const response = await fetch('https://code-explainer-770n.onrender.com/explain', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language: detectedLanguage }),
    });
    
      if (response.ok) {
        const data = await response.json();
        setExplanation(''); // Clear existing explanation

        // Typewriter effect for explanation
        let i = 0;
        const interval = setInterval(() => {
          if (i < data.explanation.length) {
            setExplanation((prev) => prev + data.explanation.charAt(i));
            i++;
          } else {
            clearInterval(interval);
          }
        }, 10);
      } else {
        console.error('Failed to explain code');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        {/* About Code-Explainer */}
        <span className="about-link" onClick={() => setShowAbout(true)}>
          About Code-Explainer
        </span>
        
        {/* Title */}
        <h1 className="title">Code Explainer</h1>
        
        {/* View the Creator's Linkedin */}
        <span
          className="creator-link"
          onClick={() => window.open('https://www.linkedin.com/in/lnsaitejhas', '_blank')}
        >
          View the Creator
        </span>
      </div>

      {/* About Popup */}
      {showAbout && (
        <div className="about-popup">
          <span className="close-btn" onClick={() => setShowAbout(false)}>✖</span>
          <h2>About Code-Explainer</h2>
          <p>
            🚀 Code Explainer helps you break down code written in any programming language
            and provides detailed explanations in seconds.  
            ✅ Supports Python, C, C++, Java, JavaScript, HTML, CSS, PHP, Ruby, Kotlin, Swift, and more!  
            💡 Perfect for beginners and pros alike!  
          </p>
        </div>
      )}

      {/* Code Input Section */}
      <div className="split-container">
        <div className="code-section">
          <textarea
            className="input-box"
            placeholder="Write code in any language (Python, C++, Java...)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="explain-button" onClick={handleExplain}>
            Explain Code
          </button>
        </div>

        {/* Explanation Section */}
        <div className="explanation-section">
          {explanation ? (
            <>
              {language && <div className="language-info">🌍 Detected Language: {language}</div>}
              <pre className="explanation-text">{explanation}</pre>
            </>
          ) : (
            <div className="placeholder-text">
              🚀 **Unleash Your Coding Potential!**  
              <br />  
              ✅ Supports Python, C, C++, Java, JavaScript, HTML, CSS, PHP, Ruby, Kotlin, Swift, and more!  
              <br />  
              💡 Take the leap – Your journey to mastering code starts NOW!  
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
