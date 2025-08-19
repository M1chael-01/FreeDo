// Import main header/navigation component
import AppHeader from "../AppHeader";

// Import CSS styles specific to the AppSettings page
import "../Styles/Pages/Auth/AppSettings.css";

// Import Footer component
import Footer from "../Footer";

// Import icons from react-icons for visual enhancement
import { FaServer, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaDesktop } from "react-icons/fa";

const AppSettings = () => {
  // Object containing application info
  const appInfo = {
    version: "1.4.2",             // Current app version
    build: "2025-08-13-01",       // Build identifier
    lastUpdate: "13. srpna 2025", // Date of last update
    apiStatus: "OK",              // Current API status
    serverRegion: "EU - Central", // Server location
    uptime: 99.98,                // Server uptime percentage
  };

  // Array of system requirements for the app
  const systemRequirements = [
    "Moderní webový prohlížeč (Chrome, Edge, Safari)",
    "JavaScript musí být povolen",
    "Cookies.LocalStorage,Relace",
    "Stabilní připojení k internetu",
    "Minimálně 4 GB RAM doporučeno pro plynulý chod",
    "Rozlišení obrazovky minimálně 1280x720 px",
    "Rozlišení obrazovky minimálně 1280x720 px",
  ];

  return (
    <>
      {/* Main application header/navigation */}
      <AppHeader />

      {/* Main container for AppSettings page */}
      <section className="app-settings-container">
        {/* Header section with title and description */}
        <header className="app-settings-header">
          <h1>Technické informace o aplikaci</h1>
          <p>Podrobnosti o aktuální verzi, API a systémových požadavcích.</p>
        </header>

        {/* Cards displaying application info and system requirements */}
        <div className="app-info-cards">
          {/* Application information card */}
          <div className="app-info-card hover-card">
            <h2><FaInfoCircle /> Informace o aplikaci</h2>
            <ul>
              <li><strong>Verze:</strong> {appInfo.version}</li>
              <li><strong>Build:</strong> {appInfo.build}</li>
              <li><strong>Poslední aktualizace:</strong> {appInfo.lastUpdate}</li>
              <li>
                <strong>Stav API:</strong>{" "}
                {/* Display green check or red cross depending on API status */}
                <span className={`status ${appInfo.apiStatus === "OK" ? "ok" : "error"}`}>
                  {appInfo.apiStatus === "OK" ? <FaCheckCircle /> : <FaTimesCircle />} {appInfo.apiStatus}
                </span>
              </li>
              <li><strong>Serverová oblast:</strong> <FaServer /> {appInfo.serverRegion}</li>
              <li>
                <strong>Dostupnost (Uptime):</strong>
                {/* Visual uptime bar */}
                <div className="uptime-bar">
                  <div className="uptime-progress" style={{ width: `${appInfo.uptime}%` }}></div>
                  <span>{appInfo.uptime}%</span>
                </div>
              </li>
            </ul>
          </div>

          {/* System requirements card */}
          <div className="app-info-card hover-card">
            <h2><FaDesktop /> Systémové požadavky</h2>
            <ul>
              {/* Map through system requirements array */}
              {systemRequirements.map((req, i) => (
                <li key={i}>• {req}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer at the bottom of the page */}
      <Footer />
    </>
  );
};

// Export AppSettings component as default
export default AppSettings;
