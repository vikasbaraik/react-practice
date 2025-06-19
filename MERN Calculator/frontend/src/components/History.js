import React from 'react';

function History({ data, onSelect }) {
  return (
    <div>
      <h3>History (Last 10)</h3>
      <ul>
        {data.map((item, i) => (
          <li key={i} onClick={() => onSelect(item)} style={{ cursor: 'pointer' }}>
            {item.expression} = {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
