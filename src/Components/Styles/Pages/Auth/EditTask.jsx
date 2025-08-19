import React, { useState, useEffect } from "react";
import Footer from "../../../Footer";
import { Tasks } from "../../../API/Tasks";  // Pokud máš API volání na úkoly
import { useNavigate, useParams } from "react-router-dom";  // Pro navigaci a získání parametru ID
import "../../../Styles/Pages/Auth/NewRecord.css";

const EditTask = () => {
  const { id } = useParams();  // Získání ID úkolu z URL
  const navigate = useNavigate();  // Pro navigaci po úspěšném odeslání formuláře
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  // Načteme data o úkolu podle ID při načítání komponenty
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const result = await Tasks.OneTask(id);  // Zavolání metody přímo
        if (result.error) {
          console.error(result.error);
        } else {
          // Pokud je deadline ve formátu ISO, přetvoříme ho na formát pro input[type="date"]
          const formattedDeadline = result.deadline
            ? result.deadline.split("T")[0]  // Extrahujeme jen datum (yyyy-MM-dd)
            : "";

          setFormData({
            name: result.title,  // Nastavení hodnoty pro formulář
            description: result.description,
            deadline: formattedDeadline,  // Přeformátovaný termín
          });
        }
      } catch (error) {
        console.error("Chyba při načítání úkolu:", error);
      }
    };

    fetchTask();  // Zavoláme funkci pro načtení úkolu
  }, [id]);  // Nezapomeňte přidat 'id' jako závislost pro useEffect

  // Funkce pro změnu hodnot formuláře
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funkce pro odeslání formuláře
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Tasks.EditTask(id, formData.name, formData.description, formData.deadline);  // Volání pro editaci úkolu
      if (result.error) {
        console.error(result.error);
        alert("Došlo k chybě při úpravě úkolu.");
      } else {
        alert("Úkol byl úspěšně upraven.");
        navigate(`/dashboard`);  // Po úspěšné úpravě přesměrujeme na detail úkolu
      }
    } catch (error) {
      console.error("Chyba při úpravě úkolu:", error);
      alert("Došlo k chybě při úpravě úkolu.");
    }
  };

  // Funkce pro zrušení a návrat zpět
  const onCancel = () => {
      navigate(`/dashboard`);  // Přejít zpět na stránku s detailem úkolu
  };

  return (
    <>
      <form className="new-record-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Název úkolu</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Zadejte název úkolu"
            required
          />
        </div>

        <div className="form-group">
          <label>Popis</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Podrobný popis úkolu"
          />
        </div>

        <div className="form-group">
          <label>Termín dokončení</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            Uložit
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={onCancel}
          >
            ✖ Zrušit
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default EditTask;
