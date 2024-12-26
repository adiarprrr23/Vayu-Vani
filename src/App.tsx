// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Header } from './components/Header';
// import { Home } from './pages/Home';
// import { Blogs } from './pages/Blogs';
// import { BlogDetail } from './pages/BlogDetail';
// import { Login } from './pages/Login';
// import { Dashboard } from './pages/Dashboard';
// import { CreateBlog } from './pages/CreateBlog';
// import { EditBlog } from './pages/EditBlog';
// import { PrivateRoute } from './components/PrivateRoute';

// export function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="/blog/:id" element={<BlogDetail />} />
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/create"
//             element={
//               <PrivateRoute adminOnly>
//                 <CreateBlog />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/edit/:id"
//             element={
//               <PrivateRoute adminOnly>
//                 <EditBlog />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Header } from './components/Header';
// import { Home } from './pages/Home';
// import { Blogs } from './pages/Blogs';
// import { BlogDetail } from './pages/BlogDetail';
// import { Login } from './pages/Login';
// import { Dashboard } from './pages/Dashboard';
// import { CreateBlog } from './pages/CreateBlog';
// import { EditBlog } from './pages/EditBlog';
// import { PrivateRoute } from './components/PrivateRoute';
// import { ThemeProvider } from './context/ThemeContext.tsx';

// export function App() {
//   return (
//     <ThemeProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
//           <Header />
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <PrivateRoute>
//                   <Home />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="/blogs" element={<Blogs />} />
//             <Route path="/blog/:id" element={<BlogDetail />} />
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/create"
//               element={
//                 <PrivateRoute adminOnly>
//                   <CreateBlog />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/edit/:id"
//               element={
//                 <PrivateRoute adminOnly>
//                   <EditBlog />
//                 </PrivateRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }

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

export function App() {
  return (
    <ThemeProvider>
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
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
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}