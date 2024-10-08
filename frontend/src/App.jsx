import React from 'react'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/toaster'
import AllRouting from './containers/AllRouting/AllRouting'
import store from './store'
import Reg from './containers/UserAuth/Reg'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <AllRouting />
        <Toaster />
      </Provider>
    </div>
  );

};
export default App;