import { VALIDATE_DATA, GENRES_DATA, COUNTRIES_DATA, LENGUAGES_DATA, JOBS_DATA } from '../../actions/reducer/apiConfiguration'

let initialState = undefined

const apiConfigurationSlice = {
  name: 'apiConfiguration',
  initialState: {
    config: initialState,
    genres: initialState,
    countries: initialState,
    lenguages: initialState,
    jobs: initialState,
  },
  reducers: {
    [VALIDATE_DATA]: (state, action) => {
      state.config = {...action.payload}
    },
    [GENRES_DATA]: (state, action) => {
      state.genres = {...action.payload}
    },
    [COUNTRIES_DATA]: (state, action) => {
      state.countries = [...action.payload]
    },
    [LENGUAGES_DATA]: (state, action) => {
      state.lenguages = [...action.payload]
    },
    [JOBS_DATA]: (state, action) => {
      state.jobs = [...action.payload]
    },
  },
}

export default apiConfigurationSlice