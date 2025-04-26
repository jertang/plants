import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';  // <-- import your homepage now
import JoinPage from './JoinPage';  // your join page

function App() {
  return (
    <div className="App">
      {/* Top Navigation (optional) */}
      <nav className="p-4 bg-green-600 text-white flex justify-center space-x-8">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/join" className="hover:underline">Join</Link>
      </nav>

      {/* Route content here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
