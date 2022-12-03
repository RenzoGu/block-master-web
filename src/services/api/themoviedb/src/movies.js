import { API_KEY, moviesMethods, fullPath } from '../utils/constants'
import { formatParamsToString, callToApi } from '../utils/helpers'

export function movies(props = {}, language = 'en-US', append_to_response = '') {
	const mainPath = 'movie'
	const movie_id = props?.movie_id === undefined ? undefined : props.movie_id
	const requiredParams = {
		api_key: API_KEY,
	}
	const optionalParams = {
		language,
		append_to_response,
		...props
	}

	this[moviesMethods.getMovie]             = _ => `${fullPath}/${mainPath}/${movie_id}?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getAlternativeTitles] = _ => `${fullPath}/${mainPath}/${movie_id}/alternative_titles?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getCredits]           = _ => `${fullPath}/${mainPath}/${movie_id}/credits?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getPopular]           = _ => `${fullPath}/${mainPath}/popular?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getReviews]           = _ => `${fullPath}/${mainPath}/${movie_id}/reviews?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getRecomendations]    = _ => `${fullPath}/${mainPath}/${movie_id}/recommendations?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getSimilarMovies]     = _ => `${fullPath}/${mainPath}/${movie_id}/similar?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getTopRated]          = _ => `${fullPath}/${mainPath}/top_rated?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getUpcoming]          = _ => `${fullPath}/${mainPath}/upcoming?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getVideos]            = _ => `${fullPath}/${mainPath}/${movie_id}/videos?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[moviesMethods.getWatchProviders]    = _ => `${fullPath}/${mainPath}/${movie_id}/watch/providers?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`

	return async (callback = moviesMethods.getMovie) => {
		const callbacksWithoutId = moviesMethods.getPopular.concat(',',moviesMethods.getTopRated,',',moviesMethods.getUpcoming)
		if (!movie_id && !callbacksWithoutId.match(callback))
			throw new Error(`El callback indicado (${callback}) debe tener un id`)
		return await callToApi({callback, self:this})
	}
}