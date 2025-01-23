import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setError, setLoading } from '../user/userSlice';
import { getAuthToken } from '../../services/auth/Auth';
import { getUserProfile } from '../../services/userProfil/UserProfil';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function SignIn() {
  const [email, setEmail] = useState('');  // Local state pour le champ email
  const [password, setPassword] = useState('');  // Local state pour le champ mot de passe
  const [rememberMe, setRememberMe] = useState(false);  // Local state pour "Remember me"
  const dispatch = useDispatch();  // Initialisation de dispatch pour envoyer des actions à Redux
  const navigate = useNavigate();  // Hook pour rediriger après la connexion

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
      dispatch(setLoading(true));  // Déclenche l'action de chargement
      const token = await getAuthToken(email, password);  // Récupère le token d'authentification en appelant la fonction getAuthToken

      const userInfo = await getUserProfile(token);  // Cette fonction retourne les informations utilisateur

      dispatch(setUser({ token, userInfo }));  // Stocke les informations de l'utilisateur (token et userInfo) dans Redux

      // Si la case "Remember me" est cochée, stocke l'email dans le localStorage
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);  // Stocke l'email
      } else {
        localStorage.removeItem('rememberedEmail');  // Supprime l'email si la case est décochée
      }

      // Redirige l'utilisateur vers la page utilisateur
      navigate('/user');
    } catch (error) {
      console.error(error);  //signaler clairement une erreur
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