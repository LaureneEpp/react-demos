import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import NavBar from "./components/NavBar";
import Approutes from "./components/AppRoutes"

function App() {
  return (
    <Router>
      <div className="app">
        <h1>React on Rails blog</h1>
        <p>Find this app</p>
        <NavBar/>
        <Approutes/>
      </div>
    </Router>
  );
}

export default App;
