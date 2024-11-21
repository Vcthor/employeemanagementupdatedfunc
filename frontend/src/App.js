import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PublicPage from './components/PublicPage'; // Import your PublicPage component
import Dashboard from './components/Dashboard'; // Import your Dashboard component
import AdminLogin from './components/AdminLogin'; // Import your AdminLogin component
import Admin from './components/Admin'; // Import your Admin component
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Admin Routes */}
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />

                {/* Protected Route Example */}
                <Route path="/dashboard" element={<Dashboard />} />
                
            </Routes>
        </Router>
    );
};

export default App;
