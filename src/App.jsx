// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/home/Home';
// import SignIn from './pages/sign-in/SignIn';
// import User from './pages/user/User';
// import Error from './pages/error/Error';
// import './App.css'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/sign-in" element={<SignIn />} />
//         <Route path="/user" element={<User />} />
//         <Route path="/*" element={<Error />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Home from './pages/home/Home';
// import SignIn from './pages/sign-in/SignIn';
// import User from './pages/user/User';
// import Error from './pages/error/Error';
// import './App.css'

// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem('authToken');
//   if (!token) {
//     // Si le token n'existe pas, rediriger vers la page de connexion
//     return <Navigate to="/sign-in" />;
//   }
//   return children; // Si l'utilisateur est authentifié, on retourne le contenu de la route protégée
// }

// // Ajoutez la validation des props avec PropTypes
// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,  // Vérifie que 'children' est un élément React valide
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/sign-in" element={<SignIn />} />
        
//         {/* La page User est protégée par la route ProtectedRoute */}
//         <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
        
//         <Route path="/*" element={<Error />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Import des composants de routing
import { useSelector } from 'react-redux';  // Import de useSelector pour accéder au store Redux
import PropTypes from 'prop-types';
import Home from './pages/home/Home';  // Import de la page d'accueil
import SignIn from './pages/sign-in/SignIn';  // Import de la page de connexion
import User from './pages/user/User';  // Import de la page utilisateur
import Error from './pages/error/Error';  // Import de la page d'erreur
import './App.css';  // Import du fichier CSS

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.user.token);  // On accède au token dans le store Redux

  // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
  if (!token) {
    return <Navigate to="/sign-in" />;
  }
  return children;  // Si l'utilisateur est authentifié, on affiche les enfants (la page protégée)
}

// Validation de la prop 'children'
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,  // Vérifie que 'children' est un élément React valide
};

function App() {
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