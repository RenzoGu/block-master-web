import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const myPromise = (src, retry = true, time = 200) => {
	//console.info(src)
	return new Promise((ok, fail) => {
		setTimeout(src => {
			fetch(src)
				.then(result => result.blob())
				.then(blob => ok(URL.createObjectURL(blob)))
				.catch(result => {
					if (retry)
						return myPromise(src, false, 500)
					return fail(false)
				})
		}, time, src, retry)
	})
}

export default function Image(props) {
	const [imgSrc, setImgSrc] = useState(null)
	const {
		name          = 'Name',
		src           = null,
		srcFail       = null,
		className     = 'cast-poster img-fluid',
		classNameFail = 'cast-poster img-fluid no-casts-poster',
		movie_id      = '',
		onDragStart   = _ => '',
		role          = '',
	} = {...props}
	if (src!==null && src.lastIndexOf('//') > 10)
		console.info(name, src)
	let imgFail = <img src={srcFail} alt="" className={classNameFail} />
	if (!srcFail)
		imgFail = <div className="no-image aligned-flexible"><FontAwesomeIcon className={classNameFail} icon={faUser} /></div>

	useEffect(() => {
		if (src !== null)
			myPromise(src)
			.then(result => setImgSrc(result))
			.catch(result => setImgSrc(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (src === null)
		return imgFail
		
	return (
		<>
		{!imgSrc && imgFail}
		{
			imgSrc &&
			<img
				src={imgSrc}
				alt={name}
				title={name}
				className={className}
				movie_id={movie_id}
				onDragStart={onDragStart}
				role={role} />
		}
		</>
	)
}