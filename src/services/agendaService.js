const API_BASE_URL = "https://playground.4geeks.com/contact";
export const AGENDA_SLUG = "VictorMoreno";

//Para verificar si la agenda ya existe
let agendaVerified = false;

// Verificar si la agenda ya existe y crearla si no

const ensureAgendaExists = async () => {
  if (agendaVerified) return true;

  try {
    const checkResponse = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}`);

    if (checkResponse.ok) {
      agendaVerified = true;
      return true;
    }

    //Si no existe la crea

    if (checkResponse.status === 404) {
      const createResoponse = await fetch(
        `${API_BASE_URL}/agendas/${AGENDA_SLUG}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (createResoponse.ok) {
        console.log("Agenda creada con exito");
        agendaVerified = true;
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error creando agenda:", error);
    return false;
  }
};

//Obtener contactos de la agenda

export const getContacts = async (dispatch) => {
  try {
    await ensureAgendaExists();
    dispatch({ type: 'SET_LOADING', payload: true });
    const response = await fetch(
      `${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`
    );
    if (response.ok) {
      const data = await response.json();
      dispatch({ 
        type: 'LOAD_CONTACTS', 
        payload: data.contacts || [] 
      });
      console.log(`${data.contacts?.length || 0} contactos obtenidos`);
      return data.contacts || [];
    } else {
      console.error("Error obteniendo contactos:", response.status);
      dispatch({ 
        type: 'LOAD_CONTACTS', 
        payload: [] });
      return [];
    }
  } catch (error) {
    console.error("Error en getContacts:", error);
    dispatch({ 
      type: 'LOAD_CONTACTS', 
      payload: [] });
    dispatch({ 
      type: 'SET_LOADING', 
      payload: false });
    return [];
  }
  dispatch({ type: 'SET_LOADING', payload: false });
};

//Crear contacto

export const createContact = async (dispatch, contactData) => {
  try {
    await ensureAgendaExists();
    dispatch({ type: 'SET_LOADING', payload: true });
    const response = await fetch(
      `${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: 'ADD_CONTACT', payload: data });
      console.log("Contact creado con exito :", data);
      dispatch({ type: 'SET_LOADING', payload: false });
      return data;
    }
  } catch (error) {
    console.error("Error al crear el contacto:", error);
    dispatch({ type: 'SET_LOADING', payload: false });
    throw error;
  }
};

// Modificar contacto

export const updateContact = async (dispatch, contactId, contactData) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    const response = await fetch(
      `${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: 'UPDATE_CONTACT', payload: data });
      console.log("✅ Contacto actualizado exitosamente:", data);
      dispatch({ type: 'SET_LOADING', payload: false });
      return data;
    }
  } catch (error) {
    console.error("❌ Error actualizando contacto:", error);
    dispatch({ type: 'SET_LOADING', payload: false });
    throw error;
  }
};

// Eliminar contacto

export const deleteContact = async (dispatch, contactId) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    const response = await fetch(
      `${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      dispatch({ type: 'DELETE_CONTACT', payload: contactId });
      console.log("✅ Contacto eliminado correctamente");
      dispatch({ type: 'SET_LOADING', payload: false });
      return true;
    }
  } catch (error) {
    console.error("Error eliminando contacto:", error);
    dispatch({ type: 'SET_LOADING', payload: false });
    return false;
  }
};

//Obtener contactos por Id

export const getContactById = async (dispatch, contactId) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: true });
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: 'SET_CURRENT_CONTACT', payload: data });
      console.log('Contacto obtenido:', data);
      dispatch({ type: 'SET_LOADING', payload: false });
      return data;
    }
  } catch (error) {
    console.error('Error obteniendo contacto:', error);
    dispatch({ type: 'SET_LOADING', payload: false });
    throw error;
  }
};
