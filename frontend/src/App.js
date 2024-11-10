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
                <Route path="/login" element={<Login />} />
               
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/" element={<PublicPage />} /> {/* Make sure PublicPage is accessible */}
                <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
            </Routes>
        </Router>
    );
};

export default App;
