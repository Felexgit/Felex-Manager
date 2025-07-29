export const checkEnvironmentVariables = () => {
  const issues = [];
  
  // Verificar se as variáveis estão definidas
  if (!process.env.REACT_APP_YOUTUBE_CLIENT_ID) {
    issues.push('REACT_APP_YOUTUBE_CLIENT_ID não está definida');
  } else if (process.env.REACT_APP_YOUTUBE_CLIENT_ID === 'YOUR_YOUTUBE_CLIENT_ID') {
    issues.push('REACT_APP_YOUTUBE_CLIENT_ID está usando valor padrão');
  } else {
    issues.push(`✅ REACT_APP_YOUTUBE_CLIENT_ID: ${process.env.REACT_APP_YOUTUBE_CLIENT_ID.substring(0, 20)}...`);
  }
  
  if (!process.env.REACT_APP_YOUTUBE_CLIENT_SECRET) {
    issues.push('REACT_APP_YOUTUBE_CLIENT_SECRET não está definida');
  } else if (process.env.REACT_APP_YOUTUBE_CLIENT_SECRET === 'YOUR_YOUTUBE_CLIENT_SECRET') {
    issues.push('REACT_APP_YOUTUBE_CLIENT_SECRET está usando valor padrão');
  } else {
    issues.push(`✅ REACT_APP_YOUTUBE_CLIENT_SECRET: ${process.env.REACT_APP_YOUTUBE_CLIENT_SECRET.substring(0, 20)}...`);
  }
  
  // Verificar ambiente
  issues.push(`🔧 Ambiente: ${process.env.NODE_ENV}`);
  
  return issues;
};

export const logEnvironmentVariables = () => {
  console.log('=== Verificação de Variáveis de Ambiente ===');
  const issues = checkEnvironmentVariables();
  issues.forEach(issue => console.log(issue));
  console.log('==========================================');
}; 