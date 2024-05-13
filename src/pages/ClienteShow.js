import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import NotFound from "../components/NotFound"
import { axiosInstanceCliente } from '../index';

function ClienteShow() {
    const [id, setId] = useState(useParams().id)
    const [isSuccess, setIsSuccess] = useState(false)
    const [fechaNacimientoF, setFechaNacimientoF] = useState("")
    const [Cliente, setCliente] = useState({ name: '', description: '' })
    let token = localStorage.getItem("token");

    useEffect(() => {
        axiosInstanceCliente.get(`/api/cliente/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function (response) {
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
                    setCliente(response.data.value);
                    let fechaN = response.data.value.fechaNacimiento;
                    // Crear un objeto Date a partir de la cadena de fecha ISO 8601
                    const fecha = new Date(fechaN);

                    // Obtener el año, mes y día
                    const year = fecha.getFullYear();
                    const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Se agrega +1 porque los meses en JavaScript son de 0 a 11
                    const day = String(fecha.getDate()).padStart(2, "0");

                    // Formatear la fecha en el formato "yyyy-mm-dd"
                    const fechaFormateada = `${day}-${month}-${year}`;
                    setFechaNacimientoF(fechaFormateada);
                    setIsSuccess(true);
                }
                console.log(response.data.value);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            {isSuccess === true ?
                <div className="container">
                    <h2 className="text-center mt-5 mb-3">Clientes</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-info float-right"
                                to="/clientes"> Ver todos los Clientes
                            </Link>
                        </div>
                        <div className="card-body">
                            <b className="text-muted">Nombre:</b>
                            <p>{Cliente.nombre}</p>
                            <b className="text-muted">Descripción:</b>
                            <p>{Cliente.apellido}</p>
                            <b className="text-muted">Descripción:</b>
                            <p>{Cliente.numeroCuenta}</p>
                            <b className="text-muted">Saldo:</b>
                            <p>{Cliente.Saldo}</p>
                            <b className="text-muted">Fecha Nacimiento:</b>
                            <p>{fechaNacimientoF}</p>
                            <b className="text-muted">Dirección:</b>
                            <p>{Cliente.direccion}</p>
                            <b className="text-muted">Teléfono:</b>
                            <p>{Cliente.telefono}</p>
                            <b className="text-muted">Correo:</b>
                            <p>{Cliente.correo}</p>
                            <b className="text-muted">Tipo Cliente:</b>
                            <p>{Cliente.tipoCliente}</p>
                            <b className="text-muted">Estado Civil:</b>
                            <p>{Cliente.estadoCivil}</p>
                            <b className="text-muted">Número Identificacion:</b>
                            <p>{Cliente.numeroIdentificacion}</p>
                            <b className="text-muted">Profesión:</b>
                            <p>{Cliente.profesionOcupacion}</p>
                            <b className="text-muted">Género:</b>
                            <p>{Cliente.genero}</p>
                            <b className="text-muted">Nacionalidad:</b>
                            <p>{Cliente.nacionalidad}</p>
                        </div>
                    </div>
                </div>
                : <NotFound></NotFound>}
        </Layout>
    );
}

export default ClienteShow;