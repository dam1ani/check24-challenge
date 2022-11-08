import React, { useEffect, useState } from 'react';

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    fetch('/api/hello').then(r => {
      r.json().then(j => setMsg(j.message))
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
