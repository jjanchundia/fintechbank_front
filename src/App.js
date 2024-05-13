import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NotFound from "./components/NotFound"
import ClienteList from "./pages/ClienteList"
import ClienteCreate from "./pages/ClienteCreate"
import Login from "./components/Login"
import ClienteEdit from "./pages/ClienteEdit"
import ClienteShow from "./pages/ClienteShow"
import UsuarioList from './pages/UsuarioList'
import UsuarioCreate from './pages/UsuarioCreate'
import UsuarioEdit from './pages/UsuarioEdit'

function App() {
  const isAuthenticated = () => {
    // Verificar si el usuario está autenticado, por ejemplo, verificamos si hay un token en localStorage
    return localStorage.getItem('token') !== null;
  };

  const PrivateRoute = ({ element, ...props }) => {
    return isAuthenticated() ? (
      // Si el usuario está autenticado, renderiza el componente
      element
    ) : (
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      <Navigate to="/"/>
    );
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* Utilizamos el componente PrivateRoute para proteger las rutas */}
        <Route path="/clientes" element={<PrivateRoute element={<ClienteList />} />} />
        <Route path="/clientes/create" element={<PrivateRoute element={<ClienteCreate />} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/clientes/editar/:id" element={<PrivateRoute element={<ClienteEdit />} />} />
        <Route path="/clientes/mostrar/:id" element={<PrivateRoute element={<ClienteShow />} />} />

        <Route path="/usuarios" element={<PrivateRoute element={<UsuarioList />} />} />
        <Route path="/usuarios/create" element={<PrivateRoute element={<UsuarioCreate />} />} />
        <Route path="/usuarios/editar/:id" element={<PrivateRoute element={<UsuarioEdit />} />} />
      </Routes>
    </Router>
  );
}

export default App;