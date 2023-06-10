import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectUser } from '../features/categorySlice';
import Home from '../features/Home';

const RequireAuth = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Home />;
  }

  return <Outlet />;
};

export default RequireAuth;
