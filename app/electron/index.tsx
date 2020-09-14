import './app.global.css'

import * as React from 'react'

import App from './App'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

// import 'bootstrap/dist/css/bootstrap.min.css'

// export const store = configureStore()

render(
  <AppContainer>
    <App/>
  </AppContainer>
  ,
  document.getElementById('root')
)

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
