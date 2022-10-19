import '../styles/globals.css'
import { useCreateStore, Provider } from '../lib/store'


function MyApp({ Component, pageProps }) {
  const createStore = useCreateStore(pageProps.initialZustandState)
  return (
    <Provider createStore={createStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
