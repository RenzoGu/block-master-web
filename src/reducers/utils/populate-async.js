import localStore from '../../services/localstorage'
import {
  configuration,
  discover,
  genres,
  movies,
  search
} from '../../services/api/themoviedb/index'
import {
  defaultParams,
  configurationMethods,
  apiFilterTitle
} from '../../services/api/themoviedb/utils/constants'

const API = {
  configuration,
  discover,
  genres,
  movies,
  search
}

async function populate_async(APICall, method = configurationMethods.getConfiguration, props = {}) {
  const response = new APICall({...props})
  return await response(method)
}

function buildNewLocalStorage({ newStore, result, api, apiMethod, localStoreIndex, props }) {
  if (result?.success === undefined) {
    result.tmdb_from = {
      [api]: apiMethod
    }
    result.local_filter_title = props?.local_filter_title ?? apiFilterTitle?.[api]?.[apiMethod]
    result.tmdb_props = {...props}
    newStore.setExpiryTime(defaultParams.refresh_date.short)
    let setResult = {}
    if (newStore.get() !== undefined)
      setResult = {...newStore.get()}
    if (localStoreIndex !== undefined)
      setResult[localStoreIndex] = {...result}
    else
      setResult = {
        ...setResult,
        ...result
      }

    newStore.set(setResult)
  }
  return result
}

export default async function populate(populate_props) {
  const {
    localStoreName,
    api             = 'configuration',
    apiMethod       = configurationMethods.getConfiguration,
    localStoreIndex = undefined,
    props           = {}
  } = {...populate_props}
  // Getting the localStorage
  let newStore = localStore(localStoreName)
  // Validation if the localStorage does not exist
  if (newStore.get() === undefined)
    return await populate_async(API[api], apiMethod, props).then(
      result => buildNewLocalStorage({ newStore, result, api, apiMethod, localStoreIndex, props })
    )
  // Validation if the current localStorage is the same as requested
  const validate_last_request = newStore.get().tmdb_from?.[api]
  if (validate_last_request === undefined || validate_last_request !== apiMethod)
    return await populate_replace({ localStoreName, api, apiMethod, localStoreIndex, props }).then(result => result)

  return await newStore.get()
}

export async function populate_replace(populate_props) {
  const {
    localStoreName,
    api             = 'configuration',
    apiMethod       = configurationMethods.getConfiguration,
    localStoreIndex = undefined,
    props           = {}
  } = {...populate_props}
  // Getting the localStorage
  let newStore = localStore(localStoreName)
  return await populate_async(API[api], apiMethod, props).then(
    result => buildNewLocalStorage({ newStore, result, api, apiMethod, localStoreIndex, props })
  )
}