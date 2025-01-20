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







// import { useState, useEffect } from 'react';  // Importation de hooks React (useState pour gérer les états, useEffect pour les effets secondaires)
// import { useSelector, useDispatch } from 'react-redux';  // Importation de hooks Redux (useSelector pour accéder au store, useDispatch pour envoyer des actions)
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';
// import { updateUserProfile } from '../../services/updateProfil/UpdateProfil';  // Fonction pour mettre à jour le profil utilisateur
// import { setUser } from '../../redux/userSlice';  // Action Redux pour mettre à jour l'utilisateur dans le store

// function User() {
//   const dispatch = useDispatch();  // Initialisation du hook dispatch pour envoyer des actions Redux

//   const user = useSelector((state) => state.user.userInfo);  // Récupère les informations de l'utilisateur depuis le store Redux
//   const token = useSelector((state) => state.user.token); // Récupère le token depuis Redux
//   // États locaux pour gérer le mode édition et les champs à éditer
//   const [isEditing, setIsEditing] = useState(false);  // Si true, permet d'entrer en mode édition
//   const [firstName, setFirstName] = useState(user?.body?.firstName || '');  // Valeur du prénom, initialisé depuis Redux
//   const [lastName, setLastName] = useState(user?.body?.lastName || '');      // Valeur du nom, initialisé depuis Redux
//   const [isSaving, setIsSaving] = useState(false);  // Gère l'état de sauvegarde (loading)

//   // useEffect pour synchroniser les valeurs locales avec les données Redux chaque fois que l'utilisateur change
//   useEffect(() => {
//     // Si l'utilisateur existe dans Redux, met à jour les valeurs locales (firstName et lastName)
//     if (user) {
//       setFirstName(user.body.firstName);
//       setLastName(user.body.lastName);
//     }
//   }, [user]);  // useEffect se déclenche chaque fois que `user` dans Redux change


//   // Fonction pour enregistrer les modifications du profil utilisateur
//   const handleSave = async () => {
//     try {
//       setIsSaving(true);  // Met en état de sauvegarde
//       // Log les données pour vérifier qu'elles sont correctes
//       console.log('Updating user:', { firstName, lastName });

//       // Appeler la fonction updateUserProfile pour effectuer la mise à jour sur le server
//       const updateSuccess = await updateUserProfile(token, firstName, lastName);

//       if (updateSuccess) {
//         // Après la mise à jour, Dispatcher l'action setUser pour mettre à jour les données de l'utilisateur dans le store Redux
//         dispatch(setUser({
//           token: token, // Garde le token intact
//           userInfo: {
//             ...user,  // Conserver les autres informations utilisateur
//             body: {
//               ...user.body,  // Conserver les autres informations dans body
//               firstName,     // Mettre à jour le prénom
//               lastName       // Mettre à jour le nom
//             }
//           }
//         }));

//         // Quitter le mode édition après la sauvegarde
//         setIsEditing(false);
//       } else {
//         console.error('Failed to update user profile'); // Log si la mise à jour échoue
//       }
//     } catch (error) {
//       console.error('Error during update:', error); // Log l'erreur si une exception est levée
//     }  finally {
//       setIsSaving(false);  // Retour à l'état normal après la sauvegarde
//     }
//   };

//   // Fonction pour annuler l'édition et revenir aux valeurs originales
//   const handleCancel = () => {
//     // Restaure les valeurs initiales depuis Redux pour ne pas perdre les modifications
//     setFirstName(user?.body?.firstName || '');  // Restaure le prénom
//     setLastName(user?.body?.lastName || '');    // Restaure le nom
//     setIsEditing(false);  // Quitte le mode édition
//   };

//   return (
//     <>
//       <Header />
//       <main className="main bg-dark">
//         <div className="header">
//           {/* Si on est en mode édition, afficher les champs de saisie pour le prénom et le nom */}
//           {isEditing ? (
//             <>
//               <h1>Welcome back</h1>
//               <div className='change-name'>
//                 <input
//                   className='inputName' type="text" value={firstName}  // Utilise la valeur du state local
//                   onChange={(e) => setFirstName(e.target.value)}  // Met à jour l'état local du prénom
//                 />
//                 <input
//                   className='inputName' type="text" value={lastName}  // Affichage du nom dans le champ
//                   onChange={(e) => setLastName(e.target.value)}  // Met à jour l'état local du nom
//                 />
//               </div>
//               <div className='change-name change-button'>
//                 <button className="save-button" onClick={handleSave} disabled={isSaving} // Désactive le bouton pendant la sauvegarde
//                 >
//                   {isSaving ? 'Saving...' : 'Save'}
//                 </button>
//                 <button className="cancel-button" onClick={handleCancel}>Cancel</button>
//               </div>
//             </>
//           ) : (
//             // Si on n'est pas en mode édition, afficher le prénom et le nom
//             <>
//               <h1>Welcome back<br />{user?.body?.firstName} {user?.body?.lastName} !</h1>
//               <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
//             </>
//           )}
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






// import { useState, useEffect } from 'react';  // Importation des hooks React
// import { useSelector, useDispatch } from 'react-redux';  // Importation des hooks Redux
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';
// import { updateUserProfile } from '../../services/updateProfil/UpdateProfil';
// import { setUser } from '../../redux/userSlice';
// import mockData from '../../mocks/mockData.json';  // Importer les données mockées au format JSON

// function User() {
//   const dispatch = useDispatch();  // Hook dispatch pour envoyer des actions Redux
//   const user = useSelector((state) => state.user.userInfo);  // Récupérer les données utilisateur du store Redux
//   const token = useSelector((state) => state.user.token); // Récupérer le token depuis Redux

//   // États locaux pour gérer les informations de l'utilisateur et les comptes
//   const [isEditing, setIsEditing] = useState(false);  // Si true, on est en mode édition
//   const [firstName, setFirstName] = useState(user?.body?.firstName || '');  // Valeur initiale du prénom
//   const [lastName, setLastName] = useState(user?.body?.lastName || '');      // Valeur initiale du nom
//   const [isSaving, setIsSaving] = useState(false);  // Gère l'état de sauvegarde (loading)
//   const [accountData, setAccountData] = useState([]);  // Nouveau state pour les comptes

//   // useEffect pour synchroniser les valeurs locales avec les données Redux
//   useEffect(() => {
//     if (user) {
//       setFirstName(user.body.firstName);
//       setLastName(user.body.lastName);
//     }
//   }, [user]);  // Se déclenche chaque fois que `user` dans Redux change

//   // useEffect pour charger les données des comptes en fonction de l'id de l'utilisateur
//   useEffect(() => {
//     const userId = user?.body?.id;  // Récupérer l'id de l'utilisateur depuis Redux
//     if (userId) {
//       // Charger directement les comptes associés à l'ID de l'utilisateur
//       setAccountData(mockData[userId]?.accounts || []);  // Si l'ID correspond, on prend les données associées
//     }
//   }, [user]);  // Ce useEffect se déclenche chaque fois que `user` change

//   // Fonction pour enregistrer les modifications du profil utilisateur
//   const handleSave = async () => {
//     try {
//       setIsSaving(true);  // On met l'état en mode "sauvegarde" pour désactiver le bouton et afficher un loading
//       console.log('Updating user:', { firstName, lastName });

//       // Appel à la fonction pour mettre à jour le profil sur le serveur
//       const updateSuccess = await updateUserProfile(token, firstName, lastName);

//       if (updateSuccess) {
//         // Si la mise à jour réussit, on dispatch l'action setUser pour mettre à jour le store
//         dispatch(setUser({
//           token: token,  // Garde le token intact
//           userInfo: {
//             ...user,  // Conserver les autres informations utilisateur
//             body: {
//               ...user.body,
//               firstName,  // Mettre à jour le prénom
//               lastName    // Mettre à jour le nom
//             }
//           }
//         }));
//         setIsEditing(false);  // Quitter le mode édition
//       } else {
//         console.error('Failed to update user profile');  // Log si la mise à jour échoue
//       }
//     } catch (error) {
//       console.error('Error during update:', error);  // Log de l'erreur si une exception est levée
//     } finally {
//       setIsSaving(false);  // Retour à l'état normal après la sauvegarde
//     }
//   };

//   // Fonction pour annuler l'édition et revenir aux valeurs originales
//   const handleCancel = () => {
//     setFirstName(user?.body?.firstName || '');  // Restaure le prénom
//     setLastName(user?.body?.lastName || '');    // Restaure le nom
//     setIsEditing(false);  // Quitte le mode édition
//   };

//   return (
//     <>
//       <Header />
//       <main className="main bg-dark">
//         <div className="header">
//           {/* Si on est en mode édition, afficher les champs de saisie pour le prénom et le nom */}
//           {isEditing ? (
//             <>
//               <h1>Welcome back</h1>
//               <div className="change-name">
//                 <input
//                   className="inputName" type="text" value={firstName}  // Utilise la valeur du state local
//                   onChange={(e) => setFirstName(e.target.value)}  // Met à jour l'état local du prénom
//                 />
//                 <input
//                   className="inputName" type="text" value={lastName}  // Affichage du nom dans le champ
//                   onChange={(e) => setLastName(e.target.value)}  // Met à jour l'état local du nom
//                 />
//               </div>
//               <div className="change-name change-button">
//                 <button className="save-button" onClick={handleSave} disabled={isSaving}>
//                   {isSaving ? 'Saving...' : 'Save'}
//                 </button>
//                 <button className="cancel-button" onClick={handleCancel}>Cancel</button>
//               </div>
//             </>
//           ) : (
//             // Si on n'est pas en mode édition, afficher le prénom et le nom
//             <>
//               <h1>Welcome back<br />{user?.body?.firstName} {user?.body?.lastName} !</h1>
//               <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
//             </>
//           )}
//         </div>

//         <h2 className="sr-only">Accounts</h2>
        
//         {/* Affichage des comptes utilisateur */}
//         {accountData.length > 0 ? (
//           accountData.map((account) => (
//             <section className="account" key={account.id}>
//               <div className="account-content-wrapper">
//                 <h3 className="account-title">{account.title} ({account.multiplier})</h3>
//                 <p className="account-amount">${account.balance.toFixed(2)}</p>
//                 <p className="account-amount-description">{account.description}</p>
//               </div>
//               <div className="account-content-wrapper cta">
//                 <button className="transaction-button">View transactions</button>
//               </div>
//             </section>
//           ))
//         ) : (
//           <p>No account data available.</p>  // Si `accountData` est vide, on affiche ce message
//         )}
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default User;


import { useState, useEffect } from 'react';  
import { useSelector, useDispatch } from 'react-redux';  
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { updateUserProfile } from '../../services/updateProfil/UpdateProfil';  // Service pour mettre à jour le profil
import { setUser } from '../../redux/userSlice';  // Actions Redux pour l'utilisateur
import mockData from '../../mocks/mockData.json';  // Importer les données mockées au format JSON

function User() {
  const dispatch = useDispatch();
  
  // Récupérer les données utilisateur et le token depuis Redux
  const { userInfo, token, loading } = useSelector((state) => state.user);  
  const [isEditing, setIsEditing] = useState(false);  // Pour gérer le mode édition du profil
  const [firstName, setFirstName] = useState(userInfo?.body?.firstName || '');  // Prénom de l'utilisateur
  const [lastName, setLastName] = useState(userInfo?.body?.lastName || '');      // Nom de l'utilisateur
  const [isSaving, setIsSaving] = useState(false);  // Pour gérer l'état de sauvegarde

  // Récupérer les comptes associés à l'utilisateur basé sur l'ID
  const [accounts, setAccounts] = useState([]);

  // Effet pour mettre à jour les valeurs locales lors du changement de l'utilisateur
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.body.firstName);
      setLastName(userInfo.body.lastName);
      
      // Récupérer les comptes en fonction de l'ID de l'utilisateur
      const userId = userInfo.body.id;
      const userAccounts = mockData[userId]?.accounts || [];
      setAccounts(userAccounts);  // Mettre à jour les comptes en local
    }
  }, [userInfo]);  // Quand `userInfo` change, on met à jour les comptes

  // Fonction pour sauvegarder les modifications de l'utilisateur
  const handleSave = async () => {
    try {
      setIsSaving(true);  // Indiquer que la sauvegarde est en cours
      console.log('Updating user:', { firstName, lastName });

      // Appeler le service pour mettre à jour le profil
      const updateSuccess = await updateUserProfile(token, firstName, lastName);

      if (updateSuccess) {
        // Après la mise à jour, dispatcher l'action pour mettre à jour l'utilisateur dans Redux
        dispatch(setUser({
          token,
          userInfo: {
            ...userInfo,
            body: {
              ...userInfo.body,
              firstName,
              lastName
            }
          }
        }));
        setIsEditing(false);  // Quitter le mode édition
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error during update:', error);
    } finally {
      setIsSaving(false);  // Réinitialiser l'état de sauvegarde
    }
  };

  // Fonction pour annuler les modifications et revenir aux valeurs originales
  const handleCancel = () => {
    setFirstName(userInfo?.body?.firstName || '');  // Restaurer les valeurs originales
    setLastName(userInfo?.body?.lastName || '');    // Restaurer les valeurs originales
    setIsEditing(false);  // Quitter le mode édition
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          {isEditing ? (
            <>
              <h1>Welcome back</h1>
              <div className="change-name">
                <input
                  className="inputName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="inputName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="change-name change-button">
                <button
                  className="save-button"
                  onClick={handleSave}
                  disabled={isSaving || loading} // Désactive le bouton "Save" si une sauvegarde est en cours ou si une autre action de chargement (global) est en cours
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h1>Welcome back<br />{userInfo?.body?.firstName} {userInfo?.body?.lastName} !</h1>
              <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
            </>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        {accounts.length > 0 ? (
          accounts.map((account) => (
            <section className="account" key={account.id}>
              <div className="account-content-wrapper">
                <h3 className="account-title">{account.title} ({account.multiplier})</h3>
                <p className="account-amount">${account.balance.toFixed(2)}</p>
                <p className="account-amount-description">{account.description}</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
              </div>
            </section>
          ))
        ) : (
          <p>No account data available.</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default User;