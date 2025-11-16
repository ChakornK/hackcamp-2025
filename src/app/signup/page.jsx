"use client";
import React, { useState } from 'react';

export default function AuthInterface() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    if (isSignUp) {
      setMessage(`Account created successfully for ${email}!`);
    } else {
      setMessage(`Signed in as ${email}!`);
    }

    // Simulate successful authentication
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setMessage('');
    setIsSignUp(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setMessage('');
    setEmail('');
    setPassword('');
  };

  // Show main page when authenticated
  if (isAuthenticated) {
    return (
      <div style={styles.mainContainer}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>Welcome to Study Dashboard</h1>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
        <div style={styles.mainContent}>
          <div style={styles.welcomeCard}>
            <h2 style={styles.welcomeTitle}>🎉 Successfully Logged In!</h2>
            <p style={styles.welcomeText}>
              You're now signed in as <strong>{email}</strong>
            </p>
            <p style={styles.infoText}>
              This is where your main dashboard content would appear.
              <br />
              Import your Home component here to display the full dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show auth page when not authenticated
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        
        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>

          <button onClick={handleSubmit} style={styles.submitButton}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        {message && (
          <p style={styles.message}>{message}</p>
        )}

        <div style={styles.toggleContainer}>
          <p style={styles.toggleText}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button onClick={toggleMode} style={styles.toggleButton}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  submitButton: {
    padding: '14px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#667eea',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  toggleContainer: {
    marginTop: '25px',
    textAlign: 'center',
  },
  toggleText: {
    color: '#666',
    fontSize: '0.95rem',
    marginBottom: '10px',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  mainContainer: {
    minHeight: '100vh',
    background: '#E5E7EB',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  mainTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: '10px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  mainContent: {
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
  },
  welcomeTitle: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  welcomeText: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '30px',
  },
  infoText: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
  },
};