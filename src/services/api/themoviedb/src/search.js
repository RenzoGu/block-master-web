import { API_KEY, searchMethods, fullPath } from '../utils/constants'
import { formatParamsToString, callToApi } from '../utils/helpers'

export function search(props = {}, query = '', language = 'en-US', page = 1, include_adult = false) {
	const mainPath = 'search'
	if (query.length === 0 && props?.query !== undefined) {
		query = query.length === 0 ? props.query : query
		delete props.query
	}
	const requiredParams = {
		api_key: API_KEY,
		query
	}
	const optionalParams = {
		language,
		page,
		include_adult,
		...props,
	}

	this[searchMethods.getMovies]    = _ => `${fullPath}/${mainPath}/movie?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[searchMethods.getCompanies] = _ => `${fullPath}/${mainPath}/company?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`
	this[searchMethods.getPeople]    = _ => `${fullPath}/${mainPath}/person?${formatParamsToString(requiredParams)}&${formatParamsToString(optionalParams)}`

	return async (callback = searchMethods.getMovies) =>
		await callToApi({callback, self:this})
}