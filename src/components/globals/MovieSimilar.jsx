import { useMovieSimilar } from '../../hooks/index'
import Movie from './Movie'
import LoaderContainer from './LoaderContainer'

export default function MovieSimilar({movie, setMovie}) {
  const hookMovieSimilar = useMovieSimilar(movie?.id)
  if (!hookMovieSimilar?.valid) return <LoaderContainer text='Cargando películas similares...' />
 
	if (hookMovieSimilar.movie?.results?.length === 0 || hookMovieSimilar.movie?.results === undefined)  return <h4 className="my-1">No hay películas similares a mostrar</h4>

	const config_image = hookMovieSimilar.config.config.images
	const base_path    = `${config_image.secure_base_url}${config_image.poster_sizes[2]}`

	return (
		<div className="movie-similar-container">
			<h4 className="my-1">Similares</h4>
			<div className="movie-similar-content">
				{
				hookMovieSimilar.movie.results.map((movie, key) => {
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