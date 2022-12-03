import { SET_SLIDERS } from '../../actions/reducer/slider'

let initialState = undefined

const sliderSlice = {
  name: 'slider',
  initialState: {
    sliders: initialState
  },
  reducers: {
    [SET_SLIDERS]: (state, action) => {
      state.sliders = {...action.payload}
      //console.info(state.sliders, action.payload)
    },
  },
}

export default sliderSlice