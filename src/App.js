import { Routes,Route } from 'react-router-dom';
import './App.css';
import GraphDisplay from './GraphDisplay';
import Home from './Home.js';

function App() {
  return (
    <>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="graph" element={<GraphDisplay/>}/>
     </Routes>
    </>
  );
}

export default App;
