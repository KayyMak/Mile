'use client';

import { useState } from 'react';
import { login } from '../../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <button type="submit">Login</button>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      {error && <p>{error}</p>}
    </div>
    </form>
  );
}
