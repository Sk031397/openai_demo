import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [result, setResult] = useState();
  const [codeInput,setCodeInput] = useState();
  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput }), 
    });
    const data = await response.json();
    setResult(data.result);
	   setCodeInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Demo</title>
      </Head>

      <main className={styles.main}>
        <form onSubmit={onSubmit}>
	   <input
            type="text"
            name="phrase"
            placeholder="Enter a phrase"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <input type="submit" value="Generate code" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
