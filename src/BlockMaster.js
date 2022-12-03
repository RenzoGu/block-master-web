import { useEffect } from 'react';

import Header from './components/Header'
import Slider from './components/Slider'
import Main from './components/Main'
import Footer from './components/Footer'

import { GENRES_DATA_ASYNC, COUNTRIES_DATA_ASYNC, LENGUAGES_DATA_ASYNC, JOBS_DATA_ASYNC } from './reducers/index'
import { useSelector, useDispatch } from 'react-redux'

function BlockMaster() {
  let apiConfiguration = useSelector(state => state.apiConfiguration)
  const dispatch       = useDispatch()
  useEffect(() => {
    if (apiConfiguration?.genres === undefined)
      dispatch(GENRES_DATA_ASYNC())
    if (apiConfiguration?.countries === undefined)
      dispatch(COUNTRIES_DATA_ASYNC())
    if (apiConfiguration?.lenguages === undefined)
      dispatch(LENGUAGES_DATA_ASYNC())
    if (apiConfiguration?.jobs === undefined)
      dispatch(JOBS_DATA_ASYNC())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container">
      <Header />
      <Slider />
      <Main />
      <Footer />
    </div>
  );
}

export default BlockMaster;
