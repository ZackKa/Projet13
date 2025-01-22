import { createSlice } from '@reduxjs/toolkit';  

// État initial pour le slice 'user' - C'est l'état de base de l'utilisateur
const initialState = {
  token: null,        // Le token d'authentification de l'utilisateur
  userInfo: null,     // Les informations de l'utilisateur
  error: null,        // Pour stocker des erreurs éventuelles
  loading: false,     // Indicateur pour savoir si une opération est en cours
};

// Créer le slice 'user' avec un nom, un état initial et des reducers
const userSlice = createSlice({
  name: 'user',  // Nom du slice
  initialState,   // L'état initial
  reducers: {
    // Le reducer 'setUser' met à jour l'état 'user' avec un nouvel utilisateur
    setUser: (state, action) => {
      state.token = action.payload.token; // Met à jour le token avec la valeur reçue dans 'payload'
      state.userInfo = action.payload.userInfo;   // Met à jour les informations de l'utilisateur
    },
    // Le reducer 'setError' permet de définir une erreur dans l'état
    setError: (state, action) => {
      state.error = action.payload; // Met à jour l'état 'error' avec la valeur reçue dans 'payload'
    },
    // Le reducer 'clearUser' réinitialise l'état de l'utilisateur (pour la déconnexion)
    clearUser: (state) => {
      state.token = null;
      state.userInfo = null;
    },
    // Le reducer 'setLoading' met à jour l'état 'loading' (pour indiquer un chargement)
    setLoading: (state, action) => {
      state.loading = action.payload; // Met à jour 'loading' avec la valeur reçue dans 'payload'
    },
  },
});

// On exporte les actions créées pour qu'elles soient utilisées dans les composants
export const { setUser, setError, clearUser, setLoading } = userSlice.actions;

// On exporte le reducer généré pour l'utiliser dans le store
export default userSlice.reducer;