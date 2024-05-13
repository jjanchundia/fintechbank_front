import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstanceCliente } from '../index';

function ClienteList() {
    const [ClienteList, setClienteList] = useState([])
    let token = localStorage.getItem("token");

    useEffect(() => {
        fetchClienteList()
    }, [])

    const fetchClienteList = () => {
        axiosInstanceCliente.get('/api/cliente', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                setClienteList(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Está seguro de eliminar a este Cliente?',
            text: "Acción no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstanceCliente.delete(`/api/Cliente/eliminar/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Cliente Eliminado Correctamente!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchClienteList()
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
                <h2 className="text-center mt-5 mb-3">Listado de Clientes</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/clientes/create">Ingresar Nuevo Cliente
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>N° Cuenta</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
                                    <th>N° Identificación</th>
                                    <th width="240px">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ClienteList.map((Cliente, key) => {
                                    return (
                                        <tr key={Cliente.clienteId}>
                                            <td>{Cliente.nombre}</td>
                                            <td>{Cliente.apellido}</td>
                                            <td>{Cliente.numeroCuenta}</td>
                                            <td>{Cliente.direccion}</td>
                                            <td>{Cliente.telefono}</td>
                                            <td>{Cliente.numeroIdentificacion}</td>
                                            <td>
                                                <Link
                                                    to={`/clientes/mostrar/${Cliente.clienteId}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Ver
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/clientes/editar/${Cliente.clienteId}`}>
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(Cliente.clienteId)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Eliminar
                                                </button>
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

export default ClienteList;
