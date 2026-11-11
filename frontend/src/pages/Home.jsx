import React from "react";

export default function Home({ onOpenDirectory, onAddEmployee, employeeCount = 0 }) {
  return (
    <div className="landing">
     
      <nav className="landing-nav">
        <div className="landing-logo" onClick={onOpenDirectory} role="button" tabIndex={0}>
        
          <span className="logo-text">EmpSyn</span>
        </div>
        <div className="landing-nav-actions">
          
            
          <button className="btn primary small" onClick={onOpenDirectory}>
            Open Directory →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        
        <h1 className="hero-title">
          Manage your team with <span className="highlight">clarity &amp; speed</span>
        </h1>
        <p className="hero-subtitle">
          A modern, minimal workspace to track employee records, departments, salary, and onboarding dates.
        </p>

        <div className="hero-actions">
          <button className="btn primary hero-btn" onClick={onOpenDirectory}>
            View Employees →
          </button>
          <button className="btn hero-btn" onClick={onAddEmployee}>
            + Add Employee
          </button>
        </div>

   
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{employeeCount}</span>
            <span className="stat-label">Staff on record</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">8</span>
            <span className="stat-label">Departments</span>
          </div>
          <div className="stat-divider"></div>
         
        </div>
      </section>

    

      {/* Footer */}
      <footer className="landing-footer">
        <p className="muted">StaffPortal • Built with React, Express, Node.js &amp; MongoDB Atlas</p>
      </footer>
    </div>
  );
}
