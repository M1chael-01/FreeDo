import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { Auth } from "../API/Auth";
import "../Styles/Pages/Auth/MyAccount.css";

const MyAccount = () => {
  const navigate = useNavigate();
  document.body.classList.add("MyAcc");

  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [todayInfo, setTodayInfo] = useState({
    date: "",
    day: "",
    time: "",
  });

  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const updateTodayInfo = () => {
      const now = new Date();
      const days = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
      setTodayInfo({
        date: now.toLocaleDateString("cs-CZ"),
        day: days[now.getDay()],
        time: now.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }),
      });
    };

    updateTodayInfo();
    const interval = setInterval(updateTodayInfo, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = async () => {
    const res = await Auth.EditProfile(user.name, user.email);
    if (res.error) {
      alert("Chyba při úpravě profilu: " + res.error);
    } else {
      alert("Profil byl úspěšně uložen.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Opravdu chcete smazat svůj účet?");
    if (!confirmed) return;

    const res = await Auth.deleteProfile();
    if (res.error) {
      alert("Chyba při mazání účtu: " + res.error);
    } else {
      alert("Účet byl úspěšně smazán.");
      navigate("/login");
    }
  };

  const handleResetPassword = () => {
    setShowPasswordReset(true);
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      alert("Vyplňte obě pole.");
      return;
    }

    const res = await Auth.ResetPassword({ currentPassword, newPassword });

    if (res.error) {
      alert("Chyba při změně hesla: " + res.error);
    } else {
      alert("Heslo bylo úspěšně změněno.");
      setCurrentPassword("");
      setNewPassword("");
      setShowPasswordReset(false);
    }
  };

 useEffect(() => {
  const fetchUserInfo = async () => {
    const info = await Auth.UserInfo(); 
    if (info) {
      setUser({
        name: info.name,
        email: info.email,
        bio: "Nadšenec do technologií a webového vývoje." 
      });
    }
  };

  fetchUserInfo();
}, []);


  return (
    <>
      <AppHeader />

      <section id="myAcc" className="account-container">
        <h1>Můj účet</h1>
        <p className="account-subtitle">Spravujte své osobní údaje a zabezpečení účtu.</p>

        <div className="today-info">
          <p>
            Dnes je: <strong>{todayInfo.day}, {todayInfo.date}</strong>
          </p>
          <p>
            Aktuální čas: <strong>{todayInfo.time}</strong>
          </p>
        </div>

        <div className="account-card">
          <h2>{showPasswordReset ? "Změna hesla" : "Osobní údaje"}</h2>

          {showPasswordReset ? (
            <div className="account-info">
              <div className="info-item">
                <label>Vaše aktuální heslo</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="info-item">
                <label>Nové heslo</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="button-row">
                <button onClick={handlePasswordChange} className="btn primary">
                  Uložit nové heslo
                </button>
                <button onClick={() => setShowPasswordReset(false)} className="btn secondary">
                  Zrušit
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="account-info">
                <div className="info-item">
                  <label>Jméno</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="info-item">
                  <label>E-mail</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="button-row">
                <button onClick={handleSave} className="btn primary">
                  Uložit změny
                </button>
                <button onClick={handleResetPassword} className="btn secondary">
                  Reset hesla
                </button>
                <button onClick={handleDeleteAccount} className="btn danger">
                  Smazat účet
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MyAccount;
