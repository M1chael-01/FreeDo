import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Styles/AppHeader.css";
import { BACKEND_URL } from "./API/GetBackendUrl";

const AppHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "");

  const [links, setLinks] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedUserPages = [
    "dashboard",
    "my-acc",
    "app-setting",
    "app-support",
    "notification",
    "podpora",
    "new-record",
    "edit-task"
  ];

  const loggedUserLinks = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Můj účet", link: "/my-acc" },
    { name: "Nastavení aplikace", link: "/app-setting" },
    { name: "Podpora", link: "/podpora" },
  ];

  const notLoggedLinks = [
    { name: "Produkt", link: "/produkt" },
    { name: "O aplikaci", link: "/aplikace" },
    { name: "Proč FreeDo", link: "/proc-freeDo" },
    { name: "Reference", link: "/reference" },
  ];

  useEffect(() => {
    if (loggedUserPages.includes(currentPath)) {
      setLinks(loggedUserLinks);
      setIsLogged(true);
    } else {
      setLinks(notLoggedLinks);
      setIsLogged(false);
    }
  }, [currentPath]);


const checkAccess = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token není k dispozici");
      return false;
    }

    const response = await fetch(`${BACKEND_URL}/Auth/checkAccess`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Nepodařilo se ověřit přístup:", response.status);
      return false;
    }

    const data = await response.json();
    if (data.email && data.email.length > 0) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  } catch (err) {
    console.error("Chyba při ověřování přístupu:", err);
    return false;
  }
};

useEffect(() => {
  checkAccess();
}, []);


  return (
    <header className="app-header">
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">Free<span>Do</span></Link>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {links.map((item, index) => (
            <li key={index}>
              <Link to={item.link} onClick={() => setMenuOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-icons">
          {isLogged ? (
            <Link id="logout" className="logout" to="/logout" title="odhlášení">
              <span>Odhlásit se</span>
            </Link>
          ) : (
            <Link id="btn-login" className="btn-login" to="/login" title="Přihlášení">
              Přihlášení
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
