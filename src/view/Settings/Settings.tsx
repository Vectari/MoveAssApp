import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { auth } from "../../library/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

export function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth.currentUser === null) {
        navigate("/login");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  return (
    <>
      <NavBar />
      <h1>Settings</h1>
      <h2>{user?.email}</h2>
    </>
  );
}
