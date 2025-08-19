import { BACKEND_URL } from "./GetBackendUrl";

export class Auth {
  static async createAccount(name, email, password) {
    try {
      const object = { name, email, password };

      const res = await fetch(`${BACKEND_URL}/Auth/CreateAccount`, {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`

        },
        body: JSON.stringify(object), 
      });

      if (res.ok) {
        const data = await res.json(); 
        console.log("Response data:", data);
        return data; 
      } else {
        console.error("Error: ", res.status);
        const errorText = await res.text();
        console.error("Error message:", errorText);
           const parsedError = JSON.parse(errorText);
        alert(parsedError.message);
        return { error: errorText }; 
      }
    } catch (err) {
      console.error("Fetch error:", err);
      return { error: "An error occurred while creating the account." };
    }
  }

  static async login(userName, password) {
    try {
      const object = { userName, password };

      const res = await fetch(`${BACKEND_URL}/Auth/Login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify(object

        ),
      });

      if (res.ok) {
        const data = await res.json(); 
        console.log("Logged in successfully:", data);
        return data; 
      } else {
        console.error("Login failed with status:", res.status);
        const errorText = await res.text();
       const parsedError = JSON.parse(errorText);
        alert(parsedError.message);
        return { error: errorText }; 
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      return { error: "An error occurred while logging in." };
    }
  }

  static async forgottenPassword(email) {
    try {
      const object = { email };

      const res = await fetch(`${BACKEND_URL}/Auth/ForgottenPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`

        },
        body: JSON.stringify(object),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Password reset email sent:", data);
        return data;
      } else {
        console.error("Error sending password reset email:", res.status);
        const errorText = await res.text();
        console.error("Error message:", errorText);
         const parsedError = JSON.parse(errorText);
        alert(parsedError.message);
        return { error: errorText };
      }
    } catch (err) {
      console.error("Forgotten password fetch error:", err);
      return { error: "An error occurred while processing your request." };
    }
  }


  static async isAuthenticated() {
    try {
      const res = await fetch(`${BACKEND_URL}/Auth/IsAuthenticated`, {
        method: "GET",
        credentials: "include", 
        headers:({
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`

        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.isAuthenticated; 
      } else {
        console.error("Error checking authentication:", res.status);
        return false;
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
      return false;
    }
  }


  static async Logout() {
    try {
      const res = await fetch(`${BACKEND_URL}/Auth/Logout`, {
        method: "POST",
        credentials: "include", 
        headers:({
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`

        })
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Logged out:", data);
        return data;
      } else {
        console.error("Error logging out:", res.status);
        return { error: "Error logging out" };
      }
    } catch (err) {
      console.error("Logout fetch error:", err);
      return { error: "An error occurred during logout." };
    }
  }
  static async deleteProfile() {
    try {
      const res = await fetch(`${BACKEND_URL}/Auth/Delete`, {
        method: "DELETE",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`

        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Chyba při mazání profilu.");
      }

      return data;
    } catch (err) {
      console.error("Chyba:", err);
      return { error: err.message };
    }
  }
  static async EditProfile(name, email) {
    try {
      const res = await fetch(`${BACKEND_URL}/Auth/Edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`

        },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Chyba při úpravě profilu");
      }

      return data;
    } catch (err) {
      console.error("Chyba:", err);
      return { error: err.message };
    }
  }
  static async ResetPassword({ currentPassword, newPassword }) {
    try {
      
      const response = await fetch(`${BACKEND_URL}/Auth/ResetPassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`

        },
        credentials: "include", 
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Chyba při resetu hesla");
      }

      return await response.json();
    } catch (error) {
      console.error("Chyba při resetu hesla:", error);
      return { error: error.message };
    }
  }

static async UserInfo() {
  try {
    const res = await fetch(`${BACKEND_URL}/Auth/GetUserInfo`, {
      method: "GET",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`

      },
    });

    if (!res.ok) {
      throw new Error("Chyba při získávání uživatele");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("UserInfo error:", err);
    return null;
  }
}

static async logout() {
  try {
    const res = await fetch(`${BACKEND_URL}/Auth/Logout`, {
      method: "POST",
      credentials: "include",
      headers:({
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`

      })
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Nepodařilo se odhlásit." };
    }

    return data; 
  } catch (err) {
    console.error("Logout error:", err);
    return { error: "Chyba připojení k serveru." };
  }
}

static async ForgottenPassword(email) {
  try {
    const res = await fetch(`${BACKEND_URL}/Auth/ForgottenPassword`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`

      },
      body: JSON.stringify({ email }), 
    });

    const data = await res.json(); 
    return data;
  } catch (err) {
    return { msg: err.message };
  }
}



}
