import React, { Component } from 'react';

// exportando la función constructora (componente tonto)
// cual es el parametro entrando aca?

export default function AnimalSelect (props) {
    return (

        <form>

            <label>Selecciona un Animal:</label>
            <select onChange={(e)=>props.submitAnimal(e.target.value)}>
                {props.animals.map((animal)=>
                <option key={animal}>
                    {animal}
                </option>
                )}
            </select>

        </form>
    )
};

