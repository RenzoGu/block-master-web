import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import logo from '../images/logo-blockBuster.png'
import { IconSearch } from './icons'

import { SEARCH_MOVIES_ASYNC, SET_FILTER_ASYNC, REMOVE_MOVIES } from '../reducers/index'
import { useDispatch } from 'react-redux'

import {
  defaultParams,
} from '../services/api/themoviedb/utils/constants'

const Nav = styled.nav`
	padding: 1.5rem 0;
`

export default function Header() {
	const dispatch = useDispatch()
	const handlerSubmit = event => {
		event.preventDefault()
		dispatch(REMOVE_MOVIES())
		dispatch(SEARCH_MOVIES_ASYNC({ query: event.target.query.value }))
	}
	const handlerAllMoviesClick = event => {
		event.preventDefault()
		dispatch(REMOVE_MOVIES())
		dispatch(SET_FILTER_ASYNC())
	}
	const handlerMostMoviesClick = event => {
		event.preventDefault()
		dispatch(REMOVE_MOVIES())
		dispatch(SET_FILTER_ASYNC({
			'vote_average.gte':defaultParams.most_valueted_score,
			sort_by: 'vote_average.desc',
			local_filter_title: 'Más valoradas'
		}))
	}
	const handlerLessMoviesClick = event => {
		event.preventDefault()
		dispatch(REMOVE_MOVIES())
		dispatch(SET_FILTER_ASYNC({
			'vote_average.lte':defaultParams.less_valueted_score,
			sort_by: 'vote_average.desc',
			local_filter_title: 'Menos valoradas'
		}))
	}
	const handlerHeaderButtonClick = event => {
		event.currentTarget.classList.toggle("show")
	}
	return (
		<header>
			<Nav>
				<ul className="navbar">
					<li className="item logo">
						<img className="img-fluid" src={logo} alt="" />
					</li>
					<li className="item button" onClick={handlerHeaderButtonClick}>
						<FontAwesomeIcon icon={faBars} />
					</li>
					<li className="item group">
						<ul className="navbar">
							<li className="item">
								<a href="#a" className="item-text" onClick={handlerAllMoviesClick}>Todas</a>
							</li>
							<li className="item">
								<a href="#a" className="item-text" onClick={handlerMostMoviesClick}>Más valoradas</a>
							</li>
							<li className="item">
								<a href="#a" className="item-text" onClick={handlerLessMoviesClick}>Menos valoradas</a>
							</li>
							<li className="item">
								<form className="search-form" onSubmit={handlerSubmit}>
									<div className="input-group">
										<input type="text" name="query" placeholder="Busca tu película favorita" />
										<button>
											<IconSearch />
										</button>
									</div>
								</form>
							</li>
						</ul>
					</li>
				</ul>
			</Nav>
		</header>
	)
}