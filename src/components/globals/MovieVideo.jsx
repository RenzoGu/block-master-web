import { useMovieVideo } from '../../hooks/index'
import LoaderContainer from './LoaderContainer'

export default function MovieVideo({movie}) {
  const hookMovieVideo = useMovieVideo(movie?.id)
  if (!hookMovieVideo?.valid) return <LoaderContainer text='Cargando vídeos...' />
 
	if (hookMovieVideo.movie?.results?.length === 0 || hookMovieVideo.movie?.results === undefined)  return <h4 className="my-1">No hay vídeos a mostrar</h4>

	const youtubeVideo = hookMovieVideo.movie.results.find( movie => movie.site === 'YouTube')

	return (
		<iframe
			className="my-1"
			width="100%"
			height="315"
			src={`https://www.youtube.com/embed/${youtubeVideo.key}`}
			title={youtubeVideo.name}
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen />
	)
}