import { Navigate } from 'react-router-dom';

const Guest = ({ auth, children }) => {

  if (auth) {
    // Se usuario esta auteenticado ele vai para pagina feed
    return <Navigate to="/feed"/>;
  }


  return children;
};

export default Guest;
