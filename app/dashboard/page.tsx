"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const roles = [
  { name: 'Admin', value: 'ADMIN' },
  { name: 'Team Lead', value: 'TEAM_LEAD' },
  { name: 'Agent', value: 'AGENT' },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('ADMIN');

  useEffect(() => {
    const storedRole = localStorage.getItem('cfi-role');
    if (storedRole) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    localStorage.setItem('cfi-role', selectedRole);
    router.push('/dashboard');
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="brand-row">
          <div className="brand-mark">CFI</div>
          <div>
            <div className="brand-label">Ticketing System</div>
            <div className="brand-subtitle">Client operations workspace</div>
          </div>
        </div>

        <h1>Welcome back</h1>
        <p className="muted">Select your role to continue.</p>

        <div className="role-grid">
          {roles.map((role) => (
            <button
              key={role.value}
              className={`role-option ${selectedRole === role.value ? 'active' : ''}`}
              onClick={() => setSelectedRole(role.value)}
              type="button"
            >
              {role.name}
            </button>
          ))}
        </div>

        <button className="primary-button full" onClick={handleLogin} type="button">
          Continue to dashboard
        </button>
      </div>
    </main>
  );
}
