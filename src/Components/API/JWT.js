
import { BACKEND_URL } from "./GetBackendUrl";

export class LoginJWT {
   name = "todoadmin";
    password = "exif022n5ijz2lnwlvefmq0d4kdd2y9auwrh4xtopr2sp36J4x";

  setCredentials(username, password) {
    this.name = username;
    this.password = password;
  }

  async login() {
    try {
      const res = await fetch(`${BACKEND_URL}/Auth/VerifeUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.name,
          password: this.password
        })
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login successful", data);

        const token = data.token;
        localStorage.setItem("token", token); 

        return { success: true, token };  
      } else {
        const errorData = await res.json();
        console.log("Login failed:", errorData); 

        return { success: false, error: errorData.error || "Unknown error" }; 
      }
    } catch (err) {
      console.error("An error occurred:", err);
      return { success: false, error: err.message };
    }
  }


  isAuthenticated() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, user is not authenticated");
      return false;
    }

    try {
      const decoded = this.decodeToken(token);
      const isExpired = this.isTokenExpired(decoded);
      if (isExpired) {
        console.log("Token has expired.");
        return false;
      }
      console.log("User is authenticated.");
      return true;
    } catch (err) {
      console.log("Invalid token:", err);
      return false;
    }
  }

  decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    return decoded;
  }

  isTokenExpired(decoded) {
    const currentTime = Date.now() / 1000; 
    return decoded.exp < currentTime; 
  }
}
