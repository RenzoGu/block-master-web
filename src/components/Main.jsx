import { useEffect, useState } from 'react'
import MovieTitle from './main/MovieTitle'
import MovieList from './main/MovieList'
import LoaderContainer from './globals/LoaderContainer'

import { SET_FILTER_ASYNC, VALIDATE_DATA_ASYNC } from '../reducers/index'
import { useSelector, useDispatch } from 'react-redux'

export default function Main() {
	const [main, setMain] = useState(false)
	let movies           = useSelector(state => state.movie)
	let apiConfiguration = useSelector(state => state.apiConfiguration)
	const dispatch       = useDispatch()
	const title = movies?.movies?.local_filter_title ?? 'Buscando...'

	useEffect(() => {
		if (movies?.movies === undefined || movies.movies?.results === undefined)
			dispatch(SET_FILTER_ASYNC())
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (apiConfiguration?.config === undefined)
			dispatch(VALIDATE_DATA_ASYNC())
		if (!main)
			setTimeout(_ => {
				setMain(true)
			}, 500)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<main>
      {
      	!main ?
      	<LoaderContainer text="Cargando películas" /> :
      	<>
	      	<MovieTitle title={title} />
					<MovieList movies={movies} apiConfiguration={apiConfiguration} />
      	</>
      }
		</main>
	)
}