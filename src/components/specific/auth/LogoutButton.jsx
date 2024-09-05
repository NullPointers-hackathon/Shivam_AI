import React from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';
import { logout } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
      dispatch(logout());

      // Show success message
      toast.success('Successfully logged out!');
      
      navigate('/signup');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
