import React from 'react'

const Features = () => {
  return (
   <>
   <div id='proc-freeDo'>

  
    {/* Benefits section */}
      <section className="benifits" id="vyhody">
        <h2>Výhody, které na Freelu oceníte</h2>
        <div className="benefits-grid">
          {/* Individual benefit cards */}
          <div className="benefit-card">
            <div className="icon">📋</div>
            <h3>Snadná správa projektů</h3>
            <p>Přehledné rozdělení úkolů, termínů a projektových fází.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">💬</div>
            <h3>Transparentní komunikace</h3>
            <p>Diskuze, komentáře a notifikace přímo u projektů a úkolů.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">🧾</div>
            <h3>Jednoduché fakturace</h3>
            <p>Rychlé vystavení faktur přímo z projektů a sledování plateb.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">📱</div>
            <h3>Mobilní aplikace</h3>
            <p>Spravujte své projekty kdykoliv a kdekoliv z telefonu.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">🔗</div>
            <h3>Integrace s nástroji</h3>
            <p>Napojení na Slack, Google Drive a další oblíbené aplikace.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">🔒</div>
            <h3>Bezpečnost dat</h3>
            <p>Vaše projekty a dokumenty jsou bezpečně uloženy a zálohovány.</p>
          </div>
        </div>
      </section>
     </div>
   </>
  )
}

export default Features