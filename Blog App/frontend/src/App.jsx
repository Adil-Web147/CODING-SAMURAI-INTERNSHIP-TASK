"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/home-page";
import PostForm from "./components/post-form";
import AuthModal from "./components/auth-modal";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import PostDetailPage from "./pages/post-detail-page";
import AboutPage from "./pages/about-page";

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const openAuthModal = (mode) => {
    setIsLoginMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Header onOpenAuthModal={openAuthModal} />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<HomePage />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
              <Route path="/new-post" element={<PostForm />} />
              <Route path="/about" element={<AboutPage />} />{" "}
            </Routes>
          </main>
          <Footer />
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={closeAuthModal}
            isLoginMode={isLoginMode}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}
