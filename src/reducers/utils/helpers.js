import {
  discoverMethods,
} from '../../services/api/themoviedb/utils/constants'

function buildPopulateCallback(builder_props) {
	const {props, dispatch, callback, reduce_callback} = {...builder_props}
	const { localStoreName, api, apiMethod } = {...props}
	
  callback({
		localStoreName,
		api,
		apiMethod,
  }).then(
    result => dispatch(reduce_callback(result))
  )
}

function buildPopulateCallbackProps(builder_props) {
	const { props, dispatch, callback, reduce_callback } = {...builder_props}
	const { localStoreName, api, apiMethod, localStoreIndex = undefined } = {...props}
	
	const reducerDefaultDynamicParams = {
		...props
	}
	return getLanguage().then(result => {
		reducerDefaultDynamicParams.language = result.split('-')[0] ?? 'en'

		// SETTING DEFAULT STATE
		return callback({
			localStoreName,
			api,
			apiMethod,
			localStoreIndex,
			props: reducerDefaultDynamicParams
		}).then( result => {
			return {
				result,
				dispatch: dispatch(reduce_callback(result))
			}
		} )
	})
}

async function getLanguage() {
  let language = await window.navigator.language
  return language
}

async function getLocation() {
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};
	const response = await fetch(`https://ipinfo.io/json?token=1c9ebc2399657d`, requestOptions)
	const data     = await response.json()
	return data
}

const buildProps = (props) => {
  props.localStoreName  = props?.localStoreName ?? 'movie'
  props.localStoreIndex = props?.localStoreIndex ?? undefined
  props.api             = props?.api ?? 'discover'
  props.apiMethod       = props?.apiMethod ?? discoverMethods.getMovie
  if (props?.reduce_callback !== undefined)
    delete props?.reduce_callback
  return {...props}
}

export {
	buildPopulateCallback,
	buildPopulateCallbackProps,
	buildProps,
	getLanguage,
	getLocation,
}