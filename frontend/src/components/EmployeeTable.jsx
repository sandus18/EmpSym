const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function EmployeeTable({ employees, onEdit, onDelete, onAdd }) {
  if (employees.length === 0) {
    return (
      <div className="empty">
        <p>No employees yet.</p>
        <button className="btn primary" onClick={onAdd}>Add your first employee</button>
      </div>
    );
  }

  return (
    <div className="table-responsive">
        <table className="table table-hover table-striped align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th className="num">Salary</th>
            <th>Joined</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td className="strong">{emp.name}</td>
              <td>{emp.email}</td>
              <td><span className="tag">{emp.department}</span></td>
              <td className="num">{money.format(emp.salary)}</td>
              <td>{formatDate(emp.joinDate)}</td>
              <td className="actions">
                <button className="btn small" onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn small danger" onClick={() => onDelete(emp)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
