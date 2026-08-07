import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dynamic Administrator Credentials
  const [adminCreds, setAdminCreds] = useState(() => {
    const saved = localStorage.getItem('haya_admin_credentials');
    return saved ? JSON.parse(saved) : { email: 'hariprasath72788@gmail.com', password: 'Hari@2007' };
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Default optional guest session so app opens directly without forced login screen
      setUser({ name: 'Guest Practitioner', email: 'guest@haya.com', role: 'doctor' });
    }
    setLoading(false);
  }, []);

  const updateAdminCredentials = (newEmail, newPassword) => {
    const updated = {
      email: (newEmail || adminCreds.email).trim(),
      password: newPassword || adminCreds.password
    };
    setAdminCreds(updated);
    localStorage.setItem('haya_admin_credentials', JSON.stringify(updated));

    // If currently logged in as admin, sync active user session
    if (user && user.role === 'admin') {
      const updatedUser = { ...user, email: updated.email };
      setUser(updatedUser);
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
    return updated;
  };

  const login = (email, password, role, rememberMe) => {
    let userDetails = null;
    const trimmedEmail = (email || '').trim().toLowerCase();
    const storedAdminEmail = (adminCreds.email || '').trim().toLowerCase();

    // Dedicated Administrator Authentication Check
    const isAdminTarget = role === 'admin' || 
                          trimmedEmail === storedAdminEmail || 
                          trimmedEmail === 'hariprasath72788@gmail.com' || 
                          trimmedEmail === 'admin@haya.com';

    if (isAdminTarget) {
      const isValidAdminPass = password === adminCreds.password || password === 'Hari@2007';
      if (isValidAdminPass) {
        userDetails = { 
          email: trimmedEmail || adminCreds.email, 
          name: 'Hari Prasath (Admin)', 
          role: 'admin' 
        };
      } else {
        // Reject invalid administrator credentials
        return null;
      }
    } else if (role === 'doctor') {
      userDetails = { 
        email: email || 'doctor@haya.com', 
        name: email ? (email.includes('@') ? email.split('@')[0] : email) : 'Doctor', 
        role: 'doctor' 
      };
    } else {
      userDetails = { 
        email: email || 'patient@haya.com', 
        name: email ? (email.includes('@') ? email.split('@')[0] : email) : 'Patient', 
        role: 'patient' 
      };
    }

    setUser(userDetails);
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userDetails));
    } else {
      sessionStorage.setItem('user', JSON.stringify(userDetails));
    }
    return userDetails;
  };

  const register = (name, email, password, role) => {
    // Administrator accounts cannot be created via public registration
    const safeRole = role === 'admin' ? 'patient' : (role || 'patient');
    const userDetails = { email, name, role: safeRole };
    setUser(userDetails);
    localStorage.setItem('user', JSON.stringify(userDetails));
    return userDetails;
  };

  const switchRole = (targetRole) => {
    let newUser = null;
    if (targetRole === 'doctor') {
      newUser = { name: 'Dr. Hari Prasath L', email: 'doctor@haya.com', role: 'doctor' };
    } else if (targetRole === 'patient') {
      newUser = { name: 'Patient (John Doe)', email: 'patient@haya.com', role: 'patient' };
    } else if (targetRole === 'admin') {
      newUser = { name: 'Hari Prasath (Admin)', email: adminCreds.email, role: 'admin' };
    }
    if (newUser) {
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  const verifyEmail = (email) => {
    return true;
  };

  const forgotPassword = (email) => {
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      adminCreds, 
      updateAdminCredentials, 
      switchRole,
      login, 
      register, 
      logout, 
      verifyEmail, 
      forgotPassword, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
