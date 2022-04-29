import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import AboutTeam from './AboutTeam';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="about" element={<About/>}>
          <Route path="team" element={<AboutTeam/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
