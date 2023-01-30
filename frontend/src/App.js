// eslint-disable-next-line no-unused-vars
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import DimensionsProvider from './components/DimensionsProvider.jsx';
import Homepage from './components/Home.jsx';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import './App.css';

// eslint-disable-next-line react/jsx-no-undef, require-jsdoc
function App() {
  return (
    <div className="App">
      <DimensionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/week'} exact element={<Homepage/>}/>
            <Route path={'/signup'} exact element={<Registration/>}/>
            <Route path={'/login'} exact element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </DimensionsProvider>
    </div>
  );
}

export default App;
