import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import SignIn from "./pages/User/SignIn";
import SignUp from "./pages/User/SignUp";
import Home from "./pages/User/Home";
import ResetPassword from "./pages/User/ResetPassword";
import LanguagePage from './pages/User/LanguagePage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SeasonsPage from './pages/User/SeasonsPage'
import LessonsPage from './pages/User/LessonsPage'


const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/languagepage" element={<LanguagePage />} />
          <Route path="/seasons" element={<SeasonsPage />} />
          <Route path="/lesson/:lessonId" element={<LessonsPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
