const Explanation = ({ explanation }) => {
    return (
      <div style={styles.container}>
        <h3>Explanation:</h3>
        <pre style={styles.explanation}>{explanation || 'No explanation yet.'}</pre>
      </div>
    );
  };
  
  const styles = {
    container: {
      width: '100%',
      maxWidth: '600px',
      margin: '20px auto',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      fontFamily: 'monospace',
    },
    explanation: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    },
  };
  
  export default Explanation;
  