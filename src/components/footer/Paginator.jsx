import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFastBackward,
	faCaretLeft,
	faCaretRight,
	faFastForward,
} from '@fortawesome/free-solid-svg-icons'

import Loader from '../globals/Loader'

import { SET_FILTER_ASYNC, REMOVE_MOVIES, ADD_MOVIES_ASYNC } from '../../reducers/index'
import { useSelector, useDispatch } from 'react-redux'

export default function Paginator({ observedElement }) {
	const infiniteScrollChecked  = useRef(null)
	const refLabelInfiniteScroll = useRef(null)
	let movies     = useSelector(state => state.movie)
	const dispatch = useDispatch()
	const validationMovie = movies?.movies !== undefined && movies.movies?.results !== undefined
	let total_pages = 500
	let pages = [1,2,3,'...',total_pages]

	if (validationMovie) {
		total_pages = movies.movies.total_pages > total_pages ? total_pages : movies.movies.total_pages
		const rest = total_pages - movies.movies.page
		pages = [movies.movies.page,movies.movies.page+1,movies.movies.page+2,'...',total_pages]
		if (movies.movies.page > 1)
			pages = [movies.movies.page-1,movies.movies.page,movies.movies.page+1,'...',total_pages]
		if (rest === 2)
			pages = [1,'...',movies.movies.page,movies.movies.page+1,total_pages]
		else if (rest === 1)
			pages = [1,'...',movies.movies.page-1,movies.movies.page,total_pages]
		else if (rest === 0)
			pages = [1,'...',movies.movies.page-2,movies.movies.page-1,total_pages]
		if (total_pages <= 1)
			pages = [1]
		else if (total_pages === 2)
			pages = [1,2]
		else if (total_pages === 3)
			pages = [1,2,3]
		else if (total_pages === 4)
			pages = [1,2,3,4]
		else if (total_pages === 5)
			pages = [1,2,3,4,5]
	}

	const handlerInfiniteScrollInput = event => {
		if (event.target.checked && validationMovie) {
			let page = movies.movies.page+1

			if (page > total_pages)
				return
			execAddMovies(buildProps({page, infinite_scroll:true}))
			return
		}
		execAddMovies(buildProps({page:movies.movies.page, infinite_scroll:false}))
	}

	const handlerPageClick = event => {
		execSetFilterAsync(buildProps({ page:event.currentTarget.dataset.page }))
	}

	const handlerObserver = entries => {
		const $footer              = entries[0]
		const $checkInfiniteScroll = document.querySelector('#infiniteScroll')

		if ($footer.isIntersecting && $checkInfiniteScroll.checked && validationMovie) {
			let page = movies.movies.page+1

			if (page > total_pages)
				return
			execAddMovies(buildProps({page, infinite_scroll:true}))
			return
		}
	}

	const handlerInfiniteScrollObserver = entries => {
		const [ entry ] = entries
		//const intersectionRatio = entry.intersectionRatio * 100
		//const absoluteRect = entry.boundingClientRect
		//const relativeRect = entry.intersectionRect
		if (refLabelInfiniteScroll.current) {
			if (entry.isIntersecting) {
				refLabelInfiniteScroll.current.style.bottom = `${16*5.5}px`
				return
			}
			refLabelInfiniteScroll.current.style.bottom = `${(refLabelInfiniteScroll.current.clientHeight + 16) * -1}px`
		}
	}

	const buildProps = attribute_props => {
		let props = {
			...movies?.movies?.tmdb_props,
			...attribute_props
		}
		props.api = 'discover'
		props.apiMethod = 'getMovie'
		for (const prop in movies.movies.tmdb_from) {
			props.api    = prop
			props.apiMethod = movies.movies.tmdb_from[prop]
		}
		return props
	}

	const execSetFilterAsync = props => {
		dispatch(REMOVE_MOVIES())
		dispatch(SET_FILTER_ASYNC({ ...props }))
	}

	const execAddMovies = props => {
		dispatch(ADD_MOVIES_ASYNC({ ...props }))
	}

	useEffect(_ => {
		const interseptor = new IntersectionObserver(handlerObserver)
	  if (observedElement.current)
			interseptor.observe(observedElement.current)
		if (infiniteScrollChecked.current) {
			const isChecked = movies?.movies?.tmdb_props?.infinite_scroll ?? false
			infiniteScrollChecked.current.checked = isChecked
		}
		return _ => {
		  if (observedElement.current){
			// eslint-disable-next-line react-hooks/exhaustive-deps
			interseptor.unobserve(observedElement.current)
		  }
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [observedElement, movies])

	useEffect(() => {
		const threshold = []
		for(let i = 0; i <= 100; i++) {
			threshold.push(i/100)
		}
		const interseptor = new IntersectionObserver(handlerInfiniteScrollObserver, {
			rootMargin: '30px',
			threshold
		})
		const $main = document.querySelector('main')
		if (refLabelInfiniteScroll.current)
			interseptor.observe($main)
		return _ => {
			interseptor.unobserve($main)
		};
	}, [refLabelInfiniteScroll])

	return (
		<>
			<div className="paginator-container row py-1">
				{
					validationMovie && movies.movies.page !== 1 &&
					<div className="paginator-content col-auto">
						<div className="row justify-content-center align-items-center text-center">
							<div className="col">
								<button
									className="step-button"
									data-page={1}
									onClick={handlerPageClick}
									title="Primera"
								><FontAwesomeIcon icon={faFastBackward} /></button>
							</div>
							<div className="col">
								<button
									className="step-button"
									data-page={movies.movies.page-1}
									onClick={handlerPageClick}
									title="Anterior"
								><FontAwesomeIcon icon={faCaretLeft} /></button>
							</div>
						</div>
					</div>
				}
				<div className="paginator-content col">
					<div className="row justify-content-center align-items-center text-center">
						{
							validationMovie ?
							pages.map((page,key) => {
								if (typeof page === 'number') {
									return (
										<div key={key} className="col-auto">
											<button
												className={`page-button ${page === movies.movies.page && 'pagination-current-page'}`}
												data-page={page}
												onClick={handlerPageClick}
											>{page}</button>
										</div>
									)
								} else {
									return (
										<div key={key} className="col-auto">
											<button className="page-button non-clickable">{page}</button>
										</div>
									)
								}
							}) :
							<Loader />
						}
					</div>
				</div>
				{
					validationMovie && movies.movies.page !== 500 &&
					<div className="paginator-content col-auto">
						<div className="row justify-content-center align-items-center text-center">
							<div className="col">
								<button
									className="step-button"
									data-page={movies.movies.page+1}
									onClick={handlerPageClick}
									title="Siguiente"
								><FontAwesomeIcon icon={faCaretRight} /></button>
							</div>
							<div className="col">
								<button
									className="step-button"
									data-page={500}
									onClick={handlerPageClick}
									title="Última"
								><FontAwesomeIcon icon={faFastForward} /></button>
							</div>
						</div>
					</div>
				}
			</div>
			<div className="row">
				<div className="col">
					<div className="row justify-content-center">
						<input
							ref={infiniteScrollChecked}
							type="checkbox"
							name="infiniteScroll"
							id="infiniteScroll"
							className="d-none"
							onInput={handlerInfiniteScrollInput}
						/>
						<label ref={refLabelInfiniteScroll} className="label-for-ininite-scroll fixed" htmlFor="infiniteScroll">
							Toggle Scroll Infinito
						</label>
					</div>
				</div>
			</div>
		</>
	)
}