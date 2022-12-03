import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { FIND_MOVIE_LIST_ASYNC } from '../../reducers/index'
import { getLanguage, getLocation } from '../../reducers/utils/helpers'

const useMovie = movie_id => {
	let movies					 = useSelector(state => state.movie)
	let apiConfiguration = useSelector(state => state.apiConfiguration)
	const dispatch			 = useDispatch()
	let valid = !(
		(movie_id === undefined || apiConfiguration?.config === undefined || movies?.find_list === undefined)
		|| movie_id !== movies?.find_list?.id
	)

	const [returnMovie, setReturnMovie] = useState({
		config: apiConfiguration,
		movie: movies?.find_list,
		valid,
	})

	useEffect(_ => {
		if ( movie_id !== undefined && movie_id !== movies?.find_list?.id )
			dispatch(FIND_MOVIE_LIST_ASYNC({movie_id})).then(result => {
				getLanguage().then(lenguage => {
					lenguage = lenguage.split('-')
					getLocation().then(location => {
						setReturnMovie({
							config: apiConfiguration,
							movie: result.result,
							valid: true,
							lenguage,
							location,
						})
					})
				})
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movie_id])

	return {...returnMovie}

}

export { useMovie }