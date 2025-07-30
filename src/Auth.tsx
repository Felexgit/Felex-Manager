import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, Chrome } from 'lucide-react';

export default function Auth({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
          {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </h2>
        <p className="text-purple-200 text-sm">
          {isLogin ? 'Entre para continuar' : 'Comece sua jornada com IA'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail size={20} className="text-purple-300" />
          </div>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock size={20} className="text-purple-300" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-4 pl-12 pr-12 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            {showPassword ? (
              <EyeOff size={20} className="text-purple-300 hover:text-white transition-colors" />
            ) : (
              <Eye size={20} className="text-purple-300 hover:text-white transition-colors" />
            )}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Aguarde...</span>
            </>
          ) : (
            <>
              {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
              <span>{isLogin ? 'Entrar' : 'Cadastrar'}</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-transparent text-purple-200">ou continue com</span>
        </div>
      </div>

      {/* Google Button */}
      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
      >
        <Chrome size={20} className="text-red-400" />
        <span>Google</span>
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Toggle Login/Register */}
      <div className="mt-6 text-center">
        <p className="text-purple-200">
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white font-semibold hover:text-purple-300 transition-colors duration-300 underline decoration-purple-400 underline-offset-4"
          >
            {isLogin ? 'Cadastre-se' : 'Entrar'}
          </button>
        </p>
      </div>

      {/* Footer Links */}
      <footer className="mt-8 pt-6 border-t border-white/10 text-center">
        <div className="flex justify-center space-x-6 text-xs">
          <a
            href="/privacy-policy"
            className="text-purple-200 hover:text-white transition-colors duration-300"
          >
            Política de Privacidade
          </a>
          <a
            href="/terms-of-service"
            className="text-purple-200 hover:text-white transition-colors duration-300"
          >
            Termos de Serviço
          </a>
          <a
            href="/user-data-deletion"
            className="text-purple-200 hover:text-white transition-colors duration-300"
          >
            Exclusão de Dados
          </a>
        </div>
      </footer>
    </div>
  );
} 