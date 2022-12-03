import { API_KEY, configurationMethods, fullPath } from '../utils/constants'
import { formatParamsToString, callToApi } from '../utils/helpers'

export function configuration() {
	const mainPath = 'configuration'
	const requiredParams = {
		api_key: API_KEY
	}

	this[configurationMethods.getConfiguration] = _ => `${fullPath}/${mainPath}?${formatParamsToString(requiredParams)}`
	this[configurationMethods.getCountries]     = _ => `${fullPath}/${mainPath}/countries?${formatParamsToString(requiredParams)}`
	this[configurationMethods.getJobs]          = _ => `${fullPath}/${mainPath}/jobs?${formatParamsToString(requiredParams)}`
	this[configurationMethods.getLanguages]     = _ => `${fullPath}/${mainPath}/languages?${formatParamsToString(requiredParams)}`

	return async (callback = configurationMethods.getConfiguration) =>
		await callToApi({callback, self:this})
}