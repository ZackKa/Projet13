// export const loginUser = async (email, password) => {
//     const userData = { email, password };
  
//     try {
//       const response = await fetch('http://localhost:3001/api/v1/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         const { token } = data.body;
  
//         // Sauvegarde le token dans localStorage
//         localStorage.setItem('authToken', token);
//         return token; // Retourne le token pour que le composant appelant puisse l'utiliser
//       } else {
//         throw new Error('Authentification échouée');
//       }
//     } catch (error) {
//       console.error('Erreur lors de l\'authentification:', error);
//       throw error;
//     }
//   };
  
export const getAuthToken = async (email, password) => {
    const userData = { email, password };
  
    try {
      // Envoi des données au backend pour l'authentification
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { token } = data.body;
        console.log("token",token)
        localStorage.setItem('authToken', token);  // Sauvegarde du token dans localStorage
        return token;
      } else {
        throw new Error('Authentification échouée');
      }
    } catch (error) {
        console.log("Error auth", error)
      throw new Error('Erreur lors de l\'authentification');
    }
  };
  