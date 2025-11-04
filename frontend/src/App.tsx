/**
 * WHAT: Main application component
 * WHY: Root component with routing and providers
 * HOW: Wraps app with AuthProvider and MainLayout
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { MainLayout } from '@/components/layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
