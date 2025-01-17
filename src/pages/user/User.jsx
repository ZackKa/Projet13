// import { useState, useEffect } from 'react';
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';

// function User() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');  

//   //On récupére les données du localStorage
//   useEffect(() => {
//     // Récupérer les données utilisateur depuis localStorage
//     const user = JSON.parse(localStorage.getItem('user'));
    
//     // Vérifier si les données existent et extraire firstName et lastName
//     if (user) {
//       if (user.body.firstName) {
//         setFirstName(user.body.firstName);  // Mettre à jour le prénom
//       }
//       if (user.body.lastName) {
//         setLastName(user.body.lastName);  // Mettre à jour le nom
//       }
//     }
//   }, []);  // Ce useEffect ne s'exécute qu'une fois au montage du composant

//   return (
//     <>
//       <Header />
//       <main className="main bg-dark">
//         <div className="header">
//           <h1>Welcome back<br />{firstName} {lastName}!</h1> {/* Affiche firstName et lastName */}
//           <button className="edit-button">Edit Name</button>
//         </div>
//         <h2 className="sr-only">Accounts</h2>
//         <section className="account">
//           <div className="account-content-wrapper">
//             <h3 className="account-title">Argent Bank Checking (x8349)</h3>
//             <p className="account-amount">$2,082.79</p>
//             <p className="account-amount-description">Available Balance</p>
//           </div>
//           <div className="account-content-wrapper cta">
//             <button className="transaction-button">View transactions</button>
//           </div>
//         </section>
//         <section className="account">
//           <div className="account-content-wrapper">
//             <h3 className="account-title">Argent Bank Savings (x6712)</h3>
//             <p className="account-amount">$10,928.42</p>
//             <p className="account-amount-description">Available Balance</p>
//           </div>
//           <div className="account-content-wrapper cta">
//             <button className="transaction-button">View transactions</button>
//           </div>
//         </section>
//         <section className="account">
//           <div className="account-content-wrapper">
//             <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
//             <p className="account-amount">$184.30</p>
//             <p className="account-amount-description">Current Balance</p>
//           </div>
//           <div className="account-content-wrapper cta">
//             <button className="transaction-button">View transactions</button>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default User;





// import { useState, useEffect } from 'react';
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';
// import { getUserProfile } from '../../services/userProfil/UserProfil';  // Import de la fonction getUserProfile
// import { updateUserProfile } from '../../services/updateProfil/UpdateProfil'

// function User() {
//   const [firstName, setFirstName] = useState('');  // Valeur par défaut vide
//   const [lastName, setLastName] = useState('');  // Valeur par défaut vide
//   const [isEditing, setIsEditing] = useState(false);  // Etat pour contrôler l'édition
//   const [newFirstName, setNewFirstName] = useState(firstName);  // Nouveau prénom
//   const [newLastName, setNewLastName] = useState(lastName);  // Nouveau nom

//   // Récupérer les données du localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
    
//     if (user) {
//       if (user.body.firstName) {
//         setFirstName(user.body.firstName);
//         setNewFirstName(user.body.firstName);  // Initialiser la valeur à modifier
//       }
//       if (user.body.lastName) {
//         setLastName(user.body.lastName);
//         setNewLastName(user.body.lastName);  // Initialiser la valeur à modifier
//       }
//     }
//   }, []);

//   // Fonction pour enregistrer les modifications
//   const handleSave = async () => {
//     // Récupérer le token depuis le localStorage
//     const token = localStorage.getItem('authToken'); // Remplace "token" par la clé utilisée pour stocker le token dans le localStorage
  
//     if (!token) {
//       console.error('Token not found');
//       return;
//     }
  
//     try {
//       // Appeler updateUserProfile pour effectuer la mise à jour
//       const updateSuccess = await updateUserProfile(token, newFirstName, newLastName);

//       if (updateSuccess) {
//         // Après la mise à jour, récupérer les nouvelles données utilisateur
//         const profileData = await getUserProfile(token);

//         // Met à jour les états avec les nouvelles données
//         setFirstName(profileData.body.firstName);
//         setLastName(profileData.body.lastName);

//         // Quitte le mode édition
//         setIsEditing(false);
//       } else {
//         console.error('Failed to update user profile');
//       }
//     } catch (error) {
//       console.error('Error during update:', error);
//     }
//   };
  

//   // Fonction pour annuler l'édition
//   const handleCancel = () => {
//     setNewFirstName(firstName);
//     setNewLastName(lastName);
//     setIsEditing(false);  // Quitter le mode édition
//   };

//   return (
//     <>
//       <Header />
//       <main className="main bg-dark">
//         <div className="header">
//           {isEditing ? (
//             <>
//               <h1>Welcome back</h1>
//               <div className='change-name'>
//                 <input className='inputName'
//                   type="text"
//                   placeholder={firstName}
//                   onChange={(e) => setNewFirstName(e.target.value)}
//                 />
//                 <input className='inputName'
//                   type="text"
//                   placeholder={lastName}
//                   onChange={(e) => setNewLastName(e.target.value)}
//                 />
//               </div>
//               <div className='change-name change-button'>
//                 <button className="save-button" onClick={handleSave}>
//                   Save
//                 </button>
//                 <button className="cancel-button" onClick={handleCancel}>
//                   Cancel
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <h1>Welcome back<br />{firstName} {lastName} !</h1>
//               <button className="edit-button" onClick={() => setIsEditing(true)}>
//                 Edit Name
//               </button>
//             </>
//           )}
//         </div>
//         <h2 className="sr-only">Accounts</h2>
//         {/* Sections de comptes */}
//         <section className="account">
//           <div className="account-content-wrapper">
//             <h3 className="account-title">Argent Bank Checking (x8349)</h3>
//             <p className="account-amount">$2,082.79</p>
//             <p className="account-amount-description">Available Balance</p>
//           </div>
//           <div className="account-content-wrapper cta">
//             <button className="transaction-button">View transactions</button>
//           </div>
//         </section>
//         <section className="account">
//           <div className="account-content-wrapper">
//             <h3 className="account-title">Argent Bank Savings (x6712)</h3>
//             <p className="account-amount">$10,928.42</p>
//             <p className="account-amount-description">Available Balance</p>
//           </div>
//           <div className="account-content-wrapper cta">
//             <button className="transaction-button">View transactions</button>
//           </div>
//         </section>
//         <section className="account">
//           <div className="account-content-wrapper">
//             <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
//             <p className="account-amount">$184.30</p>
//             <p className="account-amount-description">Current Balance</p>
//           </div>
//           <div className="account-content-wrapper cta">
//             <button className="transaction-button">View transactions</button>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default User;







import { useState, useEffect } from 'react';  // Importation de hooks React (useState pour gérer les états, useEffect pour les effets secondaires)
import { useSelector, useDispatch } from 'react-redux';  // Importation de hooks Redux (useSelector pour accéder au store, useDispatch pour envoyer des actions)
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { updateUserProfile } from '../../services/updateProfil/UpdateProfil';  // Fonction pour mettre à jour le profil utilisateur
import { setUser } from '../../redux/userSlice';  // Action Redux pour mettre à jour l'utilisateur dans le store

function User() {
  const dispatch = useDispatch();  // Initialisation du hook dispatch pour envoyer des actions Redux

  const user = useSelector((state) => state.user.userInfo);  // Récupère les informations de l'utilisateur depuis le store Redux
  const token = useSelector((state) => state.user.token); // Récupère le token depuis Redux
  // États locaux pour gérer le mode édition et les champs à éditer
  const [isEditing, setIsEditing] = useState(false);  // Si true, permet d'entrer en mode édition
  const [firstName, setFirstName] = useState(user?.body?.firstName || '');  // Valeur du prénom, initialisé depuis Redux
  const [lastName, setLastName] = useState(user?.body?.lastName || '');      // Valeur du nom, initialisé depuis Redux
  const [isSaving, setIsSaving] = useState(false);  // Gère l'état de sauvegarde (loading)

  // useEffect pour synchroniser les valeurs locales avec les données Redux chaque fois que l'utilisateur change
  useEffect(() => {
    // Si l'utilisateur existe dans Redux, met à jour les valeurs locales (firstName et lastName)
    if (user) {
      setFirstName(user.body.firstName);
      setLastName(user.body.lastName);
    }
  }, [user]);  // useEffect se déclenche chaque fois que `user` dans Redux change


  // Fonction pour enregistrer les modifications du profil utilisateur
  const handleSave = async () => {
    try {
      setIsSaving(true);  // Met en état de sauvegarde
      // Log les données pour vérifier qu'elles sont correctes
      console.log('Updating user:', { firstName, lastName });

      // Appeler la fonction updateUserProfile pour effectuer la mise à jour sur le server
      const updateSuccess = await updateUserProfile(token, firstName, lastName);

      if (updateSuccess) {
        // Après la mise à jour, Dispatcher l'action setUser pour mettre à jour les données de l'utilisateur dans le store Redux
        dispatch(setUser({
          token: token, // Garde le token intact
          userInfo: {
            ...user,  // Conserver les autres informations utilisateur
            body: {
              ...user.body,  // Conserver les autres informations dans body
              firstName,     // Mettre à jour le prénom
              lastName       // Mettre à jour le nom
            }
          }
        }));

        // Quitter le mode édition après la sauvegarde
        setIsEditing(false);
      } else {
        console.error('Failed to update user profile'); // Log si la mise à jour échoue
      }
    } catch (error) {
      console.error('Error during update:', error); // Log l'erreur si une exception est levée
    }  finally {
      setIsSaving(false);  // Retour à l'état normal après la sauvegarde
    }
  };

  // Fonction pour annuler l'édition et revenir aux valeurs originales
  const handleCancel = () => {
    // Restaure les valeurs initiales depuis Redux pour ne pas perdre les modifications
    setFirstName(user?.body?.firstName || '');  // Restaure le prénom
    setLastName(user?.body?.lastName || '');    // Restaure le nom
    setIsEditing(false);  // Quitte le mode édition
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          {/* Si on est en mode édition, afficher les champs de saisie pour le prénom et le nom */}
          {isEditing ? (
            <>
              <h1>Welcome back</h1>
              <div className='change-name'>
                <input
                  className='inputName' type="text" value={firstName}  // Utilise la valeur du state local
                  onChange={(e) => setFirstName(e.target.value)}  // Met à jour l'état local du prénom
                />
                <input
                  className='inputName' type="text" value={lastName}  // Affichage du nom dans le champ
                  onChange={(e) => setLastName(e.target.value)}  // Met à jour l'état local du nom
                />
              </div>
              <div className='change-name change-button'>
                <button className="save-button" onClick={handleSave} disabled={isSaving} // Désactive le bouton pendant la sauvegarde
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            // Si on n'est pas en mode édition, afficher le prénom et le nom
            <>
              <h1>Welcome back<br />{user?.body?.firstName} {user?.body?.lastName} !</h1>
              <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default User;