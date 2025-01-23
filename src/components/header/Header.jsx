import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';  // Importation de useSelector et useDispatch
import argentBankLogo from '../../assets/argentBankLogo.png';
import { clearUser } from '../../pages/user/userSlice';  // Importation de l'action clearUser

function Header() {
  const navigate = useNavigate();  // Hook pour la navigation
  const location = useLocation();  // Hook pour obtenir l'URL actuelle
  const dispatch = useDispatch();  // Hook pour dispatcher des actions Redux

  // Vérification de la page actuelle
  const isUserPage = location.pathname === '/user';

  // Récupère l'utilisateur depuis le store Redux avec useSelector
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state)=> state.user.token)

  console.log('User H:', user);  // Vérifie les informations de l'utilisateur
  console.log('Token H:', token);  // Vérifie le token
  const firstName = user?.body?.firstName || ''; // Vérification si l'utilisateur existe et récupération du prénom

  // Fonction pour la déconnexion
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken"); //Retirer le token du storage
    dispatch(clearUser()); // Dispatcher l'action pour effacer l'utilisateur du store Redux
    navigate('/sign-in'); // Redirection vers la page de connexion
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo"/>
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {/* Si l'utilisateur est sur la page "/user", afficher les informations de l'utilisateur et un bouton de déconnexion */}
        {isUserPage ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i> {firstName}
            </Link>
            <Link className="main-nav-item" to="#" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out {/* Bouton de déconnexion */}
            </Link>
          </>
        ) : (
          <>
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-sign-in"></i> Sign In {/* Bouton de connexion */}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;