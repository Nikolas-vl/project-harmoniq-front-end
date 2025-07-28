import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const TestAuth = lazy(() => import('../pages/Test/TestAuth'));
const TestUsers = lazy(() => import('../pages/Test/TestUsers'));
const TestArticles = lazy(() => import('../pages/Test/TestArticles'));

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ArticlesPage = lazy(() => import('../pages/ArticlesPage/ArticlesPage'));
const ArticlePage = lazy(() => import('../pages/ArticlePage/ArticlePage'));
const AuthorsPage = lazy(() => import('../pages/AuthorsPage/AuthorsPage'));
const AuthorProfilePage = lazy(() =>
  import('../pages/AuthorProfilePage/AuthorProfilePage')
);
const CreateArticlePage = lazy(() =>
  import('../pages/CreateArticlePage/CreateArticlePage')
);
const UploadPhoto = lazy(() => import('../pages/UploadPhoto/UploadPhoto'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/authors/:id" element={<AuthorProfilePage />} />

        <Route path="/testauth" element={<TestAuth />} />
        <Route path="/testusers" element={<TestUsers />} />
        <Route path="/testarticles" element={<TestArticles />} />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/photo"
          element={
            <PrivateRoute>
              <UploadPhoto />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
