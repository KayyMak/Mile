'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>
  );
}
