import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Navbar from './Navbar';
import Start from './Start.js';
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
     <Route path="/" element={<Start/>}/>
     <Route path="home" element={<Home/>}/>
     </Routes>
    </>
  );
}

export default App;
