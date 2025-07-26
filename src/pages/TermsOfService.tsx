import React from 'react';

const TermsOfService = () => (
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
    <h1 style={{ color: '#1877f2', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Termos de Serviço</h1>
    <p style={{ fontSize: 18, lineHeight: 1.7 }}>
      Ao utilizar o Felex Manager, você concorda com estes Termos de Serviço. O uso indevido do serviço pode resultar em suspensão ou exclusão da conta.
    </p>
    <p style={{ fontSize: 18, lineHeight: 1.7 }}>
      Reservamo-nos o direito de modificar estes termos a qualquer momento. Para dúvidas, entre em contato pelo e-mail: <a href="mailto:contato@felexmanager.com" style={{ color: '#42a5f5', textDecoration: 'underline' }}>contato@felexmanager.com</a>.
    </p>
  </div>
);

export default TermsOfService; 