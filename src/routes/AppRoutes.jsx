import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ArticlesPage from '../pages/ArticlesPage/ArticlesPage';
import ArticlePage from '../pages/ArticlePage/ArticlePage';
import AuthorsPage from '../pages/AuthorsPage/AuthorsPage';
import AuthorProfilePage from '../pages/AuthorProfilePage/AuthorProfilePage';
import PrivateRoute from './PrivateRoute';
import CreateArticlePage from '../pages/CreateArticlePage/CreateArticlePage';
import UploadPhoto from '../pages/UploadPhoto/UploadPhoto';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import PublicRoute from './PublicRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/articles" element={<ArticlesPage />} />
    <Route path="/articles/:id" element={<ArticlePage />} />
    <Route path="/authors" element={<AuthorsPage />} />
    <Route path="/authors/:id" element={<AuthorProfilePage />} />
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
);

export default AppRoutes;
