import React, { useState } from "react";
import Footer from "../../../Footer";
import { Tasks } from "../../../API/Tasks";
import "../../../Styles/Pages/Auth/NewRecord.css"
const NewRecord = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.deadline) {
    alert("Prosím vyplňte název a termín úkolu.");
    return;
  }

  try {
    const result = await Tasks.CreateNewTask(
      formData.name,
      formData.description,
      formData.deadline
    );

    if (result.error) {
      alert("Chyba při vytváření úkolu: " + result.error);
    } else {
      alert("Úkol byl úspěšně vytvořen!");
      // případně vyčistit formulář
      setFormData({ name: "", description: "", deadline: "" });
    }
  } catch (err) {
    console.error(err);
    alert("Došlo k neočekávané chybě.");
  }
};


  const onCancel = () =>{
    window.location.href = "/dashboard";
  }

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
    <Footer/>
   </>
  );
};

export default NewRecord;
