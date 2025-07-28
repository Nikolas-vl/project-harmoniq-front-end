import { useLocation, useNavigate } from 'react-router-dom';

const TestNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const paths = [
    { label: 'Auth', path: '/testauth' },
    { label: 'Users', path: '/testusers' },
    { label: 'Articles', path: '/testarticles' },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
      {paths.map(({ label, path }) => (
        <button
          key={path}
          disabled={location.pathname === path}
          onClick={() => navigate(path)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TestNav;
