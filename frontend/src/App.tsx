/**
 * WHAT: Main application component
 * WHY: Root component with routing and providers
 * HOW: Wraps app with AuthProvider, ConfigProvider, and MainLayout
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { MainLayout } from '@/components/layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from './pages/Home';
import Books from './pages/Books';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // EB Garamond - Classic bookstore typography
          fontFamily: '"EB Garamond", serif',
          fontSize: 16,
          fontSizeHeading1: 38,
          fontSizeHeading2: 30,
          fontSizeHeading3: 24,
          fontSizeHeading4: 20,
          fontSizeHeading5: 16,
        },
      }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            {/* Admin route without MainLayout */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Regular routes with MainLayout */}
            <Route
              path="/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
}

export default App;
