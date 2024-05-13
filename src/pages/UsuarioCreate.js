import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstanceUsuario } from '../index';

function UsuarioCreate() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const go = useNavigate();

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
        axiosInstanceUsuario.post('/api/usuario/register', {
            Nombres: nombre,
            Apellidos: apellido,
            username: username,
            password: password,
            Role: role
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario Creado Correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setNombre('')
                setApellido('')
                setUsername("")
                setPassword("")
                setRole("")
                go("/Usuarios")
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
            <div classnombre="container">
                <h2 classnombre="text-center mt-5 mb-3">Crear Nuevo Libro</h2>
                <div classnombre="card">
                    <div classnombre="card-header">
                        <Link
                            classnombre="btn btn-outline-info float-right"
                            to="/Usuarios">Ver todos los Usuarios
                        </Link>
                    </div>
                    <div classnombre="card-body">
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
                                classnombre="btn btn-outline-primary mt-3">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UsuarioCreate;