import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "./context/AuthContext"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ArticleDetail from "./pages/ArticleDetail"
import CreateArticle from "./pages/CreateArticle"
import EditArticle from "./pages/EditArticle"
import MyArticles from "./pages/MyArticles"
import NotFound from "./pages/NotFound"

import "./App.css"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* routes privées */}
          <Route path="/create" element={
            <ProtectedRoute><CreateArticle /></ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute><EditArticle /></ProtectedRoute>
          } />
          <Route path="/my-articles" element={
            <ProtectedRoute><MyArticles /></ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App