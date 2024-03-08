import React, { useContext } from 'react'
import Messenger from './components/Messenger'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginDialog from './components/account/LoginDialog'
import RegisterDialog from './components/account/RegisterDialog'
import { AccountContext } from './context/AccountProvider'

const App = () => {
  const { account } = useContext(AccountContext);
  return (
    <BrowserRouter>
      {
        !account ?
          (
            <Routes>
              <Route path='/' element={<LoginDialog />} />
              <Route path='/register' element={<RegisterDialog />} />
            </Routes>
          )
          :
          (
            <Routes>
              <Route path='/feed' element={<Messenger />} />
            </Routes>
          )
      }
    </BrowserRouter>
  )
}

export default App
