import {
  ADD_MOVIES,
  REMOVE_MOVIES,
  SET_FILTER,
  SEARCH_MOVIE,
  FIND_MOVIE_SLIDER,
  FIND_MOVIE,
  FIND_MOVIE_LIST,
  FIND_LIST_PROVIDERS,
  FIND_LIST_VIDEO,
  FIND_LIST_SIMILAR,
  FIND_LIST_RECOMENDED,
  FIND_LIST_CREDIT,
  FIND_LIST_REVIEW
} from '../../actions/reducer/movie'
import localStore from '../../services/localstorage'

let initialState = undefined
const name = 'movie'

const movieSlice = {
  name,
  initialState: {
    movies: initialState,
    find_slider: initialState,
    find: initialState,
    find_list: initialState,
    find_list_providers: initialState,
    find_list_similar: initialState,
    find_list_recomended: initialState,
    find_list_credit: initialState,
    find_list_review: initialState,
    find_list_video: initialState,
  },
  reducers: {
    [ADD_MOVIES]: (state, action) => {
      action.payload.results = state.movies.results.concat(action.payload.results)
      state.movies = {...action.payload}
    },
    [REMOVE_MOVIES]: state => {
      localStore(name).remove()
      delete state.movies
    },
    [SEARCH_MOVIE]: (state, action) => {
      state.movies = {...action.payload}
    },
    [SET_FILTER]: (state, action) => {
      state.movies = {...action.payload}
    },
    [FIND_MOVIE_SLIDER]: (state, action) => {
      state.find_slider = {...action.payload}
    },
    [FIND_MOVIE]: (state, action) => {
      state.find = {...action.payload}
    },
    [FIND_MOVIE_LIST]: (state, action) => {
      state.find_list = {...action.payload}
      //console.info(action.payload)
    },
    [FIND_LIST_PROVIDERS]: (state, action) => {
      state.find_list_providers = {...action.payload}
      //console.info(action.payload)
    },
    [FIND_LIST_SIMILAR]: (state, action) => {
      state.find_list_similar = {...action.payload}
      //console.info(action.payload)
    },
    [FIND_LIST_RECOMENDED]: (state, action) => {
      state.find_list_recomended = {...action.payload}
      //console.info(action.payload)
    },
    [FIND_LIST_CREDIT]: (state, action) => {
      state.find_list_credit = {...action.payload}
      //console.info(action.payload)
    },
    [FIND_LIST_REVIEW]: (state, action) => {
      state.find_list_review = {...action.payload}
      //console.info(action.payload)
    },
    [FIND_LIST_VIDEO]: (state, action) => {
      state.find_list_video = {...action.payload}
      //console.info(action.payload)
    },
  },
}

export default movieSlice