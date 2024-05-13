import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import NotFound from "../components/NotFound"
import { axiosInstanceCliente } from '../index';

function ClienteEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [apellido, setApellido] = useState('')
    const [numeroCuenta, setNumeroCuenta] = useState('')
    const [saldo, setSaldo] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState(null)
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [tipoCliente, setTipoCliente] = useState('')
    const [estadoCivil, setEstadoCivil] = useState('')
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('')
    const [profesionOcupacion, setProfesionOcupacion] = useState('')
    const [genero, setGenero] = useState('')
    const [nacionalidad, setNacionalidad] = useState('')
    const [clienteId, setClienteId] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    let token = localStorage.getItem("token");
    const go = useNavigate();

    useEffect(() => {
        axiosInstanceCliente.get(`/api/cliente/${id}`,
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
                    let Cliente = response.data.value;
                    setClienteId(Cliente.clienteId);
                    
                    setName(Cliente.nombre);
                    setApellido(Cliente.apellido);
                    setNumeroCuenta(Cliente.numeroCuenta);
                    setSaldo(Cliente.saldo);

                    let fechaN = Cliente.fechaNacimiento;
                    // Crear un objeto Date a partir de la cadena de fecha ISO 8601
                    const fecha = new Date(fechaN);

                    // Obtener el año, mes y día
                    const year = fecha.getFullYear();
                    const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Se agrega +1 porque los meses en JavaScript son de 0 a 11
                    const day = String(fecha.getDate()).padStart(2, "0");

                    // Formatear la fecha en el formato "yyyy-mm-dd"
                    const fechaFormateada = `${year}-${month}-${day}`;
                    setFechaNacimiento(fechaFormateada);

                    setDireccion(Cliente.direccion);
                    setTelefono(Cliente.telefono);
                    setCorreo(Cliente.correo);
                    setTipoCliente(Cliente.tipoCliente);
                    setEstadoCivil(Cliente.estadoCivil);
                    setNumeroIdentificacion(Cliente.numeroIdentificacion);
                    setNumeroCuenta(Cliente.numeroCuenta);
                    setProfesionOcupacion(Cliente.profesionOcupacion);
                    setGenero(Cliente.genero);
                    setNacionalidad(Cliente.nacionalidad);
                    console.log(Cliente);
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

        if (name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Nombre!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(apellido === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Descripción!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(numeroCuenta === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Número de cuenta!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(saldo === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Saldo!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(fechaNacimiento === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Fecha de Nacimiento!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(direccion === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Dirección!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(telefono === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Teléfono!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(correo === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Correo!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(tipoCliente === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Tipo Cliente!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(estadoCivil === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Estado Civil!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(numeroIdentificacion === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Número de Identificación!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(profesionOcupacion === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Profesión!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(genero === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Genero!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(nacionalidad === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Nacionalidad!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        setIsSaving(true);
        axiosInstanceCliente.put(`/api/cliente/editar`, {
            ClienteId: clienteId,
            Nombre: name,
            Apellido: apellido,
            NumeroCuenta: numeroCuenta,
            Saldo: saldo,
            FechaNacimiento: fechaNacimiento,
            Direccion: direccion,
            Telefono: telefono,
            Correo: correo,
            TipoCliente: tipoCliente,
            EstadoCivil: estadoCivil,
            NumeroIdentificacion: numeroIdentificacion,
            ProfesionOcupacion: profesionOcupacion,
            Genero: genero,
            Nacionalidad: nacionalidad,
            UsuarioId: id
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente actualizado correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);

                go('/Clientes');
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
                    <h2 className="text-center mt-5 mb-3">Editar Cliente</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-info float-right"
                                to="/clientes">Ver todos los Clientes
                            </Link>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                        onChange={(event) => { setName(event.target.value) }}
                                        value={name}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellido">Apellidos</label>
                                    <input
                                        onChange={(event) => { setApellido(event.target.value) }}
                                        value={apellido}
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        name="apellido" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numeroCuenta">Número de Cuenta</label>
                                    <input
                                        onChange={(event) => { setNumeroCuenta(event.target.value) }}
                                        value={numeroCuenta}
                                        type="text"
                                        className="form-control"
                                        id="numeroCuenta"
                                        name="numeroCuenta" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="saldo">Saldo</label>
                                    <input
                                        onChange={(event) => { setSaldo(event.target.value) }}
                                        value={saldo}
                                        type="text"
                                        className="form-control"
                                        id="saldo"
                                        name="saldo" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                    <input
                                        onChange={(event) => { setFechaNacimiento(event.target.value) }}
                                        value={fechaNacimiento}
                                        type="date"
                                        className="form-control"
                                        id="fechaNacimiento"
                                        name="fechaNacimiento" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="direccion">Dirección</label>
                                    <input
                                        onChange={(event) => { setDireccion(event.target.value) }}
                                        value={direccion}
                                        type="text"
                                        className="form-control"
                                        id="direccion"
                                        name="direccion" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input
                                        onChange={(event) => { setTelefono(event.target.value) }}
                                        value={telefono}
                                        type="text"
                                        className="form-control"
                                        id="telefono"
                                        name="telefono" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="correo">Correo</label>
                                    <input
                                        onChange={(event) => { setCorreo(event.target.value) }}
                                        value={correo}
                                        type="text"
                                        className="form-control"
                                        id="correo"
                                        name="correo" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tipoCliente">Tipo Cliente</label>
                                    <input
                                        onChange={(event) => { setTipoCliente(event.target.value) }}
                                        value={tipoCliente}
                                        type="text"
                                        className="form-control"
                                        id="tipoCliente"
                                        name="tipoCliente" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="estadoCivil">Estado Civil</label>
                                    {/* <input
                                        onChange={(event) => { setEstadoCivil(event.target.value) }}
                                        value={estadoCivil}
                                        type="text"
                                        className="form-control"
                                        id="estadoCivil"
                                        name="estadoCivil" /> */}
                                    <select
                                        id="estadoCivil"
                                        name="estadoCivil"
                                        value={estadoCivil}
                                        onChange={(event) => { setEstadoCivil(event.target.value) }}
                                        className="form-control"
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="Casado">Casado</option>
                                        <option value="Divorciado">Divorciado</option>
                                        <option value="Viudo">Viudo</option>
                                        <option value="Unión de Hechos">Unión de Hechos</option>
                                        <option value="Soltero">Soltero</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numeroIdentificacion">Número de Identificación</label>
                                    <input
                                        onChange={(event) => { setNumeroIdentificacion(event.target.value) }}
                                        value={numeroIdentificacion}
                                        type="text"
                                        className="form-control"
                                        id="numeroIdentificacion"
                                        name="numeroIdentificacion" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="profesionOcupacion">Profesión</label>
                                    <input
                                        onChange={(event) => { setProfesionOcupacion(event.target.value) }}
                                        value={profesionOcupacion}
                                        type="text"
                                        className="form-control"
                                        id="profesionOcupacion"
                                        name="profesionOcupacion" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genero">Genero</label>
                                    {/* <input
                                        onChange={(event) => { setGenero(event.target.value) }}
                                        value={genero}
                                        type="text"
                                        className="form-control"
                                        id="genero"
                                        name="genero" /> */}
                                    <select
                                        id="genero"
                                        name="genero"
                                        value={genero}
                                        onChange={(event) => { setGenero(event.target.value) }}
                                        className="form-control"
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nacionalidad">Nacionalidad</label>
                                    <input
                                        onChange={(event) => { setNacionalidad(event.target.value) }}
                                        value={nacionalidad}
                                        type="text"
                                        className="form-control"
                                        id="nacionalidad"
                                        name="nacionalidad" />
                                </div>
                                <button
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="button"
                                    className="btn btn-outline-success mt-3">
                                    Actualizar Cliente
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                : <NotFound></NotFound>}
        </Layout>
    );
}

export default ClienteEdit;