import React from 'react';

const Buscar = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setBusqueda(event.target.value)}
				placeholder='Escribe...'
			></input>
		</div>
	);
};

export default Buscar;