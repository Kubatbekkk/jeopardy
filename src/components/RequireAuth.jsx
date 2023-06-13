import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectStatus, selectUser } from '../features/selectors';

const RequireAuth = ({ children }) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const status = useSelector(selectStatus);

  if (status === 'loading') return <h2>Loading...</h2>;

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
