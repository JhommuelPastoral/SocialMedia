import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import PageLoader from './components/PageLoader.jsx';
import LandingPage from './pages/LandingPage.jsx';
import OnboradingPage from './pages/OnboradingPage.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import {Routes, Route} from 'react-router';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router';


export default function App() {
  const {isLoading, isError, authData} = useAuthUser();
  if(isLoading){
    return <PageLoader/>
  }
  const isAuthenticated = Boolean(authData);
  const isOnboarding = authData?.user?.isOnboarded;
  return (

    <div data-theme="night">
      <Toaster />
      <Routes>
        <Route path="/" element={ !isAuthenticated ? <LandingPage/> : <Navigate to={!isOnboarding ? "/onboarding" : "/home"} /> }></Route>
        <Route path="/login" element={ !isAuthenticated ? <LoginPage/> : <Navigate to={!isOnboarding ? "/onboarding" : "/home"} />}></Route>
        <Route path="/signup" element={ !isAuthenticated ? <SignupPage/> : <Navigate to={!isOnboarding ? "/onboarding" : "/home"} />}></Route>
        <Route path='/onboarding' element={ !isAuthenticated ? <Navigate to="/login" /> : isOnboarding ? <Navigate to="/home" /> : <OnboradingPage/>}></Route>
        <Route path='/home' element={ !isAuthenticated ? <Navigate to="/login" /> : !isOnboarding ? <Navigate to="/onboarding" /> : <HomePage/>}></Route>
      </Routes>

    </div>
  )
}
