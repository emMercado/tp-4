import React, { useEffect, useState } from 'react'
import FormularioPersona from './FormularioPersona'
import Personas from './Personas'

const PersonsManagerUI = (props) => {

    const { handleGetPersons, handleRegisterPerson, handleDeletePerson, handleUpdatePerson, persons } = props;
    const [modoAgregar, setModoAgregar] = useState(true);

    const initialState = {
        nombre: "",
        apellido: "",
        edad: 0,
    };

    const [personaElegida, setPersonaElegida] = useState(initialState);

    useEffect(() => {
        handleGetPersons()
    }, [])

    const onSubmitPerson = (values) => {
        if (!values.edad || !values.nombre || !values.apellido) {
            console.error("error")
        } else {
            setPersonaElegida(initialState);
            handleRegisterPerson(values)
        }
    }

    const handleUpdate = (values) => {
        if (!values.edad || !values.nombre || !values.apellido) {
            console.error("error")
        } else {
            handleUpdatePerson(values)
            setPersonaElegida(initialState);
            setModoAgregar(true);
        }
    };

    const eliminarPersona = (personaId) => {
        if (window.confirm("¿Desea eliminar la persona?")) {
            handleDeletePerson(personaId)
        }
    };

    return (
        <>
            <FormularioPersona
                handleSubmit={onSubmitPerson}
                persona={personaElegida}
                modoAgregar={modoAgregar}
                onEditar={handleUpdate}
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
    )
}

export default PersonsManagerUI