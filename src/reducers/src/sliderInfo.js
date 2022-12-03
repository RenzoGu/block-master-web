import { SET_SLIDERINFOS } from '../../actions/reducer/sliderInfo'

let initialState = undefined

const sliderInfoSlice = {
  name: 'sliderInfo',
  initialState: {
    sliderInfos: initialState
  },
  reducers: {
    [SET_SLIDERINFOS]: (state, action) => {
      state.sliderInfos = {...action.payload}
    },
  },
}

export default sliderInfoSlice