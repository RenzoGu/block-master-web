import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import LoaderContainer from './globals/LoaderContainer'
import Carousel from './slider/Carousel'
import Actions from './slider/Actions'
import WatchNow from './slider/WatchNow'
import Image from './globals/Image'
import iconBrokenImage from '../icons/broken-image.svg'

import { SET_SLIDERS_ASYNC, VALIDATE_DATA_ASYNC } from '../reducers/index'
import { useSelector, useDispatch } from 'react-redux'

const handleDragStart = (e) => e.preventDefault();

const Section = styled.section`
	position:relative;
`

export default function Slider() {
	const carouselRef = useRef(null)
	const sliderTimer = useRef(null)
	const watchNow    = useRef(null)
	const items = []
	let sliders          = useSelector(state => state.slider)
	let apiConfiguration = useSelector(state => state.apiConfiguration)
	const dispatch = useDispatch()

	if (sliders?.sliders !== undefined && sliders?.sliders?.results !== undefined && apiConfiguration?.config !== undefined) {
		// eslint-disable-next-line array-callback-return
		sliders.sliders.results.map(slider => {
			let backdrop_path = `${apiConfiguration.config.images.secure_base_url}${apiConfiguration.config.images.backdrop_sizes[2]}${slider.backdrop_path}`
			items.push(
				<Image
					src={backdrop_path}
					srcFail={iconBrokenImage}
					movie_id={slider.id}
					className="img-fluid"
					onDragStart={handleDragStart}
					role="presentation"
					name={slider.title}
				/>
			)
		})
	}

	useEffect(() => {
		if (sliders?.sliders === undefined || sliders?.sliders?.results === undefined) {
			dispatch(SET_SLIDERS_ASYNC())
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (apiConfiguration?.config === undefined) {
			dispatch(VALIDATE_DATA_ASYNC())
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Section className="slider-container">
			{
				items.length > 0 ?
				(
					<>
						<Carousel carouselRef={carouselRef} items={items} sliderTimer={sliderTimer} />
						<Actions sliderTimer={sliderTimer} watchNow={watchNow} />
						<WatchNow carouselRef={carouselRef} sliderTimer={sliderTimer} watchNow={watchNow} />
					</>
				) :
				<LoaderContainer text='Cargando imágenes...' />
			}
		</Section>
	)
}