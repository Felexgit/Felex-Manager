import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Auth({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) {
      setError(result.error.message);
    } else {
      onAuth();
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 320, margin: 'auto', padding: 24 }}>
      <h2>{isLogin ? 'Entrar' : 'Cadastrar'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
      <button onClick={handleGoogle} disabled={loading} style={{ width: '100%', marginTop: 8 }}>
        Entrar com Google
      </button>
      <p style={{ color: 'red' }}>{error}</p>
      <p>
        {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)} style={{ border: 'none', background: 'none', color: '#61dafb', cursor: 'pointer' }}>
          {isLogin ? 'Cadastre-se' : 'Entrar'}
        </button>
      </p>
    </div>
  );
} 