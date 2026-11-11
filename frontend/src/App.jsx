import { useEffect, useState } from "react";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "./api";
import EmployeeTable from "./components/EmployeeTable.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  const [view, setView] = useState(() => {
    return window.location.hash === "#directory" ? "directory" : "landing";
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // employee being edited, or null for "add"
  const [toDelete, setToDelete] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const onHashChange = () => {
      setView(window.location.hash === "#directory" ? "directory" : "landing");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigateTo = (newView) => {
    window.location.hash = newView === "directory" ? "#directory" : "";
    setView(newView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleLandingAdd = () => {
    navigateTo("directory");
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (emp) => { setEditing(emp); setFormOpen(true); };
  const closeForm = () => setFormOpen(false);


  const handleSave = async (values) => {
    if (editing) {
      const updated = await updateEmployee(editing._id, values);
      setEmployees((list) => list.map((e) => (e._id === updated._id ? updated : e)));
      setNotice("Changes saved");
    } else {
      const created = await createEmployee(values);
      setEmployees((list) => [created, ...list]);
      setNotice("Employee added");
    }
    closeForm();
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(toDelete._id);
      setEmployees((list) => list.filter((e) => e._id !== toDelete._id));
      setNotice("Employee deleted");
    } catch (e) {
      setError(e.message);
    } finally {
      setToDelete(null);
    }
  };

  if (view === "landing") {
    return (
      <>
        <Home
          onOpenDirectory={() => navigateTo("directory")}
          onAddEmployee={handleLandingAdd}
          employeeCount={employees.length}
        />
        {formOpen && <EmployeeForm employee={editing} onSave={handleSave} onCancel={closeForm} />}
        {notice && <div className="toast" role="status">{notice}</div>}
      </>
    );
  }

  return (
    <main className="page">
      <nav className="directory-topbar">
        <button className="btn small" onClick={() => navigateTo("landing")}>
          ← Back to Home
        </button>
       
         
      </nav>

      <header className="page-head">
        <div>
          <h1>Staff directory</h1>
          <p className="muted">{employees.length} {employees.length === 1 ? "employee" : "employees"} on record</p>
        </div>
        <button className="btn primary" onClick={openAdd}>Add employee</button>
      </header>

      {error && (
        <div className="alert" role="alert">
          {error}
          <button className="link" onClick={() => setError("")}>Dismiss</button>
        </div>
      )}

      {loading ? (
        <p className="muted">Loading employees…</p>
      ) : (
        <EmployeeTable employees={employees} onEdit={openEdit} onDelete={setToDelete} onAdd={openAdd} />
      )}

      {formOpen && <EmployeeForm employee={editing} onSave={handleSave} onCancel={closeForm} />}

      {toDelete && (
        <ConfirmDialog
          title="Delete employee?"
          message={`${toDelete.name} will be permanently removed from the directory. This can't be undone.`}
          confirmLabel="Delete employee"
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
