export const updateUserProfile = async (token, firstName, lastName) => {
    try {
      // Envoi de la requête PUT au backend pour mettre à jour le profil de l'utilisateur
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // On ajoute le token d'authentification dans l'en-tête 'Authorization' pour sécuriser la requête
        },
        body: JSON.stringify({  // On envoie un objet JSON avec les nouvelles informations de l'utilisateur
          firstName,  // Nouveau prénom
          lastName,   // Nouveau nom
        }),
      });
  
      // Si la réponse du serveur n'est pas correcte, on lance une erreur
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
  
      // Si la mise à jour réussit, on renvoie 'true' pour indiquer que l'opération s'est bien déroulée
      return true;
    } catch (error) {
      console.error('Error updateProfil:', error);
      throw new Error('Erreur réseau lors de la mise à jour du profil utilisateur');
    }
  };
  