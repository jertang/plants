
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import JoinPage from './JoinPage';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link to="/" className="navbar-brand">Feed It Eat It</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
