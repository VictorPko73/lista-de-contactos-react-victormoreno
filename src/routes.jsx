// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { ListaContacto } from "./pages/ListaContacto";
import { FormularioEditar } from "./pages/FormularioEditar";
import { FormularioAgregar } from "./pages/FormularioAgregar";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Página principal - Lista de contactos */}
        <Route path= "/" element={<ListaContacto />} />
        
        {/* Formulario para agregar contacto */}
        <Route path="/add-contact" element={<FormularioAgregar />} />
        
        {/* Formulario para editar contacto */}
        <Route path="/edit-contact/:contactId" element={ <FormularioEditar />} />
        
      </Route>
    )
);