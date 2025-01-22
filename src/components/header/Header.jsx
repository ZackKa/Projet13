// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import argentBankLogo from '../../assets/argentBankLogo.png';

// function Header() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsAuthenticated(true);
//       // Optionnel : récupérer le nom de l'utilisateur depuis le localStorage
//       // const user = JSON.parse(localStorage.getItem('user'));
//       // setUsername(user ? user.username : 'Utilisateur');
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     // localStorage.removeItem('user');
//     setIsAuthenticated(false); // Mise à jour de l'état
//     navigate('/sign-in');
//   };

//   return (
//     <nav className="main-nav">
//       <Link className="main-nav-logo" to="/">
//         <img
//           className="main-nav-logo-image"
//           src={argentBankLogo}
//           alt="Argent Bank Logo"
//         />
//         <h1 className="sr-only">Argent Bank</h1>
//       </Link>
//       <div>
//         {isAuthenticated ? (
//           <>
//             <span className="main-nav-item">
//             {/* {username} */}
//               <i className="fa fa-user-circle"></i> Tony
//             </span>
//             <button className="main-nav-item" onClick={handleLogout}>
//               <i className="fa fa-sign-out"></i> Logout
//             </button>
//           </>
//         ) : (
//           <Link className="main-nav-item" to="/sign-in">
//             <i className="fa fa-user-circle"></i> Sign In
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Header;


// import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { useState, useEffect } from 'react';
// import argentBankLogo from '../../assets/argentBankLogo.png';

// function Header() {
//   const navigate = useNavigate();
//   const location = useLocation(); // Utilisation du hook useLocation pour récupérer l'URL actuelle

//   // Vérification de la page actuelle
//   const isUserPage = location.pathname === '/user';  // Si la page est "/user"

//   // Récupère les informations de l'utilisateur depuis localStorage
//   const user = JSON.parse(localStorage.getItem('user'));

//   // Vérifie si l'objet `user` et `user.body.firstName` existent avant d'y accéder, sinon retourne une chaîne vide pour éviter les erreurs.
//   const firstName = user && user.body && user.body.firstName ? user.body.firstName : '';

//   const handleLogout = (e) => {
//     // Empêcher la navigation par défaut du Link
//     e.preventDefault();
    
//     // Supprimer le token de localStorage et rediriger vers la page de connexion
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     navigate('/sign-in'); // Redirection vers la page sign-in après la déconnexion
//   };

//   return (
//     <nav className="main-nav">
//       <Link className="main-nav-logo" to="/">
//         <img
//           className="main-nav-logo-image"
//           src={argentBankLogo}
//           alt="Argent Bank Logo"
//         />
//         <h1 className="sr-only">Argent Bank</h1>
//       </Link>
//       <div>
//         {isUserPage ? (
//           <>
//           <Link className="main-nav-item" to="/user">
//               <i className="fa fa-user-circle"></i> {firstName}
//           </Link>
//           <Link className="main-nav-item" to="#" onClick={handleLogout}>
//             <i className="fa fa-sign-out"></i> Sign Out
//           </Link>
//           </>
//         ) : (
//           <Link className="main-nav-item" to="/sign-in">
//             <i className="fa fa-user-circle"></i> Sign In
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Header;








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

  // // Affichage des données dans la console
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