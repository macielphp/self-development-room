import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

// User
import SignIn from "./pages/User/SignIn";
import SignUp from "./pages/User/SignUp";
import Home from "./pages/User/Home";
import ResetPassword from "./pages/User/ResetPassword";
import LanguagePage from './pages/User/LanguagePage'
import SeasonsPage from './pages/User/SeasonsPage';
import LessonsPage from './pages/User/LessonsPage';

// Admin
import AdminLayout from './layouts/AdminLayout';
  import AdminLogin from './pages/Admin/AdminLogin';
  import AdminDashboard from './pages/Admin/AdminDashboard';
  import AdminLanguages from './pages/Admin/AdminLanguages'
  import AdminSeasons from "./pages/Admin/AdminSeasons";

const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <Routes>

          {/* Rotas públicas */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/languagepage" element={<LanguagePage />} />
          <Route path="/seasons" element={<SeasonsPage />} />
          <Route path="/lesson/:lessonId" element={<LessonsPage />} />

          {/* Login admin */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* rotas empilhadas do admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path='languages' element={<AdminLanguages />}/>
            <Route path='seasons' element={<AdminSeasons />}/>
          </Route>

          
          
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
