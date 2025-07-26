import React from 'react';

const UserDataDeletion = () => (
  <div style={{
    maxWidth: 700,
    margin: '40px auto',
    padding: 32,
    background: 'linear-gradient(135deg, #181c2f 80%, #1877f2 100%)',
    borderRadius: 16,
    color: '#e4e6eb',
    boxShadow: '0 4px 32px #0004',
    fontFamily: 'Inter, Arial, sans-serif',
    minHeight: '60vh',
    border: '1px solid #222a44',
  }}>
    <h1 style={{ color: '#1877f2', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Exclusão de Dados do Usuário</h1>
    <p style={{ fontSize: 18, lineHeight: 1.7 }}>
      Para solicitar a exclusão dos seus dados pessoais do Felex Manager, envie um e-mail para <a href="mailto:contato@felexmanager.com" style={{ color: '#42a5f5', textDecoration: 'underline' }}>contato@felexmanager.com</a> com o assunto "Exclusão de Dados". Sua solicitação será processada em até 7 dias úteis.
    </p>
  </div>
);

export default UserDataDeletion; 