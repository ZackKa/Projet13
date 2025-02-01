import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';  // Import des hooks pour gérer l'état local et les effets de bord
import { useDispatch, useSelector } from 'react-redux';  // Import des hooks Redux
import { setUser, setLoading, clearUser } from '../pages/user/userSlice';  // Actions Redux pour gérer l'état utilisateur
import { getUserProfile } from '../services/userProfil/UserProfil';  // Service pour récupérer le profil utilisateur
import PropTypes from 'prop-types';  // Import de PropTypes pour la validation des props
import Home from '../pages/home/Home';
import SignIn from '../pages/sign-in/SignIn';
import User from '../pages/user/User';
import Error from '../pages/error/Error';
import './App.css';

// Composant ProtectedRoute qui protège les pages en vérifiant si l'utilisateur est connecté
function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.user.token);  // Accède au token de l'utilisateur dans le store Redux
  console.log("token APP", token)

  // Si le token n'existe pas, on redirige l'utilisateur vers la page de connexion
  if (!token) {
    return <Navigate to="/sign-in" />;
  }
  return children;  // Si l'utilisateur est connecté, on affiche les enfants (la page protégée user)
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
        dispatch(setUser({ token, userInfo }));  // Stocke les données utilisateur et le token dans Redux
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
}, [dispatch]); // Le dispatch est stable et ne change pas, mais il est ici pour éviter un avertissement


  // Si les données ne sont pas encore chargées, afficher "Loading..."
  if (!isLoaded || loading) {
    return <div className='loading-page'>Loading...</div>;
  }

  // Si tout est prêt, on affiche les routes
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />  {/* Page protégée */}
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
