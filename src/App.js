import { useEffect, useState } from "react";
import FormularioPersona from "./components/FormularioPersona";
import Personas from "./components/Personas";


function App() {

  const [persons, setPersons] = useState([])

  const handleGetPersons = async () => {
    try {
      await fetch("http://localhost:3000/persons").then((res) => {
        res.json().then((getPersons) => {
          setPersons([...getPersons]);
        });
      });
    } catch (error) {
      console.log("error")
    }
  };

  const handleRegisterPerson = async (values) => {
    try {
      const res = await fetch("http://localhost:3000/persons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: values.nombre,
          apellido: values.apellido,
          edad: values.edad
        })
      })
      if (res.ok) {
        handleGetPersons();
        setPersonaElegida(initialState);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeletePerson = async (id) => {
    try {
      await fetch(`http://localhost:3000/persons/${id}`, {
        method: "DELETE",
      })
      handleGetPersons();
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdatePerson = async (values) => {
    const res = await fetch("http://localhost:3000/persons/" + values.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: values.nombre,
        apellido: values.apellido,
        edad: values.edad
      }),
    });
    if (res.ok) {
      handleGetPersons();
    }
  };

  useEffect(() => {
    handleGetPersons()
  }, [])

  const initialState = {
    nombre: "",
    apellido: "",
    edad: 0,
  };

  const [personaElegida, setPersonaElegida] = useState(initialState);
  const [modoAgregar, setModoAgregar] = useState(true);

  const editarPersona = (personaEditada) => {
    handleUpdatePerson(personaEditada)
    setPersonaElegida(initialState);
    setModoAgregar(true);
  };

  const eliminarPersona = (personaId) => {
    if (window.confirm("¿Desea eliminar la persona?")) {
      handleDeletePerson(personaId) 
    }
  };

  return (
    <>
      <FormularioPersona
        handleSubmit={handleRegisterPerson}
        persona={personaElegida}
        modoAgregar={modoAgregar}
        onEditar={editarPersona}
        onCancelar={() => {
          setPersonaElegida(initialState);
          setModoAgregar(true);
        }}
      />
      <Personas
        persons={persons}
        onEditar={(persona) => {
          setPersonaElegida(persona);
          setModoAgregar(false);
        }}
        onEliminar={eliminarPersona}
      />
    </>
  );
}

export default App;