import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstanceUsuario } from '../index';

function UsuarioList() {
    const [UsuarioList, setUsuarioList] = useState([])
    let token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsuarioList()
    }, [])

    const fetchUsuarioList = () => {
        axiosInstanceUsuario.get('/api/usuario')
            .then(function (response) {
                setUsuarioList(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Está seguro de eliminar a este Usuario?',
            text: "Acción no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstanceUsuario.delete(`/api/usuario/eliminar/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario Eliminado Correctamente!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchUsuarioList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Listado de Usuarios</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/Usuarios/create">Ingresar Nuevo Usuario
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Usuario</th>
                                    <th>Password</th>
                                    <th>Rol</th>
                                    <th width="240px">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {UsuarioList.map((Usuario, key) => {
                                    return (
                                        <tr key={Usuario.id}>
                                            <td>{Usuario.nombres}</td>
                                            <td>{Usuario.apellidos}</td>
                                            <td>{Usuario.username}</td>
                                            <td>{Usuario.password}</td>
                                            <td>{Usuario.role}</td>
                                            <td>
                                                {/* <Link
                                                    to={`/Usuarios/mostrar/${Usuario.UsuarioId}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Ver
                                                </Link> */}
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/usuarios/editar/${Usuario.id}`}>
                                                    Editar
                                                </Link>
                                                {/* <button
                                                    onClick={() => handleDelete(Usuario.UsuarioId)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Eliminar
                                                </button> */}
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UsuarioList;
