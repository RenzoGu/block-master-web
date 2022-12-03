import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from '../../reducers/movie'

export default function Counter() {
  const count = useSelector((state) => state.movie.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}