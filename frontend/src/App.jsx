import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";

import { Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/authStore";
import {  useEffect } from "react";
import LoadingSpinner from "./components/Loader";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

const RedirectedUser = ({children}) => {
  const { isAuthenticated , user} = useAuthStore();

  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }
  return children
}





function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    console.log(checkAuth)

  },[checkAuth])


 if(isCheckingAuth) return <LoadingSpinner />



  return (
    <div
      className="min-h-screen bg-gradient-to-br
  from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
							 <DashboardPage />
						</ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectedUser>
              <SignUpPage />
            </RedirectedUser>
           
              
           
          }
        />
        <Route
          path="/login"
          element={
           <RedirectedUser>
             <LoginPage />
           </RedirectedUser>
              
            
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
          
              <ForgotPasswordPage />
            
          }
        />

        <Route
          path="/reset-password/:token"
          element={
          
              <ResetPasswordPage />
            
          }
        />
        {/* catch all routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
      
    </div>
  );
}

export default App;
