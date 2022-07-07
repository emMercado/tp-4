import React, { useState } from 'react'
import PersonsManagerUI from '../components/PersonsManagerUI';

const PersonsManagerPage = () => {

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
        try {
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
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <PersonsManagerUI
            handleGetPersons={handleGetPersons}
            handleRegisterPerson={handleRegisterPerson}
            handleDeletePerson={handleDeletePerson}
            handleUpdatePerson={handleUpdatePerson}
            persons={persons}
        />
    )
}

export default PersonsManagerPage