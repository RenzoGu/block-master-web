import { API_KEY, genresMethods, fullPath } from '../utils/constants'
import { formatParamsToString, callToApi } from '../utils/helpers'

export function genres(props = {}) {
	const mainPath = 'genre'
	const requiredParams = {
		api_key: API_KEY
	}
	const optionalParams = {
		language: 'en-US',
		...props
	}

	this[genresMethods.getMovieList] = _ => `${fullPath}/${mainPath}/movie/list?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[genresMethods.getTvList]    = _ => `${fullPath}/${mainPath}/countries?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`

	return async (callback = genresMethods.getMovieList) =>
		await callToApi({callback, self:this})
}