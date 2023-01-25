
// eslint-disable-next-line no-unused-vars
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import DimensionsProvider from './components/dimensions.jsx';
import Homepage from './components/Home.jsx';
import './App.css';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App">
      <DimensionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/week'} exact element={<Homepage/>}/>
            <Route path={'/login'} exact element={<Login/>}/>
            <Route path={'/signup'} exact element={<Registration/>}/>
          </Routes>
        </BrowserRouter>
      </DimensionsProvider>
    </div>
  );
}
export default App;
