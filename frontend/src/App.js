import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import JoinPage from './JoinPage';
import Dashboard from './Dashboard';
import logo from "./images/logo.png";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container d-flex align-items-center">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="Plantable Logo" style={{ width: "50px", height: "50px", marginRight: "12px" }} />
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Plantable</span>
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
