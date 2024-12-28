import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Blogs } from './pages/Blogs';
import { BlogDetail } from './pages/BlogDetail';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CreateBlog } from './pages/CreateBlog';
import { EditBlog } from './pages/EditBlog';
import { PrivateRoute } from './components/PrivateRoute';
import { ThemeProvider } from './context/ThemeContext';
import { NotFound } from './pages/NotFound';
import { ForgotPassword } from './pages/ForgotPassword';
import { UpdatePassword } from './components/auth/UpdatePassword';

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header />
          {/* <main className="flex-grow"> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<UpdatePassword />} />
              <Route
                path="/blogs"
                element={
                  <PrivateRoute>
                    <Blogs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <PrivateRoute adminOnly>
                    <CreateBlog />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <PrivateRoute adminOnly>
                    <EditBlog />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}