import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import NotFound from "../components/NotFound"
import { axiosInstanceUsuario } from '../index';

function UsuarioEdit() {
    const [id, setId] = useState(useParams().id)
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    let token = localStorage.getItem("token");
    const go = useNavigate();

    useEffect(() => {
        axiosInstanceUsuario.get(`/api/Usuario/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function (response) {
                console.log(response);
                if (response.data.isSuccess === false) {
                    Swal.fire({
                        icon: 'error',
                        title: response.data.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsSuccess(false);
                    return;
                } else {
                    let Usuario = response.data.value;
                    // setUsuarioId(Usuario.id);
                    setNombre(Usuario.nombres);
                    setApellido(Usuario.apellidos);
                    setPassword(Usuario.password);
                    setUsername(Usuario.username);
                    setRole(Usuario.role);

                    setIsSuccess(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }, [])

    const handleSave = () => {

        if (nombre === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Nombre!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (apellido === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Apellidos!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (username === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Usuario!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (password === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Password!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (role === "") {
            Swal.fire({
                icon: 'error',
                title: 'Seleccione Rol!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        setIsSaving(true);
        axiosInstanceUsuario.put(`/api/usuario/editar`, {
            Id: id,
            Nombres: nombre,
            Apellidos: apellido,
            username: username,
            password: password,
            Role: role
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario actualizado correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);

                go('/Usuarios');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }


    return (
        <Layout>
            {isSuccess === true ?
                <div className="container">
                    <h2 className="text-center mt-5 mb-3">Editar Usuario</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-info float-right"
                                to="/Usuarios">Ver todos los Usuarios
                            </Link>
                        </div>
                        <div className="card-body">
                            <form>
                                <div classnombre="form-group">
                                    <label htmlFor="nombre">Nombres</label>
                                    <input
                                        onChange={(event) => { setNombre(event.target.value) }}
                                        value={nombre}
                                        type="text"
                                        classnombre="form-control"
                                        id="nombre"
                                        nombre="nombre" />
                                </div>
                                <div classnombre="form-group">
                                    <label htmlFor="apellido">Apellidos</label>
                                    <input
                                        onChange={(event) => { setApellido(event.target.value) }}
                                        value={apellido}
                                        type="text"
                                        classnombre="form-control"
                                        id="apellido"
                                        nombre="apellido" />
                                </div>
                                <div classnombre="form-group">
                                    <label htmlFor="username">Usuario</label>
                                    <input
                                        onChange={(event) => { setUsername(event.target.value) }}
                                        value={username}
                                        type="text"
                                        classnombre="form-control"
                                        id="username"
                                        nombre="username" />
                                </div>
                                <div classnombre="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        onChange={(event) => { setPassword(event.target.value) }}
                                        value={password}
                                        type="text"
                                        classnombre="form-control"
                                        id="password"
                                        nombre="password" />
                                </div>
                                <div classnombre="form-group">
                                    <label htmlFor="role">Rol</label>
                                    <select
                                        id="role"
                                        nombre="role"
                                        value={role}
                                        onChange={(event) => { setRole(event.target.value) }}
                                        classnombre="form-control"
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Empleado">Empleado</option>
                                    </select>
                                </div>
                                <button
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="button"
                                    className="btn btn-outline-success mt-3">
                                    Actualizar Usuario
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                : <NotFound></NotFound>}
        </Layout>
    );
}

export default UsuarioEdit;