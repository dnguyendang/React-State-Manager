import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { decrement, increment } from './redux/counter/counter.slide'
import { useAppDispatch, useAppSelector } from './redux/hooks'

function App() {

  // const count = useSelector((state: RootState) => state.counter)
  const count = useAppSelector(state => state.counter)
  console.log(">>>> ", count)
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>My current count = {count.value}</h1>
        <div>
          <button
            onClick={() => dispatch(
              increment()
            )}
          >Increase +1</button>
          <button
            onClick={() => dispatch(
              decrement()
            )}
          >Decrease -1</button>
        </div>
      </div>

    </>
  )
}

export default App
