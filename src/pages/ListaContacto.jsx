import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts, deleteContact } from "../services/agendaService.js";

export const ListaContacto = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        await getContacts(dispatch);
      } catch (error) {
        // Puedes mostrar un mensaje de error si lo deseas
      }
    };
    loadContacts();
  }, [dispatch]);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        await deleteContact(dispatch, contactToDelete.id);
      } catch (error) {
        // Puedes mostrar un mensaje de error si lo deseas
      }
    }
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "10px 15px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          {/* Contenedor principal con fondo blanco */}
          <div className="bg-white rounded shadow-sm">
            {/* Lista de contactos */}
            {store.contacts.map((contact, index) => (
              <div key={contact.id}>
                <div className="p-3 p-md-4">
                  <div className="row align-items-center">
                    {/* Avatar */}
                    <div className="col-3 col-sm-2">
                      <img
                        src={`https://picsum.photos/80/80?random=${contact.id}`}
                        alt={contact.name}
                        className="rounded-circle img-fluid"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          minWidth: "50px",
                        }}
                      />
                    </div>

                    {/* Información del contacto */}
                    <div className="col-6 col-sm-7 col-md-8">
                      <div className="ms-2 ms-md-3">
                        <h5
                          className="mb-1 mb-md-2 fw-bold text-dark"
                          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                        >
                          {contact.name}
                        </h5>
                        <div
                          className="text-muted"
                          style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
                        >
                          {/* Dirección */}
                          <div className="mb-1 d-flex align-items-start">
                            <i
                              className="fas fa-map-marker-alt me-2 mt-1 flex-shrink-0"
                              style={{ width: "12px", fontSize: "0.75rem" }}
                            ></i>
                            <span className="text-truncate">
                              {contact.address}
                            </span>
                          </div>

                          {/* Teléfono */}
                          <div className="mb-1 d-flex align-items-center">
                            <i
                              className="fas fa-phone me-2 flex-shrink-0"
                              style={{ width: "12px", fontSize: "0.75rem" }}
                            ></i>
                            <span className="text-truncate">
                              {contact.phone}
                            </span>
                          </div>

                          {/* Email - Oculto en móviles muy pequeños */}
                          <div className="mb-0 d-flex align-items-center">
                            <i
                              className="fas fa-envelope me-2 flex-shrink-0"
                              style={{ width: "12px", fontSize: "0.75rem" }}
                            ></i>
                            <span className="text-truncate d-none d-sm-inline">
                              {contact.email}
                            </span>
                            <span className="text-truncate d-sm-none">
                              {contact.email.length > 20
                                ? contact.email.substring(0, 20) + "..."
                                : contact.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="col-3 col-sm-3 col-md-2">
                      <div className="d-flex justify-content-end">
                        {/* Botón editar */}
                        <Link
                          to={`/edit-contact/${contact.id}`}
                          className="btn btn-light btn-sm me-1 me-md-2 border d-flex align-items-center justify-content-center"
                          style={{
                            width: "35px",
                            height: "35px",
                            minWidth: "35px",
                          }}
                        >
                          <i
                            className="fas fa-pencil-alt"
                            style={{ fontSize: "0.75rem" }}
                          ></i>
                        </Link>

                        {/* Botón eliminar */}
                        <button
                          className="btn btn-light btn-sm border d-flex align-items-center justify-content-center"
                          style={{
                            width: "35px",
                            height: "35px",
                            minWidth: "35px",
                          }}
                          onClick={() => handleDeleteClick(contact)}
                        >
                          <i
                            className="fas fa-trash"
                            style={{ fontSize: "0.75rem" }}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Línea separadora (excepto en el último elemento) */}
                {index < store.contacts.length - 1 && (
                  <hr className="m-0" style={{ borderColor: "#e9ecef" }} />
                )}
              </div>
            ))}

            {/* Mensaje cuando no hay contactos */}
            {store.contacts.length === 0 && !store.isLoading && (
              <div className="text-center py-4 py-md-5 px-3">
                <i
                  className="fas fa-address-book mb-3"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 3rem)",
                    color: "#6c757d",
                  }}
                ></i>
                <h4
                  className="text-muted mb-2"
                  style={{ fontSize: "clamp(1.1rem, 4vw, 1.5rem)" }}
                >
                  No contacts yet
                </h4>
                <p
                  className="text-muted mb-3"
                  style={{ fontSize: "clamp(0.875rem, 3vw, 1rem)" }}
                >
                  Add your first contact to get started
                </p>
                <Link to="/add-contact" className="btn btn-success">
                  <i className="fas fa-plus me-2"></i>
                  Add new contact
                </Link>
              </div>
            )}

            {/* Loading */}
            {store.isLoading && (
              <div className="text-center py-4 py-md-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading contacts...</p>
              </div>
            )}
          </div>
        </div>
      </div>

  {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div
          className="modal show d-flex mx-auto"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered mx-3">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5
                  className="modal-title fw-bold"
                  style={{ fontSize: "clamp(1.1rem, 4vw, 1.25rem)" }}
                >
                  Are you sure?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p
                  className="mb-0"
                  style={{ fontSize: "clamp(0.875rem, 3vw, 1rem)" }}
                >
                  If you delete this thing the entire universe will go down!
                </p>
              </div>
              <div className="modal-footer border-0 flex-column flex-sm-row">
                <button
                  type="button"
                  className="btn btn-primary px-4 mb-2 mb-sm-0 w-100 w-sm-auto"
                  onClick={cancelDelete}
                >
                  Oh no!
                </button>
                <button
                  type="button"
                  className="btn btn-secondary px-4 w-100 w-sm-auto"
                  onClick={confirmDelete}
                >
                  Yes baby!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
