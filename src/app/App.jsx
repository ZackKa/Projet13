// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Import des composants de routing
// import { useSelector } from 'react-redux';  // Import de useSelector pour accéder au store Redux
// import PropTypes from 'prop-types';
// import Home from '../pages/home/Home';  // Import de la page d'accueil
// import SignIn from '../pages/sign-in/SignIn';  // Import de la page de connexion
// import User from '../pages/user/User';  // Import de la page utilisateur
// import Error from '../pages/error/Error';  // Import de la page d'erreur
// import './App.css';  // Import du fichier CSS

// function ProtectedRoute({ children }) {
//   const token = useSelector((state) => state.user.token);  // On accède au token dans le store Redux

//   // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
//   if (!token) {
//     return <Navigate to="/sign-in" />;
//   }
//   return children;  // Si l'utilisateur est authentifié, on affiche les enfants (la page protégée)
// }

// // Validation de la prop 'children'
// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,  // Vérifie que 'children' est un élément React valide
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/sign-in" element={<SignIn />} />
//         <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />  {/* Page protégée */}
//         <Route path="/*" element={<Error />} />  {/* Page d'erreur pour les routes non définies */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Import des composants de routing
import { useState, useEffect } from 'react';  // Import des hooks pour gérer l'état local et les effets de bord
import { useDispatch, useSelector } from 'react-redux';  // Import des hooks Redux
import { setUser, setLoading, clearUser } from '../pages/user/userSlice';  // Actions Redux pour gérer l'état utilisateur
import { getUserProfile } from '../services/userProfil/UserProfil';  // Service pour récupérer le profil utilisateur
import PropTypes from 'prop-types';  // Import de PropTypes pour la validation des props
import Home from '../pages/home/Home';  // Import de la page d'accueil
import SignIn from '../pages/sign-in/SignIn';  // Import de la page de connexion
import User from '../pages/user/User';  // Import de la page utilisateur
import Error from '../pages/error/Error';  // Import de la page d'erreur
import './App.css';  // Import du fichier CSS

// Composant ProtectedRoute qui protège les pages en vérifiant si l'utilisateur est connecté
function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.user.token);  // Accède au token de l'utilisateur dans le store Redux

  // Si le token n'existe pas, on redirige l'utilisateur vers la page de connexion
  if (!token) {
    return <Navigate to="/sign-in" />;
  }
  return children;  // Si l'utilisateur est connecté, on affiche les enfants (la page protégée)
}

// Validation de la prop 'children' avec PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,  // Vérifie que 'children' est bien un élément React
};

function App() {
  const dispatch = useDispatch();  // Utilisation du hook dispatch pour envoyer des actions à Redux
  const loading = useSelector((state) => state.user.loading);  // Accède à l'état 'loading' depuis Redux
  const [isLoaded, setIsLoaded] = useState(false);  // État local pour suivre si les données sont complètement chargées

  // useEffect qui s'exécute au montage du composant
useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Si le token existe dans localStorage, on tente de récupérer les données de l'utilisateur
    dispatch(setLoading(true));  // Démarre le chargement

    const fetchUserData = async () => {
      try {
        const userInfo = await getUserProfile(token);  // Attendre les données utilisateur depuis l'API
        dispatch(setUser({ token, userInfo }));  // Stocke les données utilisateur dans Redux
        setIsLoaded(true);  // Indiquer que le chargement est terminé
        dispatch(setLoading(false));  // Arrêter l'état de chargement
      } catch (error) {
        // Si l'appel échoue, effacer les données utilisateur
        dispatch(clearUser());
        setIsLoaded(true);  // Indiquer que le chargement est terminé
        dispatch(setLoading(false));  // Arrêter l'état de chargement
        console.error('Error fetching user profile:', error);  // Log l'erreur
      }
    };

    fetchUserData();  // Appeler la fonction async pour récupérer les données utilisateur
  } else {
    // Si pas de token trouvé, on considère que le chargement est terminé mais sans utilisateur
    setIsLoaded(true);
  }
}, [dispatch]);


  // Si les données ne sont pas encore chargées, afficher "Loading..."
  if (!isLoaded || loading) {
    return <div className='loading-page'>Loading...</div>;  // Message de chargement en attendant la récupération des données
  }

  // Si tout est prêt, on affiche les routes
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />  {/* Page protégée */}
        <Route path="/*" element={<Error />} />  {/* Page d'erreur pour les routes non définies */}
      </Routes>
    </Router>
  );
}

export default App;