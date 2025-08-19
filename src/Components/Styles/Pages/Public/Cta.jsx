import React from 'react'

const Cta = () => {
  return (
    <>
    <div id='aplikace'>

   
          {/* Call-to-action section */}
      <section  id="cta" className="cta" aria-label="Call to Action">
        <div className="cta-container">
          <h2>Začněte spravovat Vaše dny efektivně</h2>
          <p>Vyzkoušejte Freelo zdarma a zjistěte, jak jednoduché může být řízení úkolů.</p>
          <a href="/create-account">
            <button className="cta-btn">Vyzkoušet zdarma</button>
          </a>
        </div>
      </section>
       </div>
    </>
  )
}

export default Cta