// eslint-disable-next-line no-unused-vars
import {BrowserRouter, Route, Routes, Navigate, Outlet}
  from 'react-router-dom';
import DimensionsProvider from './components/DimensionsProvider.jsx';
import Login from './components/Login_Registration/Login.jsx';
import Registration from './components/Login_Registration/Registration.jsx';
import Error from './components/Page404.jsx';
import HomeLayout from './components/HomeLayout.jsx';
import CheckList from './components/CheckList.jsx';
import MealsProvider from './components/MealContextProvider.jsx';
import PlansLayout from './components/PlansLayout.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import './App.css';


// eslint-disable-next-line require-jsdoc
function App() {
  // logic to check if the user is already logged in
  return (
    <div className="App">
      <DimensionsProvider>
        <MealsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<RequireAuth/>}>
                <Route path={'/home'} exact element={<HomeLayout/>}/>
                <Route path={'/checklist'} exact element={<CheckList/>}/>
                <Route path={'/mealplans'} exact element={<PlansLayout/>}/>
              </Route>
              <Route path={'/signup'} exact element={<Registration/>}/>
              <Route path={'/login'} exact element= {<Login/>}/>
              <Route path={'/'} exact element= {<LandingPage/>}/>
              <Route path={'*'} exact element={<Error/>}/>
            </Routes>
          </BrowserRouter>
        </MealsProvider>
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

