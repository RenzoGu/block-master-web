import { configureStore } from '@reduxjs/toolkit'
import { movie, apiConfiguration, slider, sliderInfo } from '../reducers/index'

// console.info(movie)

export default configureStore({
  reducer: {
    movie: movie.reducer,
    apiConfiguration: apiConfiguration.reducer,
    slider: slider.reducer,
    sliderInfo: sliderInfo.reducer,
  },
})