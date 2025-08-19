import "../Styles/Pages/Login.css";

import Footer from "../Footer";

import { useState } from "react";
import { Auth } from "../API/Auth";
const ForgottenPassword = () => {

  document.body.classList.add("auth");


  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState("");


  const togglePassword = () => setShowPassword((prev) => !prev);


const formSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    alert("Vyplňte prosím email.");
    return;
  }

  try {
    const res = await Auth.forgottenPassword(email);

    if (res.error) {
      alert("Chyba: " + res.error);
    } else {
      alert("Pokyny pro obnovení hesla byly odeslány na váš email.");
    }
  } catch (err) {
    alert("Nastala chyba: " + err.message);
  }
};

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Zapomenute heslo</h2>
            <p>Zadejte své přihlašovací údaje pro přístup k účtu</p>
          </div>

          <form className="login-form" id="forgotten" noValidate onSubmit={(e) => formSubmit(e)}>
            <input placeholder="Váš e-mailová adresa" type="text" onChange={(e) =>setEmail(e.target.value)} />
            <button>Potvrdit</button>
          </form>

          <div className="success-message" id="successMessage">
            <div className="success-icon">✓</div>
            <h3>Přihlášení proběhlo úspěšně!</h3>
            <p>Přesměrování na hlavní stránku...</p>
          </div>
        </div>
      </div>


      <Footer />
    </>
  );
};

export default ForgottenPassword;
