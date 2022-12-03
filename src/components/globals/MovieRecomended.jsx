import { useMovieRecomended } from '../../hooks/index'
import Movie from './Movie'
import LoaderContainer from './LoaderContainer'

export default function MovieRecomended({movie, setMovie}) {
  const hookMovieRecomended = useMovieRecomended(movie?.id)
  if (!hookMovieRecomended?.valid) return <LoaderContainer text='Cargando películas recomendadas...' />
 
	if (hookMovieRecomended.movie?.results?.length === 0 || hookMovieRecomended.movie?.results === undefined)  return <h4 className="my-1">No hay películas recomendadas a mostrar</h4>

	const config_image = hookMovieRecomended.config.config.images
	const base_path    = `${config_image.secure_base_url}${config_image.poster_sizes[2]}`

	return (
		<div className="movie-similar-container">
			<h4 className="my-1">Recomendadas</h4>
			<div className="movie-similar-content">
				{
				hookMovieRecomended.movie.results.map((movie, key) => {
					return (
						<Movie
							key={key}
							base_path={base_path}
							movie={movie}
							setMovie={setMovie}
						/>
					)
				})
				}
			</div>
		</div>
	)
}