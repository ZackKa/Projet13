export const getUserProfile = async (token) => {
    try {
      // Envoi de la requête POST au backend pour obtenir les informations du profil utilisateur
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indique que le corps de la requête est au format JSON
          'Authorization': `Bearer ${token}`, // Ajoute le token d'authentification dans l'en-tête 'Authorization'
        },
        body: JSON.stringify({}), // Le corps de la requête est un objet JSON vide, car on n'envoie pas de données supplémentaires
      });
  
      // Si la réponse du serveur est OK, on récupère les données du profil utilisateur
      if (response.ok) {
        const profileData = await response.json(); // On parse la réponse JSON du serveur contenant les informations utilisateur
        console.log("datauser",profileData)
        return profileData;  // On retourne les données du profil utilisateur pour pouvoir les utiliser ailleurs dans l'application
      } else {
        // Si la réponse n'est pas OK, on lance une erreur
        throw new Error('Erreur lors de la récupération des informations utilisateur');
      }
    } catch (error) {
        console.log('Error userprofil', error)
      throw new Error('Erreur réseau lors de la récupération des informations utilisateur');
    }
  };