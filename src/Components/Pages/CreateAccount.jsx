import { useEffect, useState } from "react";
import { Auth } from "../API/Auth";
import "../Styles/Pages/Login.css";
import Footer from "../Footer";

const CreateAccount = () => {
  document.body.classList.add("auth");

  const [user, setUser] = useState({
    name: "",
    email: localStorage.getItem("Email") || "",
    password: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!termsAccepted) {
      alert("Musíte souhlasit s podmínkami aplikace.");
      return;
    }

    if (!user.name || !user.email || !user.password) {
      alert("Vyplňte prosím všechna pole.");
      return;
    }

    try {
      const response = await Auth.createAccount(user.name, user.email, user.password);
      console.log("Response:", response);

      if (response.message?.includes("úspěšně")) {
        localStorage.setItem("User", JSON.stringify({ name: user.name, email: user.email }));
        window.location.href = "/dashboard";
      } else {
        setError("Něco se pokazilo. Zkuste to znovu.");
      }
    } catch (err) {
      console.error("Chyba při registraci:", err);
      setError("Chyba serveru. Zkuste to později.");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Vytvoření účtu</h2>
            <p>Vyplňte prosím níže uvedené údaje pro vytvoření účtu.</p>
          </div>

          <form onSubmit={formSubmit} className="login-form" id="registerForm" noValidate>
            <div className="form-row">
              <div className="input-wrapper">
                <input
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                />
                <label htmlFor="name">Celé jméno</label>
              </div>
              <div className="input-wrapper">
                <input
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                />
                <label htmlFor="email">E-mailová adresa</label>
              </div>
            </div>

            <div className="form-row">
              <div className="input-wrapper password-wrapper">
                <input
                  value={user.password}
                  type="password"
                  id="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <label htmlFor="password">Heslo</label>
                <button type="button" className="password-toggle" id="passwordToggle" aria-label="Toggle password visibility">
                  <span style={{ marginTop: "-10px" }} className="eye-icon"></span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <div className="checkbox-and-login-wrapper">
                <div className="checkbox-wrapper">
                  <input
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                  />
                  <label htmlFor="terms">
                    Souhlasím s{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      podmínkami aplikace
                    </a>
                  </label>
                </div>
                <div className="signup-link-inline">
                  <p>
                    Máte již účet? <a href="/login">Přihlaste se</a>
                  </p>
                </div>
              </div>
            </div>

            <button type="submit" className="login-btn">
              <span className="btn-text">Vytvořit účet</span>
              <span className="btn-loader"></span>
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}

          <div className="success-message" id="successMessage">
            <div className="success-icon">✓</div>
            <h3>Registrace úspěšná!</h3>
            <p>Přesměrování na váš účet...</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateAccount;
