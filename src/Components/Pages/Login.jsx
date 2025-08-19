import "../Styles/Pages/Login.css";
import Footer from "../Footer";
import { useState } from "react";
import { Auth } from "../API/Auth";

const Login = () => {
  document.body.classList.add("auth");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(false); 

  const togglePassword = () => setShowPassword((prev) => !prev);

  const LoginSubmit = async (e) => {
    e.preventDefault();
    if (userName && password) {
      setLoading(true); 
      setError(""); 
      setSuccess(false); 

      const response = await Auth.login(userName, password);
      setLoading(false); 

      if (response?.error) {
        setError(response.error); 
      } else {
        setSuccess(true); 
        window.location.href = "/dashboard";
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Přihlášení</h2>
            <p>Zadejte své přihlašovací údaje pro přístup k účtu</p>
          </div>

          <form onSubmit={LoginSubmit} className="login-form" id="loginForm" noValidate>
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={userName}
                  onInput={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="email">Username</label>
              </div>
              <span className="error-message" id="emailError"></span>
            </div>

            <div className="form-group">
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Heslo</label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePassword}
                  aria-label="Toggle password visibility"
                >
                  <span className={`eye-icon ${showPassword ? "show-password" : ""}`}></span>
                </button>
              </div>
              <span className="error-message" id="passwordError"></span>
            </div>

            <div className="form-options">
              
              <a href="/forgotten-password" className="forgot-password">
                Zapomenuté heslo
              </a>
            </div>

            {/* Submit button */}
            <button type="submit" className="login-btn" disabled={loading}>
              <span className="btn-text">Přihlásit se</span>
              {loading && <span className="btn-loader"></span>} 
            </button>
          </form>

         
          {error && <div className="error-message">{error}</div>}

         
          {success && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Přihlášení proběhlo úspěšně!</h3>
              <p>Přesměrování na hlavní stránku...</p>
            </div>
          )}

          <div className="signup-link">
            <p>
              Nemáte účet? <a href="/create-account">Vytvořte si ho</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
