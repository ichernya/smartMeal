import logo from './logo.svg';
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import DimensionsProvider from './components/dimensions.jsx';
import Homepage from './components/Home.jsx';
import './App.css';

function App() {
  return (
    <div>
      <DimensionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/week'} exact element={<Homepage/>}/>
          </Routes>
        </BrowserRouter>
      </DimensionsProvider>
    </div>
  );
}

export default App;
