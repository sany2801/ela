import React from 'react';
import './App.css';
// import "../src/adaptive.css"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import AuthForms from './pages/loginPage/AuthForms';
import SignInPage from './layauts/SignInPage';
import RegisterPage from './layauts/RegisterPage';
import PasswordResetPage from './layauts/PasswordResetPage';
import PasswordCreatePage from './layauts/PasswordCreatePage';
import VerifyEmailPage from './layauts/verify-email/VerifyEmailPage';
import Home from './pages/home/home';
import WelcomScreen from './layauts/welcom_Screen/WelcomScreen';
import FormUserInfo from './components/FormUserInfo/FormUserInfo';
import Accounts from './pages/accounts/Account';
import Notfound from './pages/404/Notfound';
import RequireAuth from './components/RequireAuth/RequireAuth';
import { ModalProvider } from './context/ModalContext/ModalContext';
// import Profile from './layauts/Profile/Profile';
import Shipments from './layauts/Shipments/Shipments';


function App() {
  return (

    <Routes>
      <Route path="/" element={<AuthForms />}>
        <Route index element={< SignInPage />} />
        <Route path='regist' element={<RegisterPage />} />
        <Route path='password-reset' element={<PasswordResetPage />} />
      </Route>
      <Route path='accounts' element={<Accounts />}>
        <Route path='userInfo' element={
          <RequireAuth>
            <WelcomScreen />
          </RequireAuth>
        }></Route>
        <Route path='verify-Email' element={<VerifyEmailPage />} />
        <Route path='password_reset_confirm/:MQ/:token' element={<PasswordCreatePage />} />
      </Route>
      `<Route path='/home' element={
        <RequireAuth>
          <Home />
        </RequireAuth>
      }>

        <Route index path='shipments' element={<Shipments />} ></Route>
        <Route path='items' element={<h1>Items</h1>} ></Route>
        <Route path='spaces' element={<h1>Spaces</h1>} ></Route>
        <Route path='notifications' element={<h1>Notifications</h1>} ></Route>
        {/* <Route path='profile' element={<Profile />} ></Route> */}
      </Route>`
      <Route path='*' element={<Notfound />}></Route>
    </Routes >

  );
}

export default App;
