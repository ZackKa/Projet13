import { useState, useEffect } from 'react';  
import { useSelector, useDispatch } from 'react-redux';  
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { updateUserProfile } from '../../services/updateProfil/UpdateProfil';
import { setUser } from './userSlice';
import mockData from '../../mocks/mockData.json';

function User() {
  const dispatch = useDispatch();
  
  // Récupérer les données utilisateur et le token depuis Redux
  const { userInfo, token, loading } = useSelector((state) => state.user); // useSelector s'abonne automatiquement aux changements du store Redux et met à jour le composant lorsque l'état sélectionné change.
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
              <div className='formulaire'>
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
                <div className="change-name change-button" id='button-form'>
                  <button
                    className="save-button"
                    onClick={handleSave}
                    disabled={isSaving || loading} // Désactive le bouton "Save" si une sauvegarde est en cours ou si une autre action de chargement (global) est en cours
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
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