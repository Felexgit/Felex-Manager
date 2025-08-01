import React, { useState } from 'react';
import { X, Youtube, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const YouTubeConnectModal = ({ isOpen, onClose, onSuccess }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState('connect'); // connect, success, error

    const handleConnect = async () => {
        setIsConnecting(true);
        setError(null);
        
        try {
            // Simular processo de conexão OAuth
            // Em produção, isso seria uma integração real com a API do YouTube
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simular dados da conta conectada
            const accountData = {
                id: 'yt_' + Date.now(),
                channel_id: 'UC123456789',
                channel_name: 'Meu Canal de Marketing',
                channel_url: 'https://youtube.com/channel/UC123456789',
                subscriber_count: 15420,
                video_count: 156,
                view_count: 2847500,
                access_token: 'mock_access_token',
                refresh_token: 'mock_refresh_token',
                expires_at: new Date(Date.now() + 3600000).toISOString(),
                created_at: new Date().toISOString()
            };

            // Salvar no Supabase
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { error: insertError } = await supabase
                    .from('youtube_accounts')
                    .upsert({
                        user_id: user.id,
                        channel_id: accountData.channel_id,
                        channel_name: accountData.channel_name,
                        channel_url: accountData.channel_url,
                        access_token: accountData.access_token,
                        refresh_token: accountData.refresh_token,
                        expires_at: accountData.expires_at
                    });

                if (insertError) throw insertError;
            }

            setStep('success');
            setTimeout(() => {
                onSuccess(accountData);
            }, 1500);

        } catch (err) {
            console.error('Error connecting YouTube:', err);
            setError('Erro ao conectar com o YouTube. Tente novamente.');
            setStep('error');
        } finally {
            setIsConnecting(false);
        }
    };

    const handleRetry = () => {
        setStep('connect');
        setError(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <Youtube size={24} className="text-red-500 mr-3" />
                        <h2 className="text-xl font-bold text-white">Conectar YouTube</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                {step === 'connect' && (
                    <div className="text-center">
                        <div className="bg-gray-800 rounded-lg p-6 mb-6">
                            <Youtube size={48} className="text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Conectar sua conta do YouTube
                            </h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Conecte sua conta para acessar vídeos, playlists, analytics e gerenciar conteúdo com IA
                            </p>
                            
                            <div className="text-left space-y-3 mb-6">
                                <div className="flex items-center text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-green-400 mr-2" />
                                    Acesso a vídeos e playlists
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-green-400 mr-2" />
                                    Analytics e métricas
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-green-400 mr-2" />
                                    Gerenciamento com IA
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-green-400 mr-2" />
                                    Planejamento de conteúdo
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleConnect}
                            disabled={isConnecting}
                            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center"
                        >
                            {isConnecting ? (
                                <>
                                    <Loader size={20} className="animate-spin mr-2" />
                                    Conectando...
                                </>
                            ) : (
                                <>
                                    <Youtube size={20} className="mr-2" />
                                    Conectar Conta
                                </>
                            )}
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="text-center">
                        <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-6 mb-6">
                            <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Conta conectada com sucesso!
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Sua conta do YouTube foi conectada e está pronta para uso.
                            </p>
                        </div>
                    </div>
                )}

                {step === 'error' && (
                    <div className="text-center">
                        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-6 mb-6">
                            <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Erro na conexão
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                {error}
                            </p>
                            <button
                                onClick={handleRetry}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors"
                            >
                                Tentar Novamente
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer */}
                {step === 'connect' && (
                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-500">
                            Ao conectar, você autoriza o acesso aos dados do seu canal do YouTube
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YouTubeConnectModal; 