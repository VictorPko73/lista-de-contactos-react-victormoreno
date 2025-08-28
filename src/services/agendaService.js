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

export const getContacts = async () => {
  try {
    //Asegurar que la agenda existe
    await ensureAgendaExists();

    const response = await fetch(
      `${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`${data.contacts?.length || 0} contactos obtenidos`);
      return data.contacts || [];
    } else {
      console.error("Error obteniendo contactos:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error en getContacts:", error);
    return [];
  }
};

//Crear contacto

export const createContact = async (contactData) => {
  try {
    await ensureAgendaExists();

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
      console.log("Contact creado con exito :", data);
      return data;
    }
  } catch (error) {
    console.error("Error al crear el contacto:", error);
    throw error;
  }
};

// Modificar contacto

export const updateContact = async (contactId, contactData) => {
  try {
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
      console.log("✅ Contacto actualizado exitosamente:", data);
      return data;
    }
  } catch (error) {
    console.error("❌ Error actualizando contacto:", error);
    throw error;
  }
};

// Eliminar contacto

export const deleteContact = async (contactId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("✅ Contacto eliminado correctamente");
      return true;
    }
  } catch (error) {
    console.error("Error eliminando contacto:", error);
    return false;
  }
};

//Obtener contactos por Id

export const getContactById = async (contactId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Contacto obtenido:', data);
        return data;
      }
    } catch (error) {
      console.error('Error obteniendo contacto:', error);
      throw error;
    }
};
