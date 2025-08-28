import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-3 px-md-4">
        
        {/* Brand - Responsive */}
        <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}>
          <i className="fas fa-address-book me-2"></i>
          <span className="d-none d-sm-inline">Contact Agenda</span>
          <span className="d-sm-none">Contacts</span>
        </Link>

        {/* Botón toggle para móviles */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ fontSize: '1rem' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            
            {/* Botón Add Contact - Responsive */}
            <Link 
              to="/add-contact" 
              className="btn btn-success ms-0 ms-lg-2 mt-2 mt-lg-0 px-3 px-md-4"
              style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}
            >
              <i className="fas fa-plus me-2"></i>
              <span className="d-none d-sm-inline">Add new contact</span>
              <span className="d-sm-none">Add</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};