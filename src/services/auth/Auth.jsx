// Fonction asynchrone pour récupérer un token d'authentification en utilisant l'email et le mot de passe de l'utilisateur
export const getAuthToken = async (email, password) => {
    const userData = { email, password }; // On crée un objet avec l'email et le mot de passe de l'utilisateur
  
    try {
      // Envoi des données au backend pour l'authentification
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // On envoie les données d'authentification (email et mot de passe) sous forme de chaîne JSON
      });
  
      // Si la réponse est OK, on récupère le token d'authentification
      if (response.ok) {
        const data = await response.json(); // On parse la réponse JSON
        const { token } = data.body;
        console.log("token",token)
        localStorage.setItem('authToken', token);  // Sauvegarde du token dans localStorage
        return token; // On retourne le token pour l'utiliser dans l'application
      } else {
        throw new Error('Authentification échouée');  // Si la réponse du backend n'est pas OK, on lance une erreur
      }
    } catch (error) {
      // Si une erreur survient lors de la requête, on affiche l'erreur
      console.log("Error auth", error)
      throw new Error('Erreur lors de l\'authentification');
    }
  };