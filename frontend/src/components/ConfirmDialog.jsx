import { useEffect } from "react";

export default function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal narrow" role="alertdialog" aria-labelledby="confirm-title" aria-describedby="confirm-msg">
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-msg" className="muted">{message}</p>
        <div className="modal-actions">
          <button className="btn" onClick={onCancel} autoFocus>Keep employee</button>
          <button className="btn danger solid" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
