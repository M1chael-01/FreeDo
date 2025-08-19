// Import the AppHeader component to display the main header/navigation
import AppHeader from "../AppHeader";

// Import CSS styles specific to the Support page
import "../Styles/Pages/Auth/Support.css";

// Import the Footer component to display at the bottom of the page
import Footer from "../Footer";

const Support = () => {
  return (
    <>
      {/* Main application header/navigation */}
      <AppHeader />

      {/* Main container for the support page */}
      <section className="support-container">
        {/* Header section with title and description */}
        <header className="support-header">
          <h1>Centrum podpory</h1>
          <p>
            Vítejte v centru podpory. Zde najdete odkazy, informace a stav našich služeb, abyste mohli rychle pokračovat v práci.
          </p>
        </header>

        {/* Service status section */}
        <section className="service-status">
          <h2 id="heading">Stav služeb</h2>
          {/* List of current service statuses */}
          <ul>
            <li>Aplikace běží bez problémů</li>
            <li>Databáze dostupná</li>
            <li>API funkční</li>
          </ul>
        </section>

        {/* Contact information for support */}
        <section className="contact-info">
          <h2 id="heading">Kontakt na podporu</h2>
          <p>📞 Telefon: +420 123 456 789</p>
          <p>🕒 Pracovní doba: Po–Pá 9:00–17:00</p>
          <p>💬 Email: freeDo@gmail.com</p>
        </section>
      </section>

      {/* Footer component at the bottom of the page */}
      <Footer />
    </>
  );
};

// Export the Support component as the default export
export default Support;
