const Reviews = () => {
  return (
   <>
   <div id="reference">

 
    {/* User references/testimonials section */}
      <section className="references" aria-label="Reference uživatelů">
        <div className="references-container">
          <h2>Co o Freelu říkají naši uživatelé</h2>
          <p className="references-description">
            Přečtěte si zkušenosti našich uživatelů a zjistěte, jak Freelo pomáhá týmům zefektivnit práci a udržet projekty pod kontrolou.
          </p>
          <div className="reference-cards">
            <div className="reference-card">
              <p>"Freelo nám kompletně nahradilo e-maily a Excel. Náš tým je teď mnohem efektivnější!"</p>
              <h4>- Jana Nováková, Projektová manažerka</h4>
            </div>
            <div className="reference-card">
              <p>"Skvělá aplikace pro týmovou spolupráci. Všechny úkoly a projekty máme přehledně na jednom místě."</p>
              <h4>- Petr Svoboda, Vedoucí týmu</h4>
            </div>
            <div className="reference-card">
              <p>"Mobilní aplikace mi umožňuje sledovat projekty i mimo kancelář. Doporučuji všem!"</p>
              <h4>- Lucie Křížová, Freelancer</h4>
            </div>
          </div>
        </div>
      </section>
        </div>
   </>
  )
}

export default Reviews