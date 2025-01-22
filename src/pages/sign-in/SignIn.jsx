// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Crée l'objet avec les données de connexion
//     const userData = { email, password };
    
//     try {
//       // Envoi des données au backend pour l'authentification
//       const response = await fetch('http://localhost:3001/api/v1/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         // Si l'authentification réussit, récupère le JWT
//         const data = await response.json();
//         console.log("data retourné", data);
//         const { token } = data.body;

//         // Sauvegarde le token JWT dans localStorage
//         localStorage.setItem('authToken', token);

//         // Envoi de la requête POST pour récupérer les informations utilisateur
//         try {
//           const userResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
//             method: 'POST',  // Utilise 'POST' comme demandé
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,  // Passe le token dans l'en-tête Authorization
//             },
//             body: JSON.stringify({})  // Si le backend attend un corps vide, sinon ajoute les données nécessaires
//           });

//           if (userResponse.ok) {
//             const profileData = await userResponse.json(); // Récupérer les données de profil
//             console.log('Informations utilisateur:', profileData.body);
//             // Stocke les informations utilisateur dans localStorage
//             localStorage.setItem('user', JSON.stringify(profileData));

//             // Redirige l'utilisateur vers la page /user
//             navigate('/user');
//           } else {
//             console.log('Erreur lors de la récupération des informations utilisateur');
//             setError('Impossible de récupérer les informations utilisateur');
//           }
//         } catch (error) {
//           console.error('Erreur réseau lors de la récupération des infos utilisateur:', error);
//           setError('Une erreur est survenue lors de la récupération des informations utilisateur.');
//         }
//       } else {
//         // Si l'authentification échoue, affiche un message d'erreur
//         setError('Identifiants invalides');
//       }
//     } catch (error) {
//       // En cas d'erreur réseau
//       console.log(error);
//       setError('Une erreur est survenue. Veuillez réessayer.');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <main className="main bg-dark">
//         <section className="sign-in-content">
//           <i className="fa fa-user-circle sign-in-icon"></i>
//           <h1>Sign In</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="input-wrapper">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}  // Utilisation de la variable email
//                 onChange={(e) => setEmail(e.target.value)}  // Met à jour le state email
//               />
//             </div>
//             <div className="input-wrapper">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="input-remember">
//               <input type="checkbox" id="remember-me" />
//               <label htmlFor="remember-me">Remember me</label>
//             </div>
//             {error && <p className="error-message">{error}</p>}
//             <button type="submit" className="sign-in-button">
//               Sign In
//             </button>
//           </form>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default SignIn;



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';
// import { getAuthToken } from '../../services/auth/Auth';  // Import de la fonction getAuthToken
// import { getUserProfile } from '../../services/userProfil/UserProfil';  // Import de la fonction getUserProfile

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Utilisation de la fonction getAuthToken pour récupérer le token
//       const token = await getAuthToken(email, password);

//       // Déclenche un effet secondaire pour récupérer les informations utilisateur
//       await getUserProfile(token); // Cette fonction gère le stockage des données

//       // Redirige l'utilisateur vers la page /user
//       navigate('/user');
//     } catch (error) {
//       console.error(error);
//       setError(error.message || 'Identifiants invalides');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <main className="main bg-dark">
//         <section className="sign-in-content">
//           <i className="fa fa-user-circle sign-in-icon"></i>
//           <h1>Sign In</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="input-wrapper">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="input-wrapper">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="input-remember">
//               <input type="checkbox" id="remember-me" />
//               <label htmlFor="remember-me">Remember me</label>
//             </div>
//             {error && <p className="error-message">{error}</p>}
//             <button type="submit" className="sign-in-button">
//               Sign In
//             </button>
//           </form>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default SignIn;





import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // Assure-toi d'utiliser useDispatch et useSelector
import { useNavigate } from 'react-router-dom';
import { setUser, setError, setLoading } from '../user/userSlice';  // Import des actions pour gérer l'état utilisateur
import { getAuthToken } from '../../services/auth/Auth';  // Fonction pour récupérer le token d'authentification
import { getUserProfile } from '../../services/userProfil/UserProfil';  // Fonction pour récupérer les informations utilisateur
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function SignIn() {
  const [email, setEmail] = useState('');  // Local state pour le champ email
  const [password, setPassword] = useState('');  // Local state pour le champ mot de passe
  const [rememberMe, setRememberMe] = useState(false);  // Local state pour "Remember me"
  const dispatch = useDispatch();  // Initialisation de dispatch pour envoyer des actions à Redux
  const navigate = useNavigate();  // Hook pour rediriger après la connexion

  // Accès à l'état d'erreur depuis le store Redux
  const error = useSelector((state) => state.user.error);  // Utilise useSelector pour accéder à l'erreur
  const loading = useSelector((state) => state.user.loading);  // Récupère l'état de chargement

  // Lors du chargement du composant, vérifie si "Remember me" est activé
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');  // Récupérer l'email du localStorage
    if (storedEmail) {
      setEmail(storedEmail);  // Si trouvé, pré-remplir le champ email
      setRememberMe(true);  // Marquer la case "Remember me" comme cochée
    }
  }, []);

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();  // Empêche le comportement par défaut du formulaire

    try {
      // Déclenche l'action de chargement
      dispatch(setLoading(true));
      // Récupère le token d'authentification en appelant la fonction getAuthToken
      const token = await getAuthToken(email, password);

      // Enregistre le token dans Redux via une action
      // On utilise l'email ici, mais il faut aussi récupérer les données utilisateur à partir de la fonction getUserProfile
      const userInfo = await getUserProfile(token);  // Cette fonction retourne les informations utilisateur

      // Stocke les informations de l'utilisateur (token et userInfo) dans Redux
      dispatch(setUser({ token, userInfo }));

      // Si la case "Remember me" est cochée, stocke l'email dans le localStorage
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);  // Stocke l'email
      } else {
        localStorage.removeItem('rememberedEmail');  // Supprime l'email si la case est décochée
      }

      // Redirige l'utilisateur vers la page utilisateur
      navigate('/user');
    } catch (error) {
      console.error(error);
      dispatch(setError('Connexion échouée'));  // Envoie une erreur dans Redux
    }finally {
      // Arrête l'état de chargement
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {loading && (
            <div className="loading-indicator">
              <p>Loading...</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Met à jour l'email dans le state local
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Met à jour le mot de passe dans le state local
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}  // Vérifie si la case est cochée ou non
                onChange={() => setRememberMe(!rememberMe)}  // Inverse l'état du checkbox "Remember me"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* Affiche une erreur s'il y en a */}
            {error && <div className="error-message"><p>{error}</p></div>}
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignIn;