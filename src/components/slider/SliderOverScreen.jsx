import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FIND_MOVIE_SLIDER_ASYNC } from '../../reducers/index'
import LoaderContainer from '../globals/LoaderContainer'
import MovieInfo from '../globals/MovieInfo'

export default function SliderOverScreen() {
  let movies           = useSelector(state => state.movie)
  let sliderInfos      = useSelector(state => state.sliderInfo)
  let apiConfiguration = useSelector(state => state.apiConfiguration)
  const dispatch       = useDispatch()
  const globalValidation = (
    sliderInfos?.sliderInfos?.slider === undefined
    || apiConfiguration?.config === undefined
    || movies?.find_slider === undefined
  )
  let movie_id = sliderInfos?.sliderInfos?.slider?.movie_id
  useEffect(_ => {
    if (
      (movies?.find_slider?.id !== movie_id || !movies?.find_slider?.id)
      && movie_id !== undefined
    )
      dispatch(FIND_MOVIE_SLIDER_ASYNC({movie_id:movie_id}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderInfos])

  if ( globalValidation || movies.find_slider.id !== movie_id )
    return <LoaderContainer />

  return <MovieInfo id="sliderInfo" movie={movies.find_slider} config={apiConfiguration.config} />
}