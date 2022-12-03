import { useRef, useEffect } from 'react'
//import { IconStar } from '../icons'
import iconBrokenImage from '../../icons/broken-image.svg'
import Image from './Image'

export default function MovieInfo ({id, movie, config}) {
	const content = useRef(null)
	const image   = useRef(null)
	const rate    = useRef(null)
	const poster_path = !movie?.poster_path ? null : `${config.images.secure_base_url}${config.images.poster_sizes[2]}${movie.poster_path}`

  let durationTime  = new Date(movie.runtime * 60 * 1000)
  durationTime      = `${durationTime.getUTCHours()}h ${durationTime.getMinutes()}m`
  const releaseDate = new Date(movie.release_date).getFullYear()

  useEffect(_ => {
  	const transitionTime = setTimeout(_ => {
	  	if (content.current) {
	  		content.current.classList.remove('center-fit-content')
	  		content.current.classList.add('aligned-flexible')
	  	}
	  	if (image.current)
	  		image.current.classList.add('transform')
	  	if (rate.current)
	  		rate.current.classList.add('rounded')
  	}, 10)
  	return _ => {
	  	if (content.current) {
	  		content.current.classList.add('center-fit-content')
        // eslint-disable-next-line react-hooks/exhaustive-deps
	  		content.current.classList.remove('aligned-flexible')
	  	}
	  	if (image.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        image.current.classList.remove('transform')
      }
	  	if (rate.current){
        // eslint-disable-next-line react-hooks/exhaustive-deps
	  		rate.current.classList.remove('rounded')
      }
  		clearTimeout(transitionTime)
  	}
  }, [movie?.id])
	return (
    <div id={id} className="movieInfo-content row watch-body mb-1">
      <div className="col">
        <div ref={content} className="movieInfo-content center-fit-content">
          <div ref={image} className="movieInfo-img-content movieInfo-img">
            <Image src={poster_path} srcFail={iconBrokenImage} name={movie.title} className="img-fluid" />
          </div>
          {/*<img className="movieInfo-img" src={poster_path} alt={movie.title} title={movie.title} />*/}
					<div ref={rate} className="movie-rate">
						<div className="rate-value">{Number(movie.vote_average).toPrecision(2)}</div>
					</div>
        </div>
      </div>
      <div className="col">
        <div className="movieInfo-content">
          <h3 id="movieTitle">{movie.title}</h3>
          <p className="text-justify">{movie.overview}</p>
          <ul className="row">
            <li className="col-auto data-col">
              <time datatime={releaseDate}>{releaseDate}</time>
            </li>
            <li className="col-auto data-col">
              {
                movie.genres.map((genre,index,array) => {
                  if (index !== (array.length - 1))
                    return `${genre.name}/`
                  return `${genre.name}`
                })
              }
            </li>
            <li className="col-auto data-col">
              <time>{durationTime}</time>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}