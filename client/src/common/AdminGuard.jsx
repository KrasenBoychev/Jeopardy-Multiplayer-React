import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { adminId } from './credentials.js';

import NotFound from '../components/notFound/NotFound';

export default function AdminGuard() {
  const { isAuthenticated, userId } = useAuthContext();

  return isAuthenticated && userId == adminId
      ? <Outlet />
      : <NotFound />;
}