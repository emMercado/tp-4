import Persona from "./Persona";


const Personas = (props) => {
    const { onEditar, onEliminar, persons } = props;
    return (
        <ul>
            <hr></hr>
            {persons.map((persona, index) => (
                <li key={index}>
                    <Persona
                        persona={persona}
                        onEditar={onEditar}
                        onEliminar={onEliminar}
                    />
                </li>
            ))}
        </ul>
    );
};

export default Personas;