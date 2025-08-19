import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const showQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Jak mohu začít používat Freelo zdarma?",
      answer:
        'Stačí kliknout na tlačítko "Vyzkoušet zdarma", zaregistrovat se a okamžitě můžete spravovat své projekty.',
    },
    {
      question: "Je Freelo vhodné pro týmovou spolupráci?",
      answer:
        "Ano, Freelo je navrženo tak, aby tým mohl efektivně komunikovat, sledovat úkoly a projekty v reálném čase.",
    },
    {
      question: "Mohu integrovat Freelo s jinými nástroji?",
      answer:
        "Freelo nabízí integrace se Slackem, Google Drive a dalšími oblíbenými aplikacemi.",
    },
  ];

  return (
    <section className="faq" aria-label="Často kladené otázky">
      <div className="faq-container">
        <h2>Často kladené otázky</h2>

        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <button className="faq-question" onClick={() => showQ(index)}>
              {item.question}
            </button>

            {openIndex === index && <p>{item.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
