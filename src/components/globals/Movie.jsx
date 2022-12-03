import { IconStar } from '../icons'
import iconBrokenImage from '../../icons/broken-image.svg'
import Image from './Image'

export default function Movie({ base_path, movie, setMovie, watchnowRef }) {
	const { poster_path, title, vote_average } = {...movie}
	const srcPath = !poster_path ? null : `${base_path}${poster_path}`

	const handlerMovieClick = event => {
		if (watchnowRef?.current) {
			watchnowRef.current.classList.add('slide-top')
			watchnowRef.current.classList.remove('slide-bottom')
			document.querySelector('body').style.overflow = 'hidden'
		} else document.querySelectorAll('.movie-container')[1].querySelector('.movie-content').scrollTo({ top: 0, behavior: 'smooth' })
		setMovie(movie)
	}
	return (
		<div className="movie" title={title}>
			<div className="movie-content" onClick={ handlerMovieClick }>
				<Image src={srcPath} srcFail={iconBrokenImage} name={title} className="movie-poster img-fluid" classNameFail="movie-poster img-fluid no-movies-poster" />
				<div className="movie-rate">
					<div className="rate-icon">
						<IconStar />
					</div>
					<div className="rate-value">{vote_average.toPrecision(2)}</div>
				</div>
			</div>
		</div>
	)
}