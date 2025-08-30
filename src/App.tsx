import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Requirements from './pages/Requirements';
import Chats from './pages/Chats';
import Quotations from './pages/Quotations';
import Workflows from './pages/Workflows';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import CompanyProfile from './pages/IndustryProfile/CompanyProfile';
import Security from './pages/IndustryProfile/Security';
import Payment from './pages/IndustryProfile/Payments';
import EnterpriseTeamMembers from './components/industry/EnterpriseTeamMembers';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

function App() {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="projects" element={<ProtectedRoute><Requirements /></ProtectedRoute>} />
            <Route path="requirements" element={<ProtectedRoute><Requirements /></ProtectedRoute>} />
            <Route path="requirements/published" element={<ProtectedRoute><Requirements /></ProtectedRoute>} />
            <Route path="requirements/approvals" element={<ProtectedRoute><Requirements /></ProtectedRoute>} />
            <Route path="assignments" element={<ProtectedRoute><Requirements /></ProtectedRoute>} />
            <Route path="requests" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
            <Route path="quotations" element={<ProtectedRoute><Quotations /></ProtectedRoute>} />
            <Route path="quotations/sent" element={<ProtectedRoute><Quotations /></ProtectedRoute>} />
            <Route path="workflows" element={<ProtectedRoute><Workflows /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold text-[#333333]">Reports</h1></div></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="settings/company" element={<ProtectedRoute><CompanyProfile /></ProtectedRoute>} />
            <Route path="settings/members" element={<ProtectedRoute><EnterpriseTeamMembers /></ProtectedRoute>} />
            <Route path="settings/payments" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="settings/approval-workflows" element={<ProtectedRoute><CompanyProfile /></ProtectedRoute>} />
            <Route path="settings/account-settings" element={<ProtectedRoute><Security /></ProtectedRoute>} />
            <Route path="chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;