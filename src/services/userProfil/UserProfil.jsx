// export const getUserProfile = async (token) => {
//     try {
//       const response = await fetch('http://localhost:3001/api/v1/user/profile', {
//         method: 'POST',  // Utilisation de 'POST' si l'API le demande
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,  // Ajout du token dans l'en-tête Authorization
//         },
//         body: JSON.stringify({}), // Corps vide ou adapté selon les besoins de l'API
//       });
  
//       if (response.ok) {
//         const profileData = await response.json();
//         return profileData;  // Retourne les informations utilisateur
//       } else {
//         throw new Error('Impossible de récupérer les informations utilisateur');
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération des données utilisateur:', error);
//       throw error;
//     }
//   };
  

export const getUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        const profileData = await response.json();
        // Stocke les informations utilisateur dans localStorage
        console.log("datauser",profileData)
        // localStorage.setItem('user', JSON.stringify(profileData));
        return profileData;
      } else {
        throw new Error('Erreur lors de la récupération des informations utilisateur');
      }
    } catch (error) {
        console.log('Error userprofil', error)
      throw new Error('Erreur réseau lors de la récupération des informations utilisateur');
    }
  };
  