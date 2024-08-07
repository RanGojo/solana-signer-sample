import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { RangoClient } from 'rango-sdk-basic';

function App() {
  const [count, setCount] = useState(0);

  const testSigner = async function () {
    const rango = new RangoClient('c6381a79-2817-4602-83bf-6a641a409e32');
    const meta: MetaResponse = await rango.meta();
    const usdt_address = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';
    const sol = meta.tokens.find(
      (t) => t.blockchain == 'SOLANA' && t.address == null
    );
    const usdt = meta.tokens.find(
      (t) => t.blockchain == 'SOLANA' && t.address == usdt_address
    );
  };

  useEffect(() => {
    testSigner();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
