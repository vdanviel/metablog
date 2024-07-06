import { Navigate } from 'react-router-dom';

const Auth = ({ auth, children }) => {

    if (!auth) {
        // Se o usuário não está autenticado, redirecione para a página de login
        return <Navigate to="/"/>;
    }

  return children;
};

export default Auth;
