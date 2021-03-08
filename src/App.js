import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ListaPeliculas from './components/ListaPeliculas';
import TituloPelicula from './components/TituloPelicula';
import Buscar from './components/Buscar'
import AdicionarFavorito from './components/AdicionarFavorito';
import EliminarFavorito from './components/EliminarFavorito'

const App = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [favoritos, setFavoritos] = useState([]);
    
    const getPeliculaRequest = async (busqueda) => {
		const url = `https://www.omdbapi.com/?s=${busqueda}&apikey=fc22cb85`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setPeliculas(responseJson.Search);
		}
    };
    
    useEffect(() => {
		getPeliculaRequest(busqueda);
	}, [busqueda]);

    useEffect(() => {
		const listaPeliculasFavoritos = JSON.parse(
			localStorage.getItem('lista-peliculas-favoritos')
		);
        
        if (listaPeliculasFavoritos) {
            setFavoritos(listaPeliculasFavoritos);
        }
	}, []);

	const saveLocalStorage = (items) => {
		localStorage.setItem('lista-peliculas-favoritos', JSON.stringify(items));
    };

    const adicionarPeliculaFavorito = (pelicula) => {
		const nuevoListaFavoritos = [...favoritos, pelicula];
        setFavoritos(nuevoListaFavoritos);
		saveLocalStorage(nuevoListaFavoritos);
    };

    const eliminarPeliculaFavorito = (pelicula) => {
		const nuevoListaFavoritos = favoritos.filter(
			(favorito) => favorito.imdbID !== pelicula.imdbID
		);

        setFavoritos(nuevoListaFavoritos);
		saveLocalStorage(nuevoListaFavoritos);
	};
    
	
    
	return (
		<div className='container-fluid pelicula'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
				<TituloPelicula titulo='Películas' />
				<Buscar busqueda={busqueda} setBusqueda={setBusqueda} />
			</div>
			<div className='row'>
                <ListaPeliculas 
                    peliculas={peliculas} 
                    favoritoComponent={AdicionarFavorito}
                    handleFavoritosClick={adicionarPeliculaFavorito}
                    />
			</div>
            <div className='row d-flex align-items-center mt-4 mb-4'>
				<TituloPelicula titulo='Favoritos' />
			</div>
			<div className='row'>
                <ListaPeliculas  
                    peliculas={favoritos} 
                    favoritoComponent={EliminarFavorito}
                    handleFavoritosClick={eliminarPeliculaFavorito} />
			</div>
		</div>
	);
};

export default App;