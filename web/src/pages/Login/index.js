import React, { useState } from "react";
import api from "../../services/api";
import "./index.css";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email) {
      setInputError("Type a valid email");
      return;
    }

    const response = await api.post("/sessions", {
      email: email,
    });
    const { _id } = response.data;
    localStorage.setItem("user", _id);

    history.push("/dashboard");
  }
  return (
    <>
      <p>
        Offer <strong>spots</strong> for travellers
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail</label>
        {inputError ? (
          <input
            className="has-error"
            type="email"
            id="email"
            placeholder="Your best e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        ) : (
          <input
            type="email"
            id="email"
            placeholder="Your best e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        )}
        {inputError && <span>{inputError}</span>}
        <button type="submit" className="btn">
          Join
        </button>
      </form>
    </>
  );
}
