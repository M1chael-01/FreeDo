import "../Styles/Pages/Home.css";

import image from "../../images/home.png";
import { useState } from "react";
import AppThatWork from "../Styles/Pages/Public/AppThatWork";
import Features from "../Styles/Pages/Public/Features";
import Cta from "../Styles/Pages/Public/Cta";
import Faq from "../Styles/Pages/Public/Faq";
import Reviews from "../Styles/Pages/Public/Reviews";

const Home = () => {

  return (
    <>
      <section className="first">
        <main className="first-text">
          <h2>Všechny úkoly přehledně</h2>
         <p>
  Freedo Notes je vaše digitální místo pro všechny nápady, poznámky a úkoly. Umožňuje rychle zapisovat myšlenky, organizovat je podle priorit a mít je vždy po ruce, ať už pracujete z domova, kanceláře nebo na cestách.
</p>

          <a href="/create-account">
            <button className="cta-btn">Vyzkoušet zdarma</button>
          </a>
          <a href="#vyhody">
            <button id="cta-btn" className="cta-btn">Zjistit více</button>
          </a>
        </main>

      {/* https://www.freepik.com/free-vector/appointment-booking-with-smartphone-woman_8400660.htm#fromView=search&page=2&position=32&uuid=ffccf7fb-486f-4890-9799-dd303923d7d4&query=to+do+app */}
        <main className="first-image">
          <img
            src={image}
            alt="Ukázka aplikace Freelo"
          />
        </main>
      </section>

<AppThatWork/>
 <Features/>   
<Cta/>
<Faq/>         
<Reviews/>
      


      <footer className="footer" aria-label="Patička stránky">
        <div className="footer-container">
          <div className="footer-links">
            <div className="footer-column">
              <h4>O Freelu</h4>
              <ul>
                <li><a href="#features">Funkce</a></li>
                <li><a href="#pricing">Recenze</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Podpora</h4>
              <ul>
                <li><a href="#contact">FAQ</a></li>
                <li><a href="#help">Podmínky</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Sledujte nás</h4>
              <ul className="social-links">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Twitter</a></li>
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Freelo. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
