export const initialStore = () => {
  return {
    //Arry para almacenar todos los contactos
    contacts: [],
    //Para mostrar el estado de carga
    isLoading: false,
    //Mensaje para mostrar información o errores
    message: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...store,
        isLoading: action.payload,
      };

    // Cargar todos los contactos desde la API
    case "LOAD_CONTACTS":
      return {
        ...store,
        contacts: action.payload,
        isLoading: false,
        isInitialized: true,
      };

    // Marcar como inicializado
    case "SET_INITIALIZED":
      return {
        ...store,
        isInitialized: action.payload,
      };

    // Agregar un nuevo contacto a la lista
    case "ADD_CONTACT":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
        message: "Contacto agregado exitosamente",
      };

    // Eliminar un contacto de la lista
    case "DELETE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        message: "Contacto eliminado exitosamente",
      };

    // Actualizar un contacto existente
    case "UPDATE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        message: "Contacto actualizado exitosamente",
      };

    // Establecer mensaje (éxito o error)
    case "SET_MESSAGE":
      return {
        ...store,
        message: action.payload,
      };

    // Limpiar mensaje
    case "CLEAR_MESSAGE":
      return {
        ...store,
        message: null,
      };
    default:
      throw Error(`Accion desconocida: ${action.type}`);
  }
}
