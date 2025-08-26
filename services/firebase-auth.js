import { getAuth, signInWithEmailAndPassword, signOut, onIdTokenChanged } from "firebase/auth";
import { app } from "./firebase-config";

const auth = getAuth(app);

// Login function
export const login = async (email, password) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCred.user.getIdToken();

  // simpan token ke cookie
  document.cookie = `token=${token}; path=/; max-age=3600`;

  return userCred.user;
};

// Logout function
export const logout = () => {
  document.cookie = "token=; path=/; max-age=0";
  return signOut(auth);
};

// 🔥 auto refresh token
onIdTokenChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken(); // dapet token baru
    document.cookie = `token=${token}; path=/; max-age=3600`;
  } else {
    document.cookie = "token=; path=/; max-age=0";
  }
});

export { auth };
