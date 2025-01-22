import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/user/userSlice'; // Import du reducer qui gère l'état utilisateur

// Crée le store Redux avec configureStore
const store = configureStore({
  reducer: {
    user: userReducer,  // On ajoute le slice 'user' au store pour gérer l'état utilisateur
  },
});

export default store;
