import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protect({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  if (localStorage.getItem('token')) {
    return children;
  }

  return null;
}

export default Protect;
