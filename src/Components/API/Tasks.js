import { BACKEND_URL } from "./GetBackendUrl";

export class Tasks {
  static async CreateNewTask(title, description, deadline) {
    try {
      const res = await fetch(`${BACKEND_URL}/Tasks/Create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({ title, description, deadline })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Chyba při vytváření úkolu");
      }

      const data = await res.json();
      return data; // Vrátí vytvořený úkol nebo potvrzení
    } catch (err) {
      console.error("Chyba:", err);
      return { error: err.message };
    }
  }
static async OneTask(taskId) {
  try {
    // Volání API pro získání úkolu
    const res = await fetch(`${BACKEND_URL}/Tasks/OneTask/${taskId}`, {
      method: "GET",
      credentials: "include", // Použití cookies/session pro autentifikaci, pokud je potřeba
      headers: {
        "Content-Type": "application/json", // Nastavení správného typu požadavku
         Authorization: `Bearer ${localStorage.getItem("token") || ""}`
      },
    });

    // Zkontrolujeme, zda odpověď byla úspěšná
    if (!res.ok) {
      throw new Error(`Chyba při získávání úkolu: ${res.status}`);
    }

    // Přečteme odpověď jako JSON
    const task = await res.json();

    // Vrátíme získaný úkol
    return task;

  } catch (err) {
    // Pokud dojde k chybě, vypíšeme ji do konzole a vrátíme chybu
    console.error("Chyba při načítání úkolu:", err);
    return { error: err.message };
  }
}
  static async EditTask(taskId, title, description, deadline) {
    try {
      const res = await fetch(`${BACKEND_URL}/Tasks/Edit/${taskId}`, {
        method: "PUT",  // Použijeme PUT pro aktualizaci
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({ title, description, deadline })  // Odesíláme nové hodnoty úkolu
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Chyba při úpravě úkolu");
      }

      const data = await res.json();  // Přečteme odpověď (např. aktualizovaný úkol)
      return data;  // Vrátíme data
    } catch (err) {
      console.error("Chyba:", err);
      return { error: err.message };  // Vracíme chybu v případě neúspěchu
    }
  }

}
