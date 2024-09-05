import React, { useEffect, useState } from 'react';
import './signupForm.css';
import { auth } from '../../../firebase.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupSuccess } from '../../../redux/slices/authSlice.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';  // Import from Firebase auth
import { doc, setDoc } from 'firebase/firestore'; // Firestore for saving user data
import { db } from '../../../firebase'; // Import your Firestore config
import FacebookButton from './FacebookButton.jsx';
import GoogleButton from './GoogleButton.jsx';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Initialize loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        toast('User successfully signed up!',
          {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        navigate('/BuzzWrite'); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();  // Prevent form reload
    setLoading(true);  // Set loading to true when signup starts
    setError('');  // Reset error state
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, 'Users', user.uid), {
        username: username,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      // Dispatch signup success to Redux store
      dispatch(
        signupSuccess({
          uid: user.uid,
          username: user.displayName,
          email: user.email,
        })
      );

      toast('User successfully signed up!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      navigate('/BuzzWrite');
    } catch (err) {
      toast('Failed to log in!',
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div className="form-control">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        {/* Submit button will be disabled when loading */}
        <input type="submit" value={loading ? 'Creating account...' : 'Create an account'} disabled={loading}  className='form-control-input'/>

        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}

        <div className="Signup-divider">or continue with</div>
        <div className="google-button-login"><FacebookButton /></div>
        <div className="facebook-button-login"><GoogleButton /></div>
      </form>
    </div>
  );
};

export default SignupForm;
