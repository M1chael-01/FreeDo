// IMPORT REACT ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
// IMPORT COMPONENTS
import Main from "./Components/Main";
import MyAccount from "./Components/Pages/MyAccount";
import AppHeader from "./Components/AppHeader";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import CreateAccount from "./Components/Pages/CreateAccount";
import ForgottenPassword from "./Components/Pages/ForgottenPassword";
import Support from "./Components/AuthUser/Support";
import AppSettings from "./Components/AuthUser/AppSettings";
import NewRecord from "./Components/Styles/Pages/Auth/NewRecord";
import EditTask from "./Components/Styles/Pages/Auth/EditTask";
import AppThatWork from "./Components/Styles/Pages/Public/AppThatWork";
import Features from "./Components/Styles/Pages/Public/Features";
import Cta from "./Components/Styles/Pages/Public/Cta";
import Faq from "./Components/Styles/Pages/Public/Faq";
import Reviews from "./Components/Styles/Pages/Public/Reviews";

import { BACKEND_URL } from "./Components/API/GetBackendUrl";
import { Auth } from "./Components/API/Auth";

import { LoginJWT } from "./Components/API/JWT";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const publicPages = ["/", "/login", "/create-account", "/forgotten-password" , "/produkt" , "/aplikace" , "/proc-freeDo","/reference"];

const checkAccess = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null; // pokud token chybí, hned vrátíme null

    try {
      const response = await fetch(`${BACKEND_URL}/Auth/checkAccess`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Nepodařilo se ověřit přístup:", response.status);
        return null;
      }

      const data = await response.json();
      return data?.email ? data : null; // vrátíme data jen pokud existuje email
    } catch (err) {
      console.error("Chyba při ověřování přístupu:", err);
      return null;
    }
  };


  useEffect(() => {
    const verifyAccess = async () => {
      const isPublic = publicPages.includes(location.pathname);

      if (!isPublic) {
        const user = await checkAccess();
        if (!user) {
          console.log("Nepovolený přístup, přesměrování na login");
          navigate("/login");
        }
      } else {
       
        const user = await checkAccess();
        if (user && location.pathname !== "/dashboard") {
          navigate("/dashboard");
        }
      }
    };

    verifyAccess();
  }, [location.pathname, navigate]);

   useEffect(() => {
  const doLogout = async () => {
    const res = await Auth.Logout();
    if (res.error) {
      alert(res.error);
    } else {
      navigate("/");
    }
  };

  if (location.pathname === "/logout") {
    doLogout();
  }
}, [location.pathname, navigate]);


  useEffect(() => {
    const loginUser = async () => {
      try {
        const loginInstance = new LoginJWT();
        
        // Set the credentials
        loginInstance.setCredentials("todoadmin", "exif022n5ijz2lnwlvefmq0d4kdd2y9auwrh4xtopr2sp36J4x"); //jwt , not secured
        
        // Call the login method
        const res = await loginInstance.login(); 
        
        if (res?.success) {
          console.log("Login successful");
          localStorage.setItem("token", res.token); // Store token in localStorage
        } else {
          console.log("Login failed:", res?.error);
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
      }
    };

    loginUser(); // Call the async function on URL change
  }, [location]); // Dependency array includes `location`, so it runs on URL change


   useEffect(() => {
    if (location.pathname !== "/create-account") {
      localStorage.removeItem("Email");
    }
  }, [location.pathname]);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Main />} />
      <Route path="/my-acc" element={<MyAccount />} />
      <Route path="/app-setting" element={<AppSettings />} />
      <Route path="/notification" element={<MyAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgotten-password" element={<ForgottenPassword />} />
      <Route path="/podpora" element={<Support />} />
      <Route path="/new-record" element={<NewRecord />} />
      <Route path="/edit-task/:id" element={<EditTask />} />


      {/* public */}
      <Route path="/produkt" element={<AppThatWork />} />
      <Route path="/aplikace" element={<Cta />} />
      <Route path="/proc-freeDo" element={<Features />} />
      <Route path="/reference" element={<Reviews />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;