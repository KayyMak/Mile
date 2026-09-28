'use client';

<<<<<<< HEAD
export default function Login() {
  return (
    <div>
      {/* TODO: login form */}
    </div>
=======
import { useState } from 'react';
import { login } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      router.push("/");
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
>>>>>>> c1bca9d8d94cd718c83068d4d6ad15acecc7c379
  );
}
