import React from 'react';

const TituloPelicula = (props) => {
	return (
		<div className='col'>
			<h1>{props.titulo}</h1>
		</div>
	);
};

export default TituloPelicula;