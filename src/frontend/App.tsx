import React, { useEffect, useState } from 'react';

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const params = new URLSearchParams({
      adults: String(3),
      kids: String(1),
      from: new Date('2022-08-04 16:00:00').toISOString(),
      to: new Date('2022-09-03 06:15:00').toISOString(),
      airport: 'MUC',
      days: String(6),
      page: String(1)
    })
    fetch('/api/get-hotels?' + params.toString()).then(r => {
      r.json().then(j => console.log(j))
    })
  }, [])
  return (
    <>
      <div>
        <h1>Welcome</h1>
        <h2>MSG: {msg}</h2>
      </div>
    </>
  );
}

export default App;
