import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import PageLoader from './components/PageLoader.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LayoutPage from './pages/LayoutPage.jsx';
import OnboradingPage from './pages/OnboradingPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import {Routes, Route} from 'react-router';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router';
import { useThemeStore } from './store/useThemeStore.js';

export default function App() {
  const {isLoading, isError, authData} = useAuthUser();
  if(isLoading){
    return <PageLoader/>
  }
  const {theme} = useThemeStore();
  const isAuthenticated = Boolean(authData);
  const isOnboarding = authData?.user?.isOnboarded;
  return (

    <div data-theme={theme}>
      <Toaster />
      <Routes>
        <Route path="/" element={ !isAuthenticated ? <LandingPage/> : <Navigate to={!isOnboarding ? "/onboarding" : "/home"} /> }></Route>
        <Route path="/login" element={ !isAuthenticated ? <LoginPage/> : <Navigate to={!isOnboarding ? "/onboarding" : "/home"} />}></Route>
        <Route path="/signup" element={ !isAuthenticated ? <SignupPage/> : <Navigate to={!isOnboarding ? "/onboarding" : "/home"} />}></Route>
        <Route path='/onboarding' element={ !isAuthenticated ? <Navigate to="/login" /> : isOnboarding ? <Navigate to="/home" /> : <OnboradingPage/>}></Route>
        <Route path='/home' element={ !isAuthenticated ? <Navigate to="/login" /> : !isOnboarding ? <Navigate to="/onboarding" /> :  <LayoutPage> <HomePage/></LayoutPage> }></Route>
        <Route path='/search' element={ !isAuthenticated ? <Navigate to="/login" /> : !isOnboarding ? <Navigate to="/onboarding" /> :  <LayoutPage> <SearchPage/></LayoutPage> }></Route>
      </Routes>

    </div>
  )
}
