import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardView } from './components/Dashboard/DashboardView';
import { ToastContainer } from './components/ToastContainer';
import { ApiKey, ToastMessage, UserAccount, ViewState } from './types';

const STORAGE_KEY_USER = 'hanauth_current_user';
const STORAGE_KEY_KEYS = 'hanauth_api_keys';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUserStr) {
        const parsedUser = JSON.parse(savedUserStr);
        setCurrentUser(parsedUser);
      }

      const savedKeysStr = localStorage.getItem(STORAGE_KEY_KEYS);
      if (savedKeysStr) {
        const parsedKeys = JSON.parse(savedKeysStr);
        setApiKeys(parsedKeys);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage cache', e);
    }
  }, []);

  // Save changes to localStorage
  const saveUserSession = (user: UserAccount | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  };

  const saveKeysSession = (keys: ApiKey[]) => {
    setApiKeys(keys);
    localStorage.setItem(STORAGE_KEY_KEYS, JSON.stringify(keys));
  };

  // Toast notifications helper
  const addToast = (
    title: string,
    description?: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    const newToast: ToastMessage = {
      id: `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title,
      description,
      type,
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Registration handler
  const handleRegisterSuccess = (user: UserAccount) => {
    saveUserSession(user);
    setView('dashboard');
    addToast('Authenticated', `Signed in as ${user.email}`, 'success');
  };

  // New API Key handler
  const handleKeyCreated = (newKey: ApiKey) => {
    const updated = [newKey, ...apiKeys];
    saveKeysSession(updated);
  };

  // Revoke Key handler
  const handleRevokeKey = (keyId: string) => {
    const updated = apiKeys.map((k) =>
      k.id === keyId ? ({ ...k, status: 'revoked' } as ApiKey) : k
    );
    saveKeysSession(updated);
    addToast('Key Revoked', 'The API key has been revoked and marked inactive.', 'info');
  };

  // Logout handler
  const handleLogout = () => {
    saveUserSession(null);
    setView('landing');
    addToast('Signed Out', 'You have been logged out of hanAuth.', 'info');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white font-sans antialiased">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Main View Switcher */}
      {view === 'landing' && (
        <LandingPage
          onNavigate={(targetView) => setView(targetView)}
          onShowToast={addToast}
        />
      )}

      {(view === 'register' || view === 'login') && (
        <RegisterPage
          initialMode={view === 'login' ? 'login' : 'register'}
          onRegisterSuccess={handleRegisterSuccess}
          onNavigate={(targetView) => setView(targetView)}
          onShowToast={addToast}
        />
      )}

      {view === 'dashboard' && (
        currentUser ? (
          <DashboardView
            user={currentUser}
            apiKeys={apiKeys}
            onKeyCreated={handleKeyCreated}
            onRevokeKey={handleRevokeKey}
            onLogout={handleLogout}
            onShowToast={addToast}
            onUpdateUser={saveUserSession}
            onNavigateLanding={() => setView('landing')}
          />
        ) : (
          <RegisterPage
            initialMode="register"
            onRegisterSuccess={handleRegisterSuccess}
            onNavigate={(targetView) => setView(targetView)}
            onShowToast={addToast}
          />
        )
      )}
    </div>
  );
}
