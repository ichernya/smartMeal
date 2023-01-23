import logo from './logo.svg';
import './App.css';
import DimensionsProvider from './components/dimensions.jsx';
import Homepage from './components/Home.jsx';

function App() {
  return (
    <div>
        <DimensionsProvider>
            <div className="App">
                <Homepage/>
            </div>
        </DimensionsProvider>
    </div>
  );
}

export default App;
