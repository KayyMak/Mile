'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api';
import AuthShell from '@/components/AuthShell';

const inputClass = 'mt-2 block h-14 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-olive focus:ring-2 focus:ring-olive/15';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register({ username, email, password });
      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Start here"
      title="Make room for the road."
      description="Create your account and give every trip a place to land."
      footer={<>Already have an account? <Link href="/login" className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-olive">Log in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="text-sm font-medium text-ink">Username</label>
          <input id="username" type="text" autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">Email address</label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-ink">Password</label>
          <input id="password" type="password" autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} placeholder="Create a password" />
        </div>
        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
        <button type="submit" disabled={submitting} className="flex min-h-14 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-surface transition-colors hover:bg-olive focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive disabled:cursor-wait disabled:opacity-60">
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthShell>
  );
}
