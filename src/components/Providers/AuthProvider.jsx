import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  //google provider
  const googleProvider = new GoogleAuthProvider()

  const createUser = (email, password) =>{
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
  }

  const LogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () =>{
    setLoading(true)
     return signInWithPopup(auth, googleProvider)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };



  useEffect(() =>{
      const unsubscribe = onAuthStateChanged(auth, currentUser =>{
          setUser(currentUser)

          setLoading(false);
          //get and set token;
          if(currentUser){
            axios.post(" https://music-server-davrahim.vercel.app/jwt", {
              email: currentUser.email,
            })
            .then(res => {
               (res.data.token)
              localStorage.setItem("access_token", res.data.token);
            })
          }else{
            localStorage.removeItem("access_token");
          }
        
      })
      return () =>{
        unsubscribe()
      }
  },[])



  const authInfo = {
    user,
    loading,
    createUser,
    googleSignIn,
    logOut,
    LogIn,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
