import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Github, Chrome, Wifi, WifiOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const LoginPage = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    // Check if Supabase is accessible
    useEffect(() => {
        const checkSupabaseConnection = async () => {
            try {
                const response = await fetch('https://cfrdytbujeihrmcrtvay.supabase.co/rest/v1/', {
                    method: 'HEAD',
                    mode: 'no-cors'
                });
                setIsOnline(true);
            } catch (error) {
                console.warn('Supabase não está acessível:', error);
                setIsOnline(false);
            }
        };

        checkSupabaseConnection();
    }, []);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!isOnline) {
                // Fallback to demo login when Supabase is offline
                setTimeout(() => {
                    const demoUser = {
                        id: 'demo-user-123',
                        email: email || 'demo@example.com',
                        user_metadata: {
                            full_name: 'Utilizador Demo'
                        }
                    };
                    
                    localStorage.setItem('demoUser', JSON.stringify(demoUser));
                    onLoginSuccess && onLoginSuccess(demoUser);
                    setIsLoading(false);
                }, 1000);
                return;
            }

            const { data, error } = isSignUp 
                ? await supabase.auth.signUp({ email, password })
                : await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;

            if (data.user) {
                onLoginSuccess && onLoginSuccess(data.user);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setIsLoading(true);
        setError('');

        try {
            if (!isOnline) {
                setError('Login social não disponível offline');
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: window.location.origin
                }
            });

            if (error) throw error;
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Logo and Title */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <Chrome size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {isSignUp ? 'Criar Conta' : 'Entrar'}
                    </h2>
                    <p className="text-gray-400">
                        {isSignUp 
                            ? 'Comece sua jornada com o AutoPost AI' 
                            : 'Bem-vindo de volta ao AutoPost AI'
                        }
                    </p>
                </div>

                {/* Connection Status */}
                {!isOnline && (
                    <div className="bg-yellow-900/50 border border-yellow-500 rounded-lg p-4 text-yellow-300 text-sm">
                        <div className="flex items-center mb-2">
                            <WifiOff size={16} className="mr-2" />
                            <span className="font-semibold">Modo Offline</span>
                        </div>
                        <p>Supabase não está acessível. Usando modo demonstração temporário.</p>
                    </div>
                )}

                {/* Login Form */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                    <form onSubmit={handleEmailLogin} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-900/50 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:bg-indigo-800 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    {isSignUp ? 'Criando conta...' : (isOnline ? 'Entrando...' : 'Entrando (Demo)...')}
                                </div>
                            ) : (
                                isSignUp ? 'Criar Conta' : (isOnline ? 'Entrar' : 'Entrar (Demo)')
                            )}
                        </button>
                    </form>

                    {/* Social Login Buttons - Only show when online */}
                    {isOnline && (
                        <>
                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-800/50 text-gray-400">ou continue com</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleSocialLogin('github')}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Github size={20} className="mr-2" />
                                    Continuar com GitHub
                                </button>
                            </div>
                        </>
                    )}

                    {/* Toggle Sign Up/Login */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="ml-1 text-indigo-400 hover:text-indigo-300 font-medium"
                            >
                                {isSignUp ? 'Entrar' : 'Criar conta'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm">
                    <p>© 2024 AutoPost AI. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage; 