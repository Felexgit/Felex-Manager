import React from 'react';

const PrivacyPolicy = () => (
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
    <h1 style={{ color: '#1877f2', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>Política de Privacidade</h1>
    <p style={{ fontSize: 18, lineHeight: 1.7 }}>
      Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar o Felex Manager.
      Não compartilhamos suas informações com terceiros sem seu consentimento, exceto quando exigido por lei.
    </p>
    <p style={{ fontSize: 18, lineHeight: 1.7 }}>
      Ao utilizar nosso serviço, você concorda com a coleta e uso das informações conforme descrito nesta política. Para dúvidas ou solicitações, entre em contato pelo e-mail: <a href="mailto:contato@felexmanager.com" style={{ color: '#42a5f5', textDecoration: 'underline' }}>contato@felexmanager.com</a>.
    </p>
  </div>
);

export default PrivacyPolicy; 