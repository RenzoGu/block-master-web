import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { FIND_LIST_REVIEW_ASYNC } from '../../reducers/index'

const useMovieReview = movie_id => {
	let movies					 = useSelector(state => state.movie)
	let apiConfiguration = useSelector(state => state.apiConfiguration)
	const dispatch			 = useDispatch()
	let valid = !(
		(movie_id === undefined || apiConfiguration?.config === undefined || movies?.find_list_review === undefined)
		|| movie_id !== movies?.find_list_review?.id
	)

	const [returnMovie, setReturnMovie] = useState({
		config: apiConfiguration,
		movie: movies?.find_list_review,
		valid,
	})

	useEffect(_ => {
		if ( movie_id !== undefined && movie_id !== movies?.find_list_review?.id )
			dispatch(FIND_LIST_REVIEW_ASYNC({movie_id})).then(result => {
				setReturnMovie({
					config: apiConfiguration,
					movie: result.result,
					valid: true,
				})
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movie_id])

	return {...returnMovie}

}

export { useMovieReview }