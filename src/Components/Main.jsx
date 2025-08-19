import "./Styles/Main.css";
import { BACKEND_URL } from "./API/GetBackendUrl";
import { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

const Main = () => {
  document.body.classList.add("logged");

  const [tasks, setTasks] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const openLink = (par) => {
    if (par === "new") window.location.href = "/new-record";
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/Tasks/UserTasks`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) throw new Error(`Chyba při načítání: ${res.status}`);

      const data = await res.json();
      setTasks(data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter & search
  const filteredTasks = tasks
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((t) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "done") return t.completed === true;
      if (filterStatus === "pending") return !t.completed;
      return true;
    });

  const getStatusBadge = (task) => {
    if (task.completed) return <span className="badge done">Hotovo</span>;
    if (task.deadline && new Date(task.deadline) < new Date())
      return <span className="badge overdue">Po termínu</span>;
    return <span className="badge pending">Probíhá</span>;
  };

  return (
    <>
      <AppHeader />
      <section className="main-welcome">
        <div className="dashboard-actions">
          <input
            type="text"
            placeholder="Hledat úkoly..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">Vše</option>
            <option value="pending">Probíhá</option>
            <option value="done">Hotovo</option>
          </select>
        </div>

        <main>
          <div className="dashboard-flex">
            <div className="create" onClick={() => openLink("new")}>
              <span>+</span>
              <div className="create-text">
                <h2>Vytvořit nový záznam</h2>
                <p>Rychle přidejte nové položky do dashboardu.</p>
              </div>
            </div>

            {loading && (
              <div className="loader">Načítání úkolů...</div>
            )}

            {!loading && filteredTasks.length === 0 && (
              <p>Žádné úkoly k zobrazení.</p>
            )}

            {!loading &&
              filteredTasks.map((task) => {
                const isExpanded = expanded[task.id] || false;
                const shortText =
                  task.description && task.description.length > 60
                    ? task.description.slice(0, 60) + "..."
                    : task.description;

                return (
                  <div key={task.id} className="task-card">
                    <div className="task-content">
                      <div className="task-header">
                        <h3>{task.title}</h3>
                        {getStatusBadge(task)}
                      </div>
                      <p>{isExpanded ? task.description : shortText}</p>
                      {task.description && task.description.length > 60 && (
                        <button
                          className="show-more-btn"
                          onClick={() => toggleExpand(task.id)}
                        >
                          {isExpanded ? "Zobrazit méně" : "Zobrazit více"}
                        </button>
                      )}
                      <small>
                        Deadline:{" "}
                        {task.deadline
                          ? new Date(task.deadline).toLocaleString()
                          : "nezadán"}
                      </small>

                      <div className="task-actions">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            (window.location.href = `/edit-task/${task.id}`)
                          }
                        >
                          Editovat
                        </button>
                        <button
                          className="delete-btn"
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Opravdu chcete smazat tento úkol?"
                              )
                            ) {
                              try {
                                const res = await fetch(
                                  `${BACKEND_URL}/Tasks/Delete/${task.id}`,
                                  {
                                    method: "DELETE",
                                    credentials: "include",
                                    headers: {
                                      Authorization: `Bearer ${localStorage.getItem(
                                        "token"
                                      ) || ""}`,
                                    },
                                  }
                                );
                                if (!res.ok)
                                  throw new Error(
                                    `Chyba při mazání: ${res.status}`
                                  );
                                setTasks(tasks.filter((t) => t.id !== task.id));
                              } catch (err) {
                                console.error(err);
                                alert("Nepodařilo se smazat úkol.");
                              }
                            }
                          }}
                        >
                          Smazat
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default Main;
