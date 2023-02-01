// eslint-disable-next-line no-unused-vars
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import DimensionsProvider from './components/DimensionsProvider.jsx';
import Homepage from './components/Homepage/Home.jsx';
import Login from './components/Login_Registration/Login.jsx';
import Registration from './components/Login_Registration/Registration.jsx';
import './App.css';

// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App">
      <DimensionsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RequireAuth/>}>
              <Route path={'/week'} exact element={<Homepage/>}/>
            </Route>
            <Route path={'/signup'} exact element={<Registration/>}/>
            <Route path={'/login'} exact element={<Login/>}/>
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

