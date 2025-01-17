import { createSlice } from '@reduxjs/toolkit';  

const initialState = {
  token: null,
  userInfo: null,
  error: null,
  loading: false,
};

// Créer le slice 'user' avec un nom, un état initial et des reducers
const userSlice = createSlice({
  name: 'user',  // Nom du slice
  initialState,   // L'état initial
  reducers: {
    // Action pour définir l'utilisateur avec le token et les informations
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    // Action pour définir une erreur
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Action pour réinitialiser l'état de l'utilisateur (déconnexion)
    clearUser: (state) => {
      state.token = null;
      state.userInfo = null;
    },
    // Action pour définir l'état de chargement
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// On exporte les actions créées pour qu'elles soient utilisées dans les composants
export const { setUser, setError, clearUser, setLoading } = userSlice.actions;

// On exporte le reducer généré pour l'utiliser dans le store
export default userSlice.reducer;
