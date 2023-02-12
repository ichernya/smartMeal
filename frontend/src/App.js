// eslint-disable-next-line no-unused-vars
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import DimensionsProvider from './components/DimensionsProvider.jsx';
import Login from './components/Login_Registration/Login.jsx';
import Registration from './components/Login_Registration/Registration.jsx';
import Error from './components/Page404.jsx';
import PageLayout from './components/PageLayout.jsx';
import SideBar from './components/SideBar.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import AddMealDialog from './components/AddMealDialog.jsx';
import './App.css';

// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App">
      <DimensionsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RequireAuth/>}>
              <Route path={'/home'} exact element={<PageLayout/>}/>
            </Route>
            <Route path={'/'} exact element={<LandingPage/>}/>
            <Route path={'/signup'} exact element={<Registration/>}/>
            <Route path={'/login'} exact element={<Login/>}/>
            <Route path={'/sidebar'} exact element={<SideBar/>}/>
            <Route path={'/addMeal'} exact element={<AddMealDialog/>}/>
            <Route path={'*'} exact element={<Error/>}/>
          </Routes>
        </BrowserRouter>
      </DimensionsProvider>
    </div>
  );
}

const RequireAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login"/>;
  }
  return <Outlet/>;
};

export default App;

