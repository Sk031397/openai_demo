import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [result, setResult] = useState();
  const [codeInput,setCodeInput] = useState();
  const [textInput,setTextInput] = useState();
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
    setTextInput("");
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
            placeholder="Enter a piece of text you wnat to make into code"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <input
          type="text"
          name="phrase_one"
          placeholder="Enter a piece of text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
