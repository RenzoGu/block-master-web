import { IconPlus } from '../icons'
import SliderOverScreen from './SliderOverScreen'
import Navigator from './Navigator'

export default function WatchNow({carouselRef, sliderTimer, watchNow}) {

	const handlerCloseWatchNowClick = event => {
		watchNow.current.classList.add('slide-bottom')
		watchNow.current.classList.remove('slide-top')
		sliderTimer.current.style.width      = '100%'
		sliderTimer.current.style.transition = 'width 10s'
		document.querySelector('body').style.overflow = 'visible'
		if (!document.querySelector('.alice-carousel__play-btn-item.__pause'))
			document.querySelector('.alice-carousel__play-btn-item').click()
	}
	return (
		<div ref={watchNow} className="movie-container">
			<div className="movie-content">
				<button onClick={handlerCloseWatchNowClick} className="close">
					<IconPlus />
				</button>
				<SliderOverScreen />
				<Navigator carouselRef={carouselRef} />
			</div>
		</div>
	)
}