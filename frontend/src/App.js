import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './HomePage';
import JoinPage from './JoinPage';

function App() {
  const location = useLocation(); // <-- detect current route

  return (
    <div className="App">
      {/* Top Navigation */}
      <nav className="p-4 bg-green-600 text-white flex justify-center space-x-8">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/join" className="hover:underline">Join</Link>
      </nav>

      {/* Animated Routes */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/join"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <JoinPage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

