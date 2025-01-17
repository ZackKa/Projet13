export const updateUserProfile = async (token, firstName, lastName) => {
  console.log('Updating user update:', { firstName, lastName });
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Ajouter le token dans l'en-tête Authorization
        },
        body: JSON.stringify({
          firstName,  // Nouveau prénom
          lastName,   // Nouveau nom
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
  
      // Si la mise à jour est réussie, on peut simplement renvoyer une confirmation
      return true;
    } catch (error) {
      console.error('Error updateProfil:', error);
      throw new Error('Erreur réseau lors de la mise à jour du profil utilisateur');
    }
  };
  