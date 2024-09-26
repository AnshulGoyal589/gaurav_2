import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'your-secret-password') {
      setIsDialogOpen(false);
      setPassword('');
      setError('');
      navigate('/');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <nav style={{ backgroundColor: '#333', color: 'white', padding: '1rem' , position:'absolute' , width:'100vw' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Project Portal</div>
        {/* <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ marginRight: '1rem' }}>
            <a href="/" onClick={handleHomeClick} style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </a>
          </li>
          <li>
            <Link to="/student" style={{ color: 'white', textDecoration: 'none' }}>
              Upload Project
            </Link>
          </li>
        </ul> */}
      </div>

      {isDialogOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          zIndex:'1000',
          alignItems: 'center' 
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            maxWidth: '600px', 
            width: '100%' 
          }}>
            <h2 style={{ color: 'black', marginTop: 0 }}>Enter Password</h2>
            <p style={{ color: 'black' }}>Please enter the password to access the Home page.</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  marginBottom: '1rem', 
                  borderRadius: '4px', 
                  border: '1px solid #ccc' 
                }}
              />
              {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  style={{ 
                    marginRight: '0.5rem', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '4px', 
                    border: 'none', 
                    backgroundColor: '#ccc', 
                    cursor: 'pointer' 
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '4px', 
                    border: 'none', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    cursor: 'pointer' 
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;