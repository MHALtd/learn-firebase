import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);
  // you can see who's logged in by their profile pict with this function
  // console.log(auth?.currentUser?.photoURL);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error;
    }
  };

  return (
    <div>
      <div>
        <h1>Email Auth</h1>
        <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <br />
      <div>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <button onClick={logOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Auth;
