import { IconPlus } from '../icons'

export default function CloseButton ({target}) {

	const handlerCloseWatchNowClick = event => {
		target.current.classList.remove('slide-top')
		target.current.classList.add('slide-bottom')
		document.querySelector('body').style.overflow = 'visible'
	}

	return (
		<button onClick={handlerCloseWatchNowClick} className="close">
			<IconPlus />
		</button>
	)
}