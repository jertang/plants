import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import JoinPage from './JoinPage';
import Dashboard from './Dashboard';
import logo from "./images/logo.png";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Plantable Logo" style={{ width: "50px", height: "50px" }} />
            <Link to="/" className="navbar-brand">Plantable</Link>
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
