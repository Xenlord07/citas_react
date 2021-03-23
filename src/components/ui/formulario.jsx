import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {

  //Crear state de citas
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  const [error, setError] = useState(false);

  //Función que se ejecuta cada vez que el usuario escribe en el input
  const updateCita = (ev) => {
    setCita({
      ...cita,
      [ev.target.name]: ev.target.value,
    });
  };

  // Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const submitCita = (ev) => {
    //Prevenir reload
    ev.preventDefault();
    //Comprobar errores
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      console.log("Hay un error");
      setError(true);
      return;
    }
    //Eliminar el mensaje de error en caso de que se haya mostrado 
    setError(false);
    //Asignar una ID
    cita.id = uuidv4();
    //Mandar datos del form al padre, en este caso App.js
    crearCita(cita);
    //Reiniciar formulario
    setCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: '',
    })
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      {error ? (<p className="alerta-error">Todos los campos son obligatorios.</p>) : ("")}
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          onChange={updateCita}
          value={mascota}
        ></input>

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre dueño"
          onChange={updateCita}
          value={propietario}
        ></input>

        <label>Fecha de alta</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={updateCita}
          value={fecha}
        ></input>

        <label>Hora de alta</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={updateCita}
          value={hora}
        ></input>

        <label>Síntomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={updateCita}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
