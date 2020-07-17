import React from 'react';

const animalBackground = (animal) => ({
	backgroundImage: `url(./src/img/${animal}.gif`,
	height: '600px',
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",

	});

	// exportando la función constructora (componente tonto)
	// usando destructuración a nombres de variables individuales del objeto del primer parametro (props)
	// { selectedAnimal } es equivalente a function Cage(props) { const selectedAnimal = props.selectedAnimal; }

export default function Cage ({ selectedAnimal }) {

	return <div style={animalBackground(selectedAnimal)}></div>;
};