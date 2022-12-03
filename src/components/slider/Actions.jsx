import { useRef } from 'react'
import { IconPlay, IconPlus } from '../icons'

export default function Actions({sliderTimer, watchNow}) {
	const btnNow      = useRef(null)
	const btnLater    = useRef(null)

	const handlerNowClick = event => {
		watchNow.current.classList.add('slide-top')
		watchNow.current.classList.remove('slide-bottom')
		sliderTimer.current.style.width      = '0'
		sliderTimer.current.style.transition = 'width 0s'
		document.querySelector('body').style.overflow = 'hidden'
		if (document.querySelector('.alice-carousel__play-btn-item.__pause'))
			document.querySelector('.alice-carousel__play-btn-item').click()
	}

	const handlerLaterClick = event => {

	}

	return (
		<div className="slider-actions-container">
			<div className="content">
				<button ref={btnNow} onClick={handlerNowClick} className="whatch-now">
					<span>
						<IconPlay />
					</span>
					VER AHORA
				</button>
				<button ref={btnLater} onClick={handlerLaterClick} className="whatch-later d-none">
					<span>
						<IconPlus />
					</span>
					VER DESPUÉS
				</button>
			</div>
			<div className="slider-timer-container">
				<div ref={sliderTimer} className="slider-timer"></div>
			</div>
		</div>
	)
}