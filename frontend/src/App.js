// eslint-disable-next-line no-unused-vars
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import DimensionsProvider from './components/DimensionsProvider.jsx';
import Homepage from './components/Homepage/Home.jsx';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import LandingPage from './components/LandingPage.jsx';
import './App.css';

// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App">
      <DimensionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} exact element={<LandingPage/>}/>
            <Route path={'/week'} exact element={<Homepage/>}/>
            <Route path={'/signup'} exact element={<Registration/>}/>
            <Route path={'/login'} exact element={<Login/>}/> 
          </Routes>
        </BrowserRouter>
      </DimensionsProvider>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
const RequireAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login"/>;
  }
  return <Outlet/>;
};

export default App;

