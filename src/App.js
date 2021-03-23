import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import Formulario from "./components/ui/formulario";
import Cita from "./components/ui/cita";
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

function App() {
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]))
    }
  }, [citas, citasIniciales]);

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita}></Formulario>
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}
Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired
}

export default App;
