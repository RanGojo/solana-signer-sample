import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MetaResponse, RangoClient, TransactionType } from "rango-sdk-basic";
import {
  DefaultSolanaSigner,
  setSolanaSignerConfig,
} from "@rango-dev/signer-solana";

function App() {
  const rango = new RangoClient("c6381a79-2817-4602-83bf-6a641a409e32");

  const signCallback = useCallback(async () => {
    // connect wallet
    const solana = (window as any).phantom?.solana;
    if (!solana) {
      throw Error("Please install phantom");
    }
    const solanaResponse = await solana.connect();
    const account = solanaResponse.publicKey.toString();
    if (!account) {
      throw Error("Account is empty!");
    }

    // select source & destination tokens
    const meta: MetaResponse = await rango.meta();
    const usdt_address = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
    const sol = meta.tokens.find(
      (t) => t.blockchain == "SOLANA" && t.address == null
    );
    const usdt = meta.tokens.find(
      (t) => t.blockchain == "SOLANA" && t.address == usdt_address
    );

    // get transaction data
    const swap = await rango.swap({
      from: sol,
      to: usdt,
      slippage: "3",
      amount: "1000000",
      fromAddress: account,
      toAddress: account,
      disableEstimate: true,
    });
    console.log({ swap });

    // sign the transaction
    if (swap.tx?.type === TransactionType.SOLANA) {
      const signer = new DefaultSolanaSigner(solana);
      // setSolanaSignerConfig("customRPC", "https://your-rpc.com/");
      const { hash } = await signer.signAndSendTx(swap.tx);
      console.log(hash);
    } else {
      console.log(swap.error);
    }
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
        <button onClick={() => signCallback()}>test</button>
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
