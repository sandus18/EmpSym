import { useEffect, useState } from "react";

const DEPARTMENTS = ["Engineering", "Design", "Product", "Marketing", "Sales", "Finance", "HR", "Operations"];

const toInputDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

export default function EmployeeForm({ employee, onSave, onCancel }) {
  const [values, setValues] = useState({
    name: employee?.name ?? "",
    email: employee?.email ?? "",
    salary: employee?.salary ?? "",
    joinDate: toInputDate(employee?.joinDate),
    department: employee?.department ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const change = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSave({ ...values, salary: Number(values.salary) });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <form className="modal" onSubmit={submit} aria-labelledby="form-title">
        <h2 id="form-title">{employee ? "Edit employee" : "Add employee"}</h2>

        <label>
          Full name
          <input name="name" value={values.name} onChange={change} required minLength={2} autoFocus />
        </label>
        <label>
          Email
          <input name="email" type="email" value={values.email} onChange={change} required />
        </label>
        <div className="row">
          <label>
            Department
            <select name="department" value={values.department} onChange={change} required>
              <option value="" disabled>Select…</option>
              {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label>
            Salary (₹ per year)
            <input name="salary" type="number" min="0" step="1" value={values.salary} onChange={change} required />
          </label>
        </div>
        <label>
          Join date
          <input name="joinDate" type="date" value={values.joinDate} onChange={change} required />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn primary" disabled={saving}>
            {saving ? "Saving…" : employee ? "Save changes" : "Add employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
