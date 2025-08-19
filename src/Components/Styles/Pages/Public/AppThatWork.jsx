import React from 'react'
import { useState } from "react";


const AppThatWork = () => {
     const [email,setEmail] = useState("");

  return (
    <>
     {/* Introductory section with email subscription form */}
      <section id='app-that-work' className="home" aria-label="Úvodní sekce">
        <main id="#home">
          <h1>To-do list, který funguje i v týmu</h1>
          <p>
          Freedo je inteligentní a flexibilní nástroj pro správu úkolů, který vám pomáhá organizovat práci.
          </p>

          {/* Email subscription form */}
          <form 
            action="#"
            method="post"
            aria-label="Přihlášení k odběru novinek e-mailem"
            className="email-form"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              // Add submit logic here (e.g., API call or state update)
              if(email) {
                localStorage.setItem("Email" , email);
                window.location.href = "/create-account";
              }
            }}
          >
            <label htmlFor="email" className="sr-only">
              Váš e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Zadejte svůj e-mail"
              required
              aria-required="true"
              autoComplete="email"
              className="email-input"
              onChange={(e) =>setEmail(e.target.value) }
            />
            <button type="submit" className="submit-btn">
              Přihlásit se
            </button>
          </form>
        </main>
      </section>
    </>
  )
}

export default AppThatWork