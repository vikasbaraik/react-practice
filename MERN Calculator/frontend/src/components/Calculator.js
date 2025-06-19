import React, { useState, useEffect } from 'react';
import axios from 'axios';
import History from './History';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await axios.get('http://localhost:5000/api/calculations');
    setHistory(res.data);
  };

  const calculate = async () => {
    try {
      const res = eval(expression);
      setResult(res);
      await axios.post('http://localhost:5000/api/calculations', { expression, result: res });
      fetchHistory();
    } catch {
      setResult('Error');
    }
  };

  const useFromHistory = (item) => {
    setExpression(item.expression);
    setResult(item.result);
  };

  return (
    <div>
      <input value={expression} onChange={(e) => setExpression(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      <h2>Result: {result}</h2>
      <History data={history} onSelect={useFromHistory} />
    </div>
  );
}

export default Calculator;
