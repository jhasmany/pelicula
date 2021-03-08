import React from 'react';

const ListaPeliculas = (props) => {
	const FavoritoComponent = props.favoritoComponent;
	return (
		<>
			{props.peliculas.map((pelicula, index) => (
				<div className='imagen-container d-flex justify-content-start m-3'>
					<img src={pelicula.Poster} alt='pelicula'></img>
					<div
						onClick={() => props.handleFavoritosClick(pelicula)}
						className='cubrir d-flex align-items-center justify-content-center'
					>
						<FavoritoComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default ListaPeliculas;